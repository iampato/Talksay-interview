
import { where, collection, addDoc, deleteDoc, doc, query, getDocs, setDoc, CollectionReference, DocumentData, getDoc, collectionGroup, updateDoc, arrayUnion, limit, serverTimestamp } from "firebase/firestore/lite";
import { auth, ourDb } from "../../config/firebase_setup";
import DbConversation, { convoFromJson } from "../models/db_conversation";
import { DbMessage, msgFromJson } from "../models/db_message";
import { v4 as uuidv4 } from 'uuid';
import { UserRepository } from "./user_repository";

export namespace ChatRepository {
    const conversationsCollection = collection(ourDb, "chats");
    // const messagesCollection = (id: string, newId: string) => doc(ourDb, 'conversations', id, "messages", newId);
    // const messagesCollection1 = (id: string) => collection(ourDb, "conversations", id.toString(), "messages");

    // get chats
    export async function getChats(uid: string): Promise<DbConversation[] | undefined> {
        try {
            let currentUser = auth.currentUser;
            let users = await UserRepository.getUsers();
            const convo: DbConversation[] = [];
            const q = query(conversationsCollection, where("uid", "array-contains", uid));
            const querySnapshot = await getDocs(q);
            if (users !== undefined && currentUser !== null) {

                querySnapshot.forEach((doc) => {
                    let model = JSON.stringify(doc.data());
                    let convox = convoFromJson(model);
                    let uids = convox.uid;
                    let indexToRemove = uids.filter((uid) => uid !== currentUser?.uid ?? "");

                    let user = users?.filter((user) => user.id === indexToRemove[0]);
                    if (user !== undefined) {
                        convox.displayName = user[0].names;
                        convox.photoURL = user[0].photoUrl;
                    }
                    convo.push(convox);
                });
            }
            return convo;
        } catch (e) {
            console.log(e);
        }
    }
    // create chat
    export async function createChat(uid: string, otherUid: string, name: string, photoUrl: string): Promise<string | undefined> {
        try {
            let exist = false;
            // chat object
            let newChat: DbConversation = {
                uid: [uid, otherUid],
                displayName: name,
                photoURL: photoUrl,
                createdAt: new Date(),
                messages: [],
                id: uuidv4(),
            };
            // check if exist
            let allChats = await getChats(uid);
            if (allChats !== undefined) {
                for (let i = 0; i < allChats.length; i++) {
                    if (allChats[i].uid.includes(otherUid) && allChats[i].uid.includes(uid)) {
                        exist = true;
                    }
                }
            }
            // alert(exist);
            if (!exist) {
                // if does not exist 
                exist = false;
                // add to db
                let response = await addDoc(conversationsCollection, newChat);
                return response.id;
            } else {
                exist = false;
                return "";
            }
        } catch (e) {
            console.error("Error adding document: ", e);
            return undefined;
        }
    }
    // get messages in a conversation
    export async function getMessages(chatId: string): Promise<DbMessage[] | undefined> {
        try {
            const convo: DbMessage[] = [];
            console.log({ chatId });
            const qr = query(conversationsCollection, where("id", "==", chatId), limit(1));
            console.log({ qr });
            const querySnapshot = await getDocs(qr);
            console.log({ querySnapshot });
            let data = querySnapshot.docs[0].data();
            console.log({ data });
            let messages = data?.messages;
            console.log({ messages });
            messages.forEach((msg: any) => {
                let model = JSON.stringify(msg);
                convo.push(msgFromJson(model));
            });
            return convo;
        } catch (e) {
            console.error("Error adding document: ", e);
            return undefined;
        }
    }
    export async function getMessages2(myUid: string, otherUid: string): Promise<DbMessage[] | undefined> {
        try {
            const convo: DbMessage[] = [];
            let conversations = await getChats(myUid);
            if (conversations !== undefined) {
                for (let i = 0; i < conversations.length; i++) {
                    if (conversations[i].uid.includes(otherUid) && conversations[i].uid.includes(myUid)) {
                        let messages = await getMessages(conversations[i].id);
                        if (messages !== undefined) {
                            convo.push(...messages);
                        }
                    }
                }
            }

            return convo;
        } catch (e) {
            console.error("Error adding document: ", e);
            return undefined;
        }
    }


    // update message
    export async function updateMessage(chatId: string, senderId: string, msg: string): Promise<boolean> {
        try {
            let msgObj: DbMessage = {
                content: msg,
                senderId: senderId,
                time: new Date(),
            }
            const qr = query(conversationsCollection, where("id", "==", chatId), limit(1));
            const querySnapshot = await getDocs(qr);
            let data = querySnapshot.docs[0];
            let updateRef = doc(ourDb, "chats", `${data.id}`);

            await updateDoc(updateRef, {
                messages: arrayUnion(msgObj),
                createdAt: serverTimestamp(),
            });
            return true;
        } catch (e) {
            console.log(e);
            return false;
        }
    }
    export async function updateMessage2(myUid: string, otherUid: string, msg: string): Promise<boolean> {
        try {
            let msgObj: DbMessage = {
                content: msg,
                senderId: myUid,
                time: new Date(),
            }

            let conversations = await getChats(myUid);
            if (conversations !== undefined) {
                for (let i = 0; i < conversations.length; i++) {
                    if (conversations[i].uid.includes(otherUid) && conversations[i].uid.includes(myUid)) {
                        let updateRef = doc(ourDb, "chats", `${conversations[i].id}`);
                        await updateDoc(updateRef, {
                            messages: arrayUnion(msgObj),
                            createdAt: serverTimestamp(),
                        });
                    }
                }
            }
            return true;
        } catch (e) {
            console.log(e);
            return false;
        }
    }


    // // get conversations
    // export async function getConversation(uid: String): Promise<DbConversation[] | undefined> {

    //     try {
    //         const convo: DbConversation[] = [];
    //         const q = query(conversationsCollection, where("sender_id", "==", uid));
    //         const x = query(conversationsCollection, where("receipent_id", "==", uid));
    //         const querySnapshot = await getDocs(q)
    //         const querySnapshot2 = await getDocs(x)
    //         querySnapshot.forEach((doc) => {
    //             let model = JSON.stringify(doc.data());
    //             console.log(convoFromJson(model));
    //             convo.push(convoFromJson(model));
    //         });
    //         querySnapshot2.forEach((doc) => {
    //             let model = JSON.stringify(doc.data());
    //             console.log(convoFromJson(model));
    //             convo.push(convoFromJson(model));
    //         });
    //         // const q = query(conversationsCollection);
    //         // const unsubscribe = onSnapshot(q, (querySnapshot) => {

    //         return convo;
    //     } catch (e) {
    //         console.log(e);
    //     }
    // }

    // // get messages in a conversation
    // export async function getMessages(id: string): Promise<DbMessage[] | undefined> {
    //     try {
    //         const convo: DbMessage[] = [];
    //         // const q = query(collectionGroup(ourDb, 'conversations'));
    //         const querySnapshot = await getDocs(messagesCollection1(id));
    //         // console.log(querySnapshot);
    //         querySnapshot.forEach((doc) => {
    //             let model = JSON.stringify(doc.data());
    //             convo.push(msgFromJson(model));
    //         });
    //         return convo;
    //     } catch (e) {
    //         console.error("Error adding document: ", e);
    //         return undefined;
    //     }
    // }

    // // add a conversation
    // export async function createConversation(convo: DbConversation): Promise<String | undefined> {
    //     try {
    //         let parts = convo?.id?.toString().split("-");
    //         let newId = `${parts![1]}-${parts![0]}`;
    //         // check if exist
    //         const querySnapshot = query(conversationsCollection, where("id", "==", newId ?? ""));
    //         const qs = await getDocs(querySnapshot);
    //         if (qs.docs.length === 0) {
    //             await setDoc(doc(ourDb, "conversations", convo.id ?? ""), convo);
    //             console.log("Document written with ID: ", convo.id);
    //             return convo.id;
    //         } else {
    //             return convo.id;
    //         }
    //     } catch (e) {
    //         console.error("Error adding document: ", e);
    //     }
    // }
    // // add a message to a conversation
    // export async function createMessage(id: string, msg: DbMessage): Promise<String | undefined> {
    //     try {
    //         // alert(id);
    //         await setDoc(messagesCollection(id, msg.id), msg);
    //         updateConversation(id, "last_message", msg.message);
    //         console.log("Document written with ID: ", id);
    //         return id;

    //     } catch (e) {
    //         console.error("Error adding document: ", e);
    //         return undefined;
    //     }
    // }
    // // update conversation
    // export async function updateConversation(documentId: string, key: string, value: any): Promise<boolean | undefined> {
    //     try {
    //         const convRef = doc(ourDb, "conversations", documentId);
    //         await updateDoc(convRef, {
    //             last_message: value
    //         });
    //         return true;
    //     } catch (e) {
    //         console.error("Error adding document: ", e);
    //     }
    // }

    // delete a conversation
    export async function deleteConversation(convoId: string): Promise<boolean | undefined> {
        try {
            await deleteDoc(doc(ourDb, "conversations", convoId));
            return true;
        } catch (e) {
            console.error("Error adding document: ", e);
        }
    }

}
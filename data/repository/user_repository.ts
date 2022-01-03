import { GoogleAuthProvider, signInWithPopup, User } from "firebase/auth";
import { collection, query, addDoc, getDocs, where, limit } from "firebase/firestore/lite";
import { auth, ourDb } from "../../config/firebase_setup";
import DbUser, { userFromJson } from "../models/db_user";


export namespace UserRepository {
    const userCollection = collection(ourDb, "users");
    const provider = new GoogleAuthProvider();

    export function loginUser(): Promise<User | undefined> {
        return signInWithPopup(auth, provider)
            .then(async (result) => {
                // This gives you a Google Access Token. You can use it to access the Google API.
                const credential = GoogleAuthProvider.credentialFromResult(result);
                const token = credential?.accessToken;
                // The signed-in user info.
                const user = result.user;
                console.log({ credential, token, user });
                let saveUser: DbUser = {
                    id: user.uid,
                    names: user.displayName ?? "",
                    email: user.email ?? "",
                    photoUrl: user.photoURL ?? ""
                };
                await createDbUser(saveUser);
                return user;

            })
            .catch((error) => {
                // Handle Errors here.
                const errorCode = error.code;
                const errorMessage = error.message;
                // The email of the user's account used.
                const email = error.email;
                // The AuthCredential type that was used.
                const credential = GoogleAuthProvider.credentialFromError(error);
                console.log({ errorCode, errorMessage, email, credential });
                return undefined;
            });
    }

    export async function createDbUser(user: DbUser): Promise<String | undefined> {
        try {
            // check if exist
            const querySnapshot = query(userCollection, where("email", "==", user.email));
            const qs = await getDocs(querySnapshot);
            if (qs.docs.length === 0) {
                // add data if does not exist
                const docRef = await addDoc(userCollection, user);
                console.log("Document written with ID: ", docRef.id);
                return docRef.id;
            }

        } catch (e) {
            console.error("Error adding document: ", e);
        }
    }
    // get conversations
    export async function getUsers(): Promise<DbUser[] | undefined> {

        try {
            const users: DbUser[] = [];
            const q = query(userCollection);
            const querySnapshot = await getDocs(q)
            querySnapshot.forEach((doc) => {
                let model = JSON.stringify(doc.data());
                // console.log(model);
                users.push(userFromJson(model));
            });
            return users;
        } catch (e) {
            console.log(e);
        }
    }
    // get conversations
    export async function getUserById(id: string): Promise<DbUser | undefined> {

        try {
            const q = query(userCollection, where("id", "==", id), limit(1));
            const querySnapshot = await getDocs(q);
            let user = querySnapshot.docs[0];
            let model = userFromJson(JSON.stringify(user.data()));
            return model;
        } catch (e) {
            console.log(e);
        }
    }

    export function logOutUser(): boolean {
        try {
            auth.signOut();
            console.log("logout");
            return true;
        } catch (e) {
            return false
        }
    }

}
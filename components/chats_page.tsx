import { Form, InputGroup, Image, Button } from "react-bootstrap";
import styles from "../styles/Chats.module.css";
import { MdSearch } from "react-icons/md";
import { SnapList, SnapItem } from 'react-snaplist-carousel';
import { useRouter } from 'next/router';
import { observer } from "mobx-react-lite";
import { useStore } from "../data/mobx/store";
import LoadingUi from "./loading_ui";
import { NextPage } from "next";
import { useEffect } from "react";
import loadingAnimation from "../public/empty.json";
import Lottie from "lottie-react";
import { auth } from "../config/firebase_setup";

const ChatsPage: NextPage = () => {

    return (
        <>

            <h4 className={styles.title}>Chats</h4>
            <Form>
                <Form.Group className="mb-3">
                    <InputGroup className={styles.custominput}>
                        <InputGroup.Text className="text-input" ><MdSearch /></InputGroup.Text>
                        <Form.Control className={styles.custominput} type="search" placeholder="search users here" />
                    </InputGroup>
                </Form.Group>
            </Form>
            {/* <SnapList direction="horizontal" className={styles.online}>
                {
                    [1, 2, 3, 4, 5, 6, 7, 8, 9].map(e => {
                        return <SnapItem key={e} margin={{ left: '10px', right: '10px' }} snapAlign="start">
                            <div className={styles.onlinecard}>
                                <Image className={styles.cardimg} src="https://picsum.photos/100" roundedCircle />

                            </div>
                        </SnapItem>
                    })
                }

            </SnapList> */}
            <h5 className={styles.recent}>Recent</h5>
            <Conversation />

        </>
    );
}
const Conversation = observer(() => {
    const { convoStore } = useStore();
    const loading = convoStore.state.loading;
    const error = convoStore.state.error;
    const conversations = convoStore.state.payload;

    const router = useRouter();

    useEffect(() => {
        convoStore.getConversations();
    }, [])

    return (
        <>
            {
                loading === "loading" ? <LoadingUi /> : <SnapList
                    direction="vertical"
                    className={styles.online}
                    hideScrollbar={false}
                    height="58vh"
                >
                    {
                        conversations && (
                            conversations.length === 0 ?
                                <div style={{
                                    display: "flex",
                                    flexDirection: "column",
                                    justifyContent: "center",
                                    alignContent: "center",
                                    alignItems: "center",
                                }}>
                                    <Lottie
                                        style={{
                                            position: "relative",
                                            height: "40vh",
                                            alignContent: "center"
                                        }}
                                        // loop={false}
                                        // autoPlay={false}
                                        animationData={loadingAnimation}
                                    />
                                    <p style={{ textAlign: "center", opacity: 0.5 }}>You have no conversations</p>
                                </div> :
                                conversations.map((e, i) => {
                                    return <SnapItem key={i} margin={{ left: '10px', right: '10px' }} snapAlign="center">
                                        <div onClick={() => {
                                            const currentUser = auth.currentUser;
                                            let otherUser = e.uid.filter(e => e !== currentUser?.uid ?? "");
                                            router.push({
                                                pathname: "/detail",
                                                query: {
                                                    chatId: e.id,
                                                    senderId: currentUser?.uid ?? "",
                                                    receipentId: otherUser[0] ?? "",
                                                    displayName: e.displayName,
                                                    photoUrl: e.photoURL,
                                                },
                                            })
                                        }} className={styles.convocard}>
                                            <Image className={styles.convoimg} src={e.photoURL} roundedCircle />
                                            <div className={styles.convoname}>
                                                <h6>{e.displayName}</h6>
                                                <p>{e.messages.length === 0 ? "no message" : `${e.messages[e.messages.length - 1].content}`}</p>
                                            </div>
                                            <p>10:30</p>
                                        </div>
                                    </SnapItem>
                                })
                        )

                    }

                </SnapList>
            }
        </>

    );
})
export default ChatsPage;
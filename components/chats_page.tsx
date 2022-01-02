import { Form, InputGroup, Image, Button } from "react-bootstrap";
import styles from "../styles/Chats.module.css";
import { MdSearch } from "react-icons/md";
import { SnapList, SnapItem } from 'react-snaplist-carousel';
import { useRouter } from 'next/router';
import { UserRepository } from "../data/repository/user_repository";
import { observer } from "mobx-react-lite";
import { useStore } from "../data/mobx/store";
import LoadingUi from "./loading_ui";
import { NextPage } from "next";
import { useEffect } from "react";
import loadingAnimation from "../public/empty.json";
import Lottie from "lottie-react";

const ChatsPage: NextPage = () => {

    return (
        <>
            {/* <Head>
                <title>ChatTalk | Chats</title>
                <link
                    href="https://fonts.googleapis.com/css?family=Public+Sans"
                    rel="stylesheet"
                />
            </Head> */}

            <h4 onClick={() => {
                UserRepository.logOutUser();
            }} className={styles.title}>Chats</h4>
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
                    data.map(e => {
                        return <SnapItem key={e} margin={{ left: '10px', right: '10px' }} snapAlign="center">
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
            {/* <p onClick={() => {
                let x: DbConversation = {
                    last_message: " hey",
                    receipent_id: "NedLPZV8afOhYCSYocnzXw077Uu2",
                    sender_id: "dcjk63LzTPeZLjUWGrYoBZTaXFB3",
                    time: new Date(),
                    id: uuidv4(),
                }
                convoStore.addConversations(x);
            }}>
                Fuckkkkk
            </p> */}
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
                                conversations.map(e => {
                                    return <SnapItem key={e.id} margin={{ left: '10px', right: '10px' }} snapAlign="center">
                                        <div onClick={() => router.push("/detail")} className={styles.convocard}>
                                            <Image className={styles.convoimg} src={e.receipentPhoto} roundedCircle />
                                            <div className={styles.convoname}>
                                                <h6>{e.display_name}</h6>
                                                <p>{e.last_message === "" ? "no message" : e.last_message}</p>
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
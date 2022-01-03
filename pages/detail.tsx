import { Navbar, Image, Form, Spinner } from "react-bootstrap";
import { NextPage } from "next";
import Head from 'next/head';
import styles from "../styles/Detail.module.css";
import { MdOutlineArrowBackIosNew } from "react-icons/md";
import { RiSendPlaneFill } from "react-icons/ri";
import { useRouter, withRouter } from 'next/router';
import { SnapList, SnapItem } from 'react-snaplist-carousel';
import { MdOutlineMoreVert } from 'react-icons/md';
import { useEffect, useState } from "react";
import { useStore } from "../data/mobx/store";
import { observer } from "mobx-react-lite";
import LoadingUi from "../components/loading_ui";
import { auth } from "../config/firebase_setup";
import loadingAnimation from "../public/empty.json";
import Lottie from "lottie-react";
import { useAppContext } from "../components/app_context";

const DetailPage: NextPage = () => {
    const router = useRouter();
    const appContext = useAppContext();

    let chatId = appContext.chatId;
    let senderId = appContext.senderId;
    let receipentId = appContext.receipentId;
    let displayName = appContext.displayName;
    let photoUrl = appContext.photoUrl;

    const { convoStore } = useStore();
    const { msgStore } = useStore();

    useEffect(() => {
        convoStore.addConversations(
            appContext.senderId as string,
            appContext.receipentId as string,
            appContext.displayName as string,
            appContext.photoUrl as string,
        );
        if (chatId === undefined) {
            // alert("chatId is undefined");
            msgStore.getMessages2(senderId as string, receipentId as string);
        } else {
            // alert("chatId is defined");
            msgStore.getMessages(chatId as string);
        }
    }, []);

    return (
        <>
            <Head>
                <title>ChatTalk | Chats</title>
                <link
                    href="https://fonts.googleapis.com/css?family=Public+Sans"
                    rel="stylesheet"
                />
            </Head>

            {/* Top part */}
            <Navbar fixed="top">
                <div className={styles.header}>
                    <MdOutlineArrowBackIosNew size={23} onClick={() => router.back()} />
                    <Image className={styles.headerImg} src={photoUrl as string} roundedCircle />
                    <h6 onClick={() => {
                        router.push({
                            pathname: "/profile",
                            query: {
                                id: receipentId as string,
                            },
                        })
                    }}
                    >{displayName as string}</h6>
                    <MdOutlineMoreVert size={23} style={{ marginRight: 10 }} />
                </div>
            </Navbar>

            {/* body content */}
            <div className={styles.body}>
                <MessagesView />
            </div>

            {/* Bottom part */}
            <Navbar fixed="bottom">
                <SendMessageView
                    chatId={chatId === undefined ? undefined : chatId as string}
                    senderId={senderId as string}
                    receipentId={receipentId as string}
                />
            </Navbar>
        </>
    );
}

const SendMessageView: React.FC<{ chatId?: string, senderId: string, receipentId: string }> = observer(({ chatId, senderId, receipentId }) => {

    const { msgStore } = useStore();
    const loading = msgStore.state.addLoading;
    const addState = msgStore.state.addState;

    const [message, setMessage] = useState("");

    useEffect(() => {
        if (addState !== undefined) {
            if (addState) {
                setMessage("");
            }
        }
    }, [addState]);
    return (
        <div className={styles.footer}>

            <Form.Group >
                <Form.Control
                    value={message}
                    onChange={(e) => {
                        e.preventDefault();
                        setMessage(e.target.value);
                    }}
                    className={styles.footerInput}
                    type="text" placeholder="Enter message here" />
            </Form.Group>
            <div
                className={styles.sendBtn}
                onClick={() => {
                    console.log("send message");
                    console.log(chatId);
                    if (chatId === undefined) {
                        msgStore.addMessage2(senderId, receipentId, message);
                    } else {
                        msgStore.addMessage(chatId, senderId, message);
                    }
                }}
            >
                {
                    loading === "loading" ? <Spinner animation="border" variant="light" /> : <RiSendPlaneFill size={22} />
                }

            </div>
        </div>
    );
});

const MessagesView = observer(() => {
    const { msgStore } = useStore();
    const loading = msgStore.state.loading;
    const error = msgStore.state.error;
    const messages = msgStore.state.payload;

    return (
        <>
            {
                loading === "loading" ? <LoadingUi /> : <SnapList
                    direction="vertical"
                    hideScrollbar={false}
                // height="58vh"
                >
                    {
                        messages && (
                            messages.length === 0 ?
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
                                    <p style={{ textAlign: "center", opacity: 0.5 }}>You have no messages</p>
                                </div> : messages.map((msg, i) => {
                                    return <SnapItem key={i} margin={{ left: '10px', right: '10px' }} snapAlign="start">
                                        {
                                            msg.senderId == auth.currentUser?.uid ?? "" ? <div className="talk-bubble">
                                                <div className="tri-left right-top">
                                                    <div className="talktext">
                                                        <p>{msg.content}</p>
                                                    </div>
                                                </div>
                                            </div> : <div className="talk-bubble">
                                                <div className="tri-right left-top">
                                                    <div className="talktext">
                                                        <p>{msg.content}</p>
                                                    </div>
                                                </div>
                                            </div>
                                        }

                                    </SnapItem>;
                                })
                        )
                    }


                </SnapList>
            }
        </>
    );
});

DetailPage.getInitialProps = async (ctx) => {
    const { query } = ctx;
    return {};
}

export default withRouter(DetailPage);
import { Navbar, Image, Form, Dropdown, Spinner } from "react-bootstrap";
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
import DbConversation from "../data/models/db_conversation";
import { DbMessage } from "../data/models/db_message";
import { v4 as uuidv4 } from 'uuid';
import { observer } from "mobx-react-lite";
import LoadingUi from "../components/loading_ui";
import { auth } from "../config/firebase_setup";

const DetailPage: NextPage = () => {
    const router = useRouter();
    const [convoId, setConvoId] = useState("");
    const [id, setId] = useState("");
    const [name, setName] = useState("");
    const [profile, setProfile] = useState("");
    const { convoStore } = useStore();
    const { msgStore } = useStore();

    useEffect(() => {
        setConvoId(router.query.convoId as string);
        setId(router.query.myId as string);
        setName(router.query.name as string);
        setProfile(router.query.photoUrl as string);

        // get messages
        msgStore.getMessages(router.query.convoId as string);
        //
        let dx: DbConversation = {
            id: router.query.convoId as string,
            display_name: router.query.name as string,
            sender_id: router.query.myId as string,
            last_message: "",
            receipentEmail: router.query.email as string,
            receipentId: router.query.receipentId as string,
            receipentPhoto: router.query.photoUrl as string,
            time: new Date(),
        }
        convoStore.addConversations(dx);
    }, [])
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
                    <Image className={styles.headerImg} src={profile} roundedCircle />
                    <h6>{name}</h6>
                    <MdOutlineMoreVert size={23} style={{ marginRight: 10 }} />
                </div>
            </Navbar>

            {/* body content */}
            <div className={styles.body}>
                <MessagesView />
            </div>

            {/* Bottom part */}
            <Navbar fixed="bottom">
                <SendMessageView convoId={convoId} />
            </Navbar>
        </>
    );
}

const SendMessageView: React.FC<{ convoId: string }> = observer(({ convoId }) => {

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
                    let msg: DbMessage = {
                        id: uuidv4(),
                        message: message,
                        time: new Date(),
                        senderId: uuidv4(),
                    }
                    msgStore.addMessage(convoId, msg);
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
                            messages.map((msg) => {
                                return <SnapItem key={msg.id} margin={{ left: '10px', right: '10px' }} snapAlign="start">
                                    {
                                        msg.id !== auth.currentUser?.uid ?? "" ? <div className="talk-bubble">
                                            <div className="tri-left right-top">
                                                <div className="talktext">
                                                    <p>{msg.message}</p>
                                                </div>
                                            </div>
                                        </div> : <div className="talk-bubble">
                                            <div className="tri-right left-top">
                                                <div className="talktext">
                                                    <p>{msg.message}</p>
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
export default withRouter(DetailPage);
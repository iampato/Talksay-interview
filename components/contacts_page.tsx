import styles from "../styles/Chats.module.css";
import { SnapList, SnapItem } from 'react-snaplist-carousel';
import { observer } from "mobx-react-lite";
import { useStore } from "../data/mobx/store";
import LoadingUi from "./loading_ui";
import router from "next/router";
import { Image } from "react-bootstrap";
import { useEffect } from "react";
import { auth, ourDb } from "../config/firebase_setup";
import loadingAnimation from "../public/empty.json";
import Lottie from "lottie-react";

const ContactsPage = observer(() => {
    const { usersStore } = useStore();
    const loading = usersStore.state.loading;
    const error = usersStore.state.error;
    const users = usersStore.state.payload;

    useEffect(() => {
        usersStore.getUsers();
    }, []);


    return (
        <>
            <h4 className={styles.title}>Contacts</h4>
            {
                loading === "loading" ? <LoadingUi /> : <SnapList
                    direction="vertical"
                    className={styles.online}
                    hideScrollbar={false}
                // height="58vh"
                >
                    {

                        users && (
                            users.length === 0 ?
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
                                    loop={false}
                                    autoPlay={false}
                                    animationData={loadingAnimation}
                                />
                                <p style={{ textAlign: "center", opacity: 0.5 }}>There are no contacts</p>
                            </div> : users.map(e => {
                                return <SnapItem key={e.id} margin={{ left: '10px', right: '10px' }} snapAlign="center">
                                    <div
                                        onClick={() => {
                                            //  chatId, senderId, receipentId, displayName, photoUrl
                                            const currentUser = auth.currentUser;
                                            router.push({
                                                pathname: "/detail",
                                                query: {
                                                    chatId: undefined,
                                                    senderId: currentUser?.uid ?? "",
                                                    receipentId: e.id,
                                                    displayName: e.names,
                                                    photoUrl: e.photoUrl,
                                                },
                                            })
                                        }}
                                        className={styles.convocard}
                                    >
                                        <Image className={styles.convoimg} src={e.photoUrl} roundedCircle />
                                        <div className={styles.convoname}>
                                            <h6>{e.id === auth.currentUser?.uid ?? "" ? "You" : e.names}</h6>
                                            <p>{e.email}</p>
                                        </div>
                                    </div>
                                </SnapItem>
                            })
                        )

                    }

                </SnapList>
            }

        </>
    );
});

export default ContactsPage;
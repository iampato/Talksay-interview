import styles from "../styles/Chats.module.css";
import { SnapList, SnapItem } from 'react-snaplist-carousel';
import { observer } from "mobx-react-lite";
import { useStore } from "../data/mobx/store";
import LoadingUi from "./loading_ui";
import router from "next/router";
import { Image } from "react-bootstrap";
import { useEffect, useState } from "react";
import { auth } from "../config/firebase_setup";

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
                            users.map(e => {
                                return <SnapItem key={e.id} margin={{ left: '10px', right: '10px' }} snapAlign="center">
                                    <div
                                        onClick={() => {
                                            const currentUser = auth.currentUser;
                                            console.log(currentUser?.uid);
                                            router.push({
                                                pathname: "/detail",
                                                query: {
                                                    convoId: e.id + "-" + currentUser?.uid,
                                                    myId: currentUser?.uid ?? "",
                                                    receipentId: e.id,
                                                    name: e.names,
                                                    photoUrl: e.photoUrl,
                                                    email: e.email,
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
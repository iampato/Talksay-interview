import { NextPage } from "next";
import { useEffect, useState } from "react";
import { Navbar } from "react-bootstrap";
import { RiChatSmile2Fill, RiContactsFill, RiProfileFill } from "react-icons/ri";
import ChatsPage from "../components/chats_page";
import ContactsPage from "../components/contacts_page";
import styles from "../styles/Main.module.css";
import Head from 'next/head';
import { observer } from 'mobx-react-lite';
import { useStore } from "../data/mobx/store";
import ProfilePage from "../components/my_profile_page";

const HomePage: NextPage = observer(() => {
    const [tab, setTab] = useState(0);

    const { authStore } = useStore();
    const loggedIn = authStore.authState.loggedIn;

    const onTabChange = (tab: number) => {
        setTab(tab);
    };


    useEffect(() => {
        authStore.isUserLoggedIn();
        if (loggedIn !== undefined) {
            if (!loggedIn) {
                window.location.replace("/login");
            }
        }
    }, [loggedIn]);

    return (
        <>
            <Head>
                <title>ChatTalk | Home</title>
            </Head>

            <Navbar fixed="bottom">
                <div className={styles.menu}>
                    <div onClick={() => onTabChange(0)}>
                        <RiChatSmile2Fill
                            style={{
                                opacity: tab === 0 ? 1 : 0.6,
                            }}
                            size={23} />
                    </div>
                    <div onClick={() => onTabChange(1)}>
                        <RiContactsFill
                            style={{
                                opacity: tab === 1 ? 1 : 0.6,
                            }}
                            size={23} />
                    </div>
                    <div onClick={() => onTabChange(2)}>
                        <RiProfileFill
                            style={{
                                opacity: tab === 2 ? 1 : 0.6,
                            }}
                            size={23} />
                    </div>
                </div>
            </Navbar>

            <div className={styles.bg}>
                <div className="tab-content py-0 px-0">
                    <div className={"tab-pane fade show " + (tab === 0 ? "active" : "")} role="tabpanel"
                        aria-labelledby="overview-tab">
                        <ChatsPage />
                    </div>
                    <div className={"tab-pane fade show " + (tab === 1 ? "active" : "")} role="tabpanel"
                        aria-labelledby="overview-tab">
                        <ContactsPage />
                    </div>
                    <div className={"tab-pane fade show " + (tab === 2 ? "active" : "")} role="tabpanel"
                        aria-labelledby="overview-tab">
                        <ProfilePage />
                    </div>
                </div>
            </div>
        </>
    );
});

export default HomePage;
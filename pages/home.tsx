import { NextPage } from "next";
import { useState } from "react";
import { Navbar } from "react-bootstrap";
import { RiChatSmile2Fill, RiContactsFill, RiProfileFill } from "react-icons/ri";
import ChatsPage from "../components/chats_page";
import styles from "../styles/Main.module.css";

const HomePage: NextPage = () => {
    const [tab, setTab] = useState(0);

    const onTabChange = (tab: number) => {
        setTab(tab);
    };

    return (
        <>
            <head>
                <title>TalkChat | Home</title>
            </head>

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
                        <ChatsPage/>
                    </div>
                    <div className={"tab-pane fade show " + (tab === 1 ? "active" : "")} role="tabpanel"
                        aria-labelledby="overview-tab">
                        <p>Contacts</p>
                    </div>
                    <div className={"tab-pane fade show " + (tab === 2 ? "active" : "")} role="tabpanel"
                        aria-labelledby="overview-tab">
                        <p>Profile</p>
                    </div>
                </div>
            </div>
        </>
    );
}
export default HomePage;
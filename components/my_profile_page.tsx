import { NextPage } from "next";
import { auth } from "../config/firebase_setup";
import styles from "../styles/Profile.module.css";
import { Image } from "react-bootstrap";
import { MdOutlineExitToApp, MdContactSupport, MdShare } from "react-icons/md";
import { UserRepository } from "../data/repository/user_repository";
import { useEffect, useState } from "react";
import { User } from "firebase/auth";

const ProfilePage: NextPage = () => {
    const [user, setUser] = useState<User | null>(null);

    useEffect(() => {
        let currentUser = auth.currentUser;
        setUser(currentUser);
    }, [])
    
    return (
        <>
            <h4 className={styles.title}>Profile</h4>
            <div className={styles.container}>
                <Image className={styles.img} src={user?.photoURL ?? "https://picsum.photos/200"} roundedCircle />
                <h5 className={styles.title}>{user?.displayName ?? "Null"}</h5>
                <p className={styles.bio}>{user?.email ?? "null"}</p>
                <hr className={styles.divider} />
                <div className={styles.card} onClick={() => UserRepository.logOutUser()}>
                    <h6>Logout</h6>
                    <div className={styles.icon}>
                        <MdOutlineExitToApp size={22} color="#7269ef" />
                    </div>
                </div>
                <div className={styles.card} onClick={() => { }}>
                    <h6>Share this website</h6>
                    <div className={styles.icon}>
                        <MdShare size={22} color="#7269ef" />
                    </div>
                </div>
                <div className={styles.card}>
                    <h6>Feedback and contact</h6>
                    <div className={styles.icon}>
                        <MdContactSupport size={22} color="#7269ef" />
                    </div>
                </div>
            </div>

        </>
    );
}

export default ProfilePage;
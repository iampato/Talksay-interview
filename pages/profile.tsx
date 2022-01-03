import { NextPage } from "next";
import { useRouter, withRouter } from 'next/router';
import styles from "../styles/Profile.module.css";
import { Image } from "react-bootstrap";
import { MdOutlineExitToApp, MdContactSupport, MdShare } from "react-icons/md";
import { UserRepository } from "../data/repository/user_repository";
import { observer } from "mobx-react-lite";
import { useStore } from "../data/mobx/store";
import LoadingUi from "../components/loading_ui";
import { useEffect } from "react";

const OtherProfilePage: NextPage = observer(() => {
    const router = useRouter();
    const { profileStore } = useStore();
    const user = profileStore.loginState.user;
    const loading = profileStore.loginState.loading;
    const { id } = router.query;

    useEffect(() => {
        profileStore.getProfile(id as string);
    }, []);

    return (
        <>
            <h4 className={styles.title}>Profile</h4>
            {
                loading === "loading" ? <LoadingUi /> : <div className={styles.container}>
                    <Image className={styles.img} src={user?.photoUrl ?? "https://picsum.photos/200"} roundedCircle />
                    <h5 className={styles.title}>{user?.names ?? "Null"}</h5>
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
            }


        </>
    );
});

export default withRouter(OtherProfilePage);
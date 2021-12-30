import type { NextPage } from 'next'
import Head from 'next/head'
import { Button } from 'react-bootstrap';
import styles from '../styles/Login.module.css';
import { BsGoogle } from "react-icons/bs";

const LoginPage: NextPage = () => {
    return (
        <>
            <Head>
                <title>TalkChat | Login</title>
            </Head>
            <main className={styles.main}>
                <div className={styles.container}>
                    <div className={styles.content}>
                        {/* <img src="/favicon.ico" alt="logo" /> */}
                        <h1>TalkChat</h1>
                        <p>
                            Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                            Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.
                        </p>
                    </div>

                    <div className={styles.btnlogin}>
                        <Button variant="danger" size="lg">
                            <span><BsGoogle /></span>
                            <span className={styles.divider} />
                            Login with Google
                        </Button>
                    </div>
                </div>
            </main>
        </>
    );
}
export default LoginPage;
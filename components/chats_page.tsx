import { Form, InputGroup, Image } from "react-bootstrap";
import styles from "../styles/Chats.module.css";
import { MdSearch } from "react-icons/md";
import { SnapList, SnapItem } from 'react-snaplist-carousel';
import Head from 'next/head';
import { useRouter } from 'next/router';

const ChatsPage = () => {

    let data = [1, 2, 3, 4, 5, 6, 7, 1, 2];
    const router = useRouter();

    return (
        <>
            <Head>
                <title>ChatTalk | Chats</title>
                <link
                    href="https://fonts.googleapis.com/css?family=Public+Sans"
                    rel="stylesheet"
                />
            </Head>

            <h4 className={styles.title}>Chats</h4>
            <Form>
                <Form.Group className="mb-3">
                    <InputGroup className={styles.custominput}>
                        <InputGroup.Text className="text-input" ><MdSearch /></InputGroup.Text>
                        <Form.Control className={styles.custominput} type="search" placeholder="search users here" />
                    </InputGroup>
                </Form.Group>
            </Form>
            <SnapList direction="horizontal" className={styles.online}>
                {
                    data.map(e => {
                        return <SnapItem key={e} margin={{ left: '10px', right: '10px' }} snapAlign="center">
                            <div className={styles.onlinecard}>
                                <Image className={styles.cardimg} src="https://picsum.photos/100" roundedCircle />
                                
                            </div>
                        </SnapItem>
                    })
                }

            </SnapList>
            <h5 className={styles.recent}>Recent</h5>
            <SnapList
                direction="vertical"
                className={styles.online}
                hideScrollbar={false}
                height="58vh"
            >
                {
                    data.map(e => {
                        return <SnapItem  key={e} margin={{ left: '10px', right: '10px' }} snapAlign="center">
                            <div onClick={()=> router.push("/detail")} className={styles.convocard}>
                                <Image className={styles.convoimg} src="https://picsum.photos/100" roundedCircle />
                                <div className={styles.convoname}>
                                    <h6>Patrick Waweru</h6>
                                    <p>okay sure</p>
                                </div>

                                <p>10:30</p>
                            </div>
                        </SnapItem>
                    })
                }

            </SnapList>
        </>
    );
}
export default ChatsPage;
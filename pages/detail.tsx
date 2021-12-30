import { Navbar, Image, Form, Dropdown } from "react-bootstrap";
import { NextPage } from "next";
import Head from 'next/head';
import styles from "../styles/Detail.module.css";
import { MdOutlineArrowBackIosNew } from "react-icons/md";
import { RiSendPlaneFill } from "react-icons/ri";
import { useRouter } from 'next/router';
import { SnapList, SnapItem } from 'react-snaplist-carousel';
import { MdOutlineMoreVert } from 'react-icons/md';

const DetailPage: NextPage = () => {
    const router = useRouter();

    let data = [1, 2, 3, 4, 5, 6, 7, 1, 2, 3, 4, 5, 6, 7, 1, 2];

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
                    <Image className={styles.headerImg} src="https://picsum.photos/100" roundedCircle />
                    <h6>Patrick Waweru M</h6>
                    <MdOutlineMoreVert size={23} style={{ marginRight: 10 }} />
                </div>
            </Navbar>

            {/* body content */}
            <div className={styles.body}>
                <SnapList
                    direction="vertical"
                    hideScrollbar={false}
                // height="58vh"
                >
                    <SnapItem margin={{ left: '10px', right: '10px' }} snapAlign="start">
                        <div className="talk-bubble">
                            <div className="tri-left right-top">
                                <div className="talktext">
                                    <p>This one adds a right triangle on the left, flush at the top by using .tri-right and .left-top to specify the location.</p>
                                </div>
                            </div>
                        </div>

                    </SnapItem>
                    <SnapItem margin={{ left: '10px', right: '10px' }} snapAlign="start">
                        <div className="talk-bubble">
                            <div className="tri-left right-top">
                                <div className="talktext">
                                    <p>This one adds a right triangle on the left, flush at the top by using .tri-right and .left-top to specify the location.</p>
                                </div>
                            </div>
                        </div>
                    </SnapItem>
                    <SnapItem margin={{ left: '10px', right: '10px' }} snapAlign="start">
                        <div className="talk-bubble">
                            <div className="tri-right left-top">
                                <div className="talktext">
                                    <p>This one adds a right triangle on the left, flush at the top by using .tri-right and .left-top to specify the location.</p>
                                </div>
                            </div>
                        </div>
                    </SnapItem>
                    <SnapItem margin={{ left: '10px', right: '10px' }} snapAlign="start">
                        <div className="talk-bubble">
                            <div className="tri-left right-top">
                                <div className="talktext">
                                    <p>This one adds a right triangle on the left, flush at the top by using .tri-right and .left-top to specify the location.</p>
                                </div>
                            </div>
                        </div>
                    </SnapItem>
                    <SnapItem margin={{ left: '10px', right: '10px' }} snapAlign="start">
                        <div className="talk-bubble">
                            <div className="tri-right left-top">
                                <div className="talktext">
                                    <p>This one adds a right triangle on the left, flush at the top by using .tri-right and .left-top to specify the location.</p>
                                </div>
                            </div>
                        </div>
                    </SnapItem>
                    <SnapItem margin={{ left: '10px', right: '10px' }} snapAlign="start">
                        <div className="talk-bubble">
                            <div className="tri-left right-top">
                                <div className="talktext">
                                    <p>This one adds a right triangle on the left, flush at the top by using .tri-right and .left-top to specify the location.</p>
                                </div>
                            </div>
                        </div>
                    </SnapItem>
                    <SnapItem margin={{ left: '10px', right: '10px' }} snapAlign="start">
                        <div className="talk-bubble">
                            <div className="tri-right left-top">
                                <div className="talktext">
                                    <p>This one adds a right triangle on the left, flush at the top by using .tri-right and .left-top to specify the location.</p>
                                </div>
                            </div>
                        </div>
                    </SnapItem>
                    <SnapItem margin={{ left: '10px', right: '10px' }} snapAlign="start">
                        <div className="talk-bubble">
                            <div className="tri-left right-top">
                                <div className="talktext">
                                    <p>This one adds a right triangle on the left, flush at the top by using .tri-right and .left-top to specify the location.</p>
                                </div>
                            </div>
                        </div>
                    </SnapItem>

                </SnapList>
            </div>

            {/* Bottom part */}
            <Navbar fixed="bottom">
                <div className={styles.footer}>
                    <Form>
                        <Form.Group >
                            <Form.Control className={styles.footerInput} type="text" placeholder="Enter message here" />
                        </Form.Group>
                    </Form>
                    <div className={styles.sendBtn}>
                        <RiSendPlaneFill size={22} />
                    </div>
                </div>
            </Navbar>
        </>
    );
}
export default DetailPage;
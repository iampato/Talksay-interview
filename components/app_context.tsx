import React, { useEffect } from "react";

interface AppContextInterface {
    chatId: string | undefined;
    senderId: string | undefined;
    receipentId: string | undefined;
    displayName: string | undefined;
    photoUrl: string | undefined;
    setChatId: (chatId: string | undefined) => void;
    setSenderId: (senderId: string) => void;
    setReceipentId: (receipentId: string) => void;
    setDisplayName: (senderId: string) => void;
    setPhotoUrl: (photoUrl: string) => void;
}
const defaultContext: AppContextInterface = {
    chatId: undefined,
    senderId: undefined,
    receipentId: undefined,
    displayName: undefined,
    photoUrl: undefined,
    setChatId: () => { },
    setSenderId: () => { },
    setReceipentId: () => { },
    setDisplayName: () => { },
    setPhotoUrl: () => { },
};


export const AppContext = React.createContext<AppContextInterface>(defaultContext);

interface Props {
    children: JSX.Element | JSX.Element[],
};
const AppWrapper: React.FC<Props> = (props) => {


    const [chatId, setChatId] = React.useState<string | undefined>("");
    const [senderId, setSenderId] = React.useState("");
    const [receipentId, setReceipentId] = React.useState("");
    const [displayName, setDisplayName] = React.useState("");
    const [photoUrl, setPhotoUrl] = React.useState("");

    const value: AppContextInterface = {
        chatId: chatId,
        senderId: senderId,
        receipentId: receipentId,
        displayName: displayName,
        photoUrl: photoUrl,
        setChatId: (chatId: string | undefined) => {
            setChatId(chatId);
            if (chatId !== undefined) {
                localStorage.setItem("chatId", chatId);
            }
        },
        setSenderId: (senderId: string) => {
            setSenderId(senderId);
            localStorage.setItem("senderId", senderId);
        },
        setReceipentId: (receipentId: string) => {
            setReceipentId(receipentId);
            localStorage.setItem("receipentId", receipentId);
        },
        setDisplayName: (displayName: string) => {
            setDisplayName(displayName);
            localStorage.setItem("displayName", displayName);
        },
        setPhotoUrl: (photoUrl: string) => {
            setPhotoUrl(photoUrl);
            localStorage.setItem("photoUrl", photoUrl);
        },

    };
    useEffect(() => {
        const chatId = localStorage.getItem("chatId");
        const senderId = localStorage.getItem("senderId");
        const receipentId = localStorage.getItem("receipentId");
        const displayName = localStorage.getItem("displayName");
        const photoUrl = localStorage.getItem("photoUrl");
        if (chatId) {
            setChatId(chatId);
        }
        if (senderId) {
            setSenderId(senderId);
        }
        if (receipentId) {
            setReceipentId(receipentId);
        }
        if (displayName) {
            setDisplayName(displayName);
        }
        if (photoUrl) {
            setPhotoUrl(photoUrl);
        }
    }, []);
    return (
        <AppContext.Provider value={value}>
            {props.children}
        </AppContext.Provider>
    );
}

export function useAppContext(): AppContextInterface {
    return React.useContext(AppContext);
}

export default AppWrapper;
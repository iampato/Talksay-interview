import { createContext, useContext } from "react";
import AuthenticationStore from "./store/authentication_store";
import ConversationStore from "./store/conversation_store";
import LoginStore from "./store/login_store";
import MessageStore from "./store/messages_store";
import ProfileStore from "./store/profile_store";
import UsersStore from "./store/users_store";

export interface IStore {
    authStore: AuthenticationStore,
    loginStore: LoginStore,
    convoStore: ConversationStore,
    usersStore: UsersStore,
    msgStore: MessageStore,
    profileStore: ProfileStore,
}
export const store: IStore = {
    authStore: new AuthenticationStore(),
    loginStore: new LoginStore(),
    convoStore: new ConversationStore(),
    usersStore: new UsersStore(),
    msgStore: new MessageStore(),
    profileStore: new ProfileStore(),
}
export const StoreContext = createContext(store);

export const useStore = () => {
    return useContext(StoreContext);
};
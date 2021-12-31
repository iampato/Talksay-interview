import { createContext, useContext } from "react";
import AuthenticationStore from "./store/authentication_store";
import LoginStore from "./store/login_store";

export interface IStore {
    authStore: AuthenticationStore,
    loginStore: LoginStore,
}
export const store: IStore = {
    authStore: new AuthenticationStore(),
    loginStore: new LoginStore(),
}
export const StoreContext = createContext(store);

export const useStore = () => {
    return useContext(StoreContext);
};
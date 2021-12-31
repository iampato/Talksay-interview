import { createContext, useContext } from "react";
import AuthenticationStore from "./store/authentication_store";

export interface IStore {
    authStore: AuthenticationStore,
}
export const store: IStore = {
    authStore: new AuthenticationStore(),
}
export const StoreContext = createContext(store);

export const useStore = () => {
    return useContext(StoreContext);
};
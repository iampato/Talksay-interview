import { User } from 'firebase/auth';
import { action, makeObservable, observable, runInAction } from 'mobx';
import { onAuthStateChanged } from "firebase/auth";
import { auth } from '../../../config/firebase_setup';
import { UserRepository } from '../../repository/user_repository';

export interface AuthenticationState {
    loading: string,
    loggedIn: boolean | undefined,
    user: User | undefined,
    error: string | undefined,
}

const initialState: AuthenticationState = {
    loading: "loading",
    loggedIn: undefined,
    user: undefined,
    error: undefined
}

class AuthenticationStore {
    // create our observable state
    @observable authState: AuthenticationState = initialState;

    constructor() {
        makeObservable(this);
    }

    @action
    isUserLoggedIn = () => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                const uid = user.uid;
                console.log({ uid });
                runInAction(() => {
                    this.authState = {
                        ...this.authState,
                        loggedIn: true,
                        user: user,
                        loading: "idle",
                    }
                });
            } else {
                runInAction(() => {
                    this.authState = {
                        ...this.authState,
                        loggedIn: false,
                        loading: "idle",
                    }
                });
            }
        });
    }

    @action
    authenticateUser = () => {

    }

    @action
    logOutUser = () => {
        UserRepository.logOutUser();
    }
}

export default AuthenticationStore;
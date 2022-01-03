import { User } from "firebase/auth";
import { observable, makeObservable, action, runInAction } from "mobx";
import { UserRepository } from "../../repository/user_repository";

export interface State {
    loading: string,
    loggedIn: boolean | undefined,
    user: User | undefined,
    error: string | undefined,
}

const initialState: State = {
    loading: "idle",
    loggedIn: undefined,
    user: undefined,
    error: undefined
}

class LoginStore {
    // create our observable state
    @observable loginState: State = initialState;

    constructor() {
        makeObservable(this);
    }

    @action
    loginWithGoogle = () => {
        runInAction(() => {
            this.loginState.loading = "loading";
        });
        UserRepository.loginUser()
            .then(res => {
                if (res != undefined) {
                    runInAction(() => {
                        this.loginState = {
                            ...this.loginState,
                            error: undefined,
                            loading: "idle",
                            user: res,
                        }
                    });
                } else {
                    runInAction(() => {
                        this.loginState = {
                            ...this.loginState,
                            error: "An error occurred",
                            loading: "idle",
                        }
                    });
                }
            })
            .catch(e => {
                console.error(e);
                runInAction(() => {
                    this.loginState = {
                        ...this.loginState,
                        error: (e as Error).message,
                        loading: "idle",
                    }
                });
            });
    }
}

export default LoginStore;
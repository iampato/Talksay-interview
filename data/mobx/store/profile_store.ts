import { User } from "firebase/auth";
import { observable, makeObservable, action, runInAction } from "mobx";
import DbUser from "../../models/db_user";
import { UserRepository } from "../../repository/user_repository";

export interface State {
    loading: string,
    user: DbUser | undefined,
    error: string | undefined,
}

const initialState: State = {
    loading: "idle",
    user: undefined,
    error: undefined
}

class ProfileStore {
    // create our observable state
    @observable loginState: State = initialState;

    constructor() {
        makeObservable(this);
    }

    @action
    getProfile = (id: string) => {
        runInAction(() => {
            this.loginState.loading = "loading";
        });
        UserRepository.getUserById(id)
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

export default ProfileStore;
import { action, makeObservable, observable, runInAction } from "mobx";
import DbUser from "../../models/db_user";
import { UserRepository } from "../../repository/user_repository";

export interface State {
    loading: string,
    payload: DbUser[] | undefined,
    error: string | undefined,
}

const initialState: State = {
    loading: "idle",
    payload: undefined,
    error: undefined
}

class UsersStore {
    // create our observable state
    @observable state: State = initialState;

    constructor() {
        makeObservable(this);
    }

    @action
    getUsers = () => {
        runInAction(() => {
            this.state = {
                ...this.state,
                loading: "loading",
            }
        });
        UserRepository.getUsers()
            .then(res => {
                if (res !== undefined) {

                    runInAction(() => {
                        this.state = {
                            ...this.state,
                            error: undefined,
                            loading: "idle",
                            payload: res,
                        }
                    });
                } else {
                    runInAction(() => {
                        this.state = {
                            ...this.state,
                            error: "An error occurred",
                            loading: "idle",
                        }
                    });
                }
            })
            .catch(e => {
                console.error(e);
                runInAction(() => {
                    this.state = {
                        ...this.state,
                        error: (e as Error).message,
                        loading: "idle",
                    }
                });
            });

    }
}

export default UsersStore;
import { observable, makeObservable, action, runInAction } from "mobx";
import { DbMessage } from "../../models/db_message";
import { ChatRepository } from "../../repository/chat_repository";

export interface State {
    loading: string,
    addLoading: string | undefined,
    addState: boolean | undefined,
    payload: DbMessage[] | undefined,
    error: string | undefined,
}

const initialState: State = {
    loading: "idle",
    addLoading: "idle",
    addState: undefined,
    payload: undefined,
    error: undefined
}

class MessageStore {
    // create our observable state
    @observable state: State = initialState;

    constructor() {
        makeObservable(this);
    }
    @action
    getMessages = (id: string) => {
        runInAction(() => {
            this.state.addState = undefined;
            this.state.loading = "loading";
        });
        ChatRepository.getMessages(id)
            .then(res => {
                if (res != undefined) {
                    runInAction(() => {
                        this.state = {
                            ...this.state,
                            error: undefined,
                            loading: "idle",
                            payload: res
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

    @action
    addMessage = (id: string, message: DbMessage) => {
        runInAction(() => {
            this.state.addState = undefined;
            this.state.addLoading = "loading";
        });
        ChatRepository.createMessage(id, message)
            .then(res => {
                if (res != undefined) {
                    runInAction(() => {
                        this.state = {
                            ...this.state,
                            error: undefined,
                            addState: true,
                            addLoading: "idle",
                        }
                    });
                } else {
                    runInAction(() => {
                        this.state = {
                            ...this.state,
                            addState: false,
                            error: "An error occurred",
                            addLoading: "idle",
                        }
                    });
                }
            })
            .catch(e => {
                console.error(e);
                runInAction(() => {
                    this.state = {
                        ...this.state,
                        addState: false,
                        error: (e as Error).message,
                        addLoading: "idle",
                    }
                });
            });
    }
}

export default MessageStore;
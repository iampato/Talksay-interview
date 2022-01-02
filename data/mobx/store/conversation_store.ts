import { onAuthStateChanged } from "firebase/auth";
import { observable, makeObservable, action, runInAction } from "mobx";
import { auth } from "../../../config/firebase_setup";
import DbConversation from "../../models/db_conversation";
import { ChatRepository } from "../../repository/chat_repository";

export interface State {
    loading: string,
    addLoading: string | undefined,
    payload: DbConversation[] | undefined,
    error: string | undefined,
}

const initialState: State = {
    loading: "idle",
    addLoading: "idle",
    payload: undefined,
    error: undefined
}

class ConversationStore {
    // create our observable state
    @observable state: State = initialState;

    constructor() {
        makeObservable(this);
    }

    @action
    getConversations = () => {
        runInAction(() => {
            this.state = {
                ...this.state,
                loading: "loading",
            }
        });
        setTimeout(() => {
            onAuthStateChanged(auth, async (user) => {
                if (user) {
                    ChatRepository.getConversation(user.uid)
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
            });

        }, 1000);

    }
    @action
    addConversations = (convo: DbConversation) => {
        runInAction(() => {
            this.state.addLoading = "loading";
        });
        ChatRepository.createConversation(convo)
            .then(res => {
                if (res != undefined) {
                    runInAction(() => {
                        this.state = {
                            ...this.state,
                            error: undefined,
                            addLoading: "idle",
                        }
                    });
                } else {
                    runInAction(() => {
                        this.state = {
                            ...this.state,
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
                        error: (e as Error).message,
                        addLoading: "idle",
                    }
                });
            });
    }
}

export default ConversationStore;
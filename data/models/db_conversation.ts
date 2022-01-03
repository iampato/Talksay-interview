import { User } from "firebase/auth";
import { DbMessage } from "./db_message";

interface DbConversation {
    uid: string[],
    id: string,
    displayName: string,
    photoURL: string,
    createdAt: Date,
    messages: DbMessage[],
}
export function convoFromJson(json: string): DbConversation {
    return JSON.parse(json);
}
export default DbConversation;
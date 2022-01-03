export interface DbMessage {
    // id: string,
    content: string,
    senderId: string,
    time: Date,
}
export function msgFromJson(json: string): DbMessage {
    return JSON.parse(json);
}
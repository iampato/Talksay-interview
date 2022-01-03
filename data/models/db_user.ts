interface DbUser {
    id: string,
    names: string,
    email: string,
    photoUrl: string
}
export function userFromJson(json: string): DbUser {
    return JSON.parse(json);
}
export default DbUser;
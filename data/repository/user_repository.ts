import { GoogleAuthProvider, signInWithPopup, User } from "firebase/auth";
import { auth } from "../../config/firebase_setup";


export namespace UserRepository {
    const provider = new GoogleAuthProvider();

    export function loginUser(): Promise<User | undefined> {
        return signInWithPopup(auth, provider)
            .then((result) => {
                // This gives you a Google Access Token. You can use it to access the Google API.
                const credential = GoogleAuthProvider.credentialFromResult(result);
                const token = credential?.accessToken;
                // The signed-in user info.
                const user = result.user;
                console.log({ credential, token, user });
                return user;
            })
            .catch((error) => {
                // Handle Errors here.
                const errorCode = error.code;
                const errorMessage = error.message;
                // The email of the user's account used.
                const email = error.email;
                // The AuthCredential type that was used.
                const credential = GoogleAuthProvider.credentialFromError(error);
                console.log({ errorCode, errorMessage, email, credential });
                return undefined;
            });
    }

    export function logOutUser(): boolean {
        try {
            auth.signOut();
            console.log("logout");
            return true;
        } catch (e) {
            return false
        }
    }
}
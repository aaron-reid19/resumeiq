import { 
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut as firebaseSignOut,
    GoogleAuthProvider,
    signInWithPopup,
    GithubAuthProvider,
} from "firebase/auth"
import { auth } from "./config";

function getAuthErrorMessage(error) {
    switch (error.code) {
        case "auth/email-already-in-use":
            return "An account with this email already exists.";
        case "auth/invalid-email":
            return "Enter a valid email address.";
        case "auth/missing-password":
            return "Enter your password.";
        case "auth/weak-password":
            return "Password should be at least 6 characters.";
        case "auth/invalid-credential":
            return "Incorrect email or password.";
        case "auth/popup-closed-by-user":
            return "The sign-in popup was closed before completing authentication.";
        case "auth/cancelled-popup-request":
            return "Another sign-in popup is already open.";
        case "auth/account-exists-with-different-credential":
            return "An account already exists with a different sign-in method.";
        default:
            return error.message || "Authentication failed.";
    }
}

// signup with email and passwword

export async function signup(email, password) {
    try {
        const userCredential = await createUserWithEmailAndPassword(
            auth,
            email,
            password,
        );
        return { user: userCredential.user, error: null}
    }
    catch(error){
        return { user: null, error: getAuthErrorMessage(error)}
    }
}
// login with email and password
export async function login(email, password) {
    try {
        const userCredential = await signInWithEmailAndPassword(
            auth,
            email,
            password,
        )

        return { user: userCredential.user, error: null}
    }
    catch (error){
        return { user: null, error: getAuthErrorMessage(error)}
    }
}
// login with google
export async function loginWithGoogle(){
    try{
        const provider = new GoogleAuthProvider();
        const userCredential = await signInWithPopup(auth, provider)

        return { user: userCredential.user, error: null}
    }
    catch (error){
        return { user: null, error: getAuthErrorMessage(error)}
    }
}

//login with github
export async function loginWithGithub(){
    try {
        const provider = new GithubAuthProvider();
        const userCredential = await signInWithPopup(auth, provider)

        return { user: userCredential.user, error: null}
    }
    catch (error){
        return { user: null, error: getAuthErrorMessage(error)}
    }
}
//logout

export async function logout(){
    try {
        await firebaseSignOut(auth);
        return { error: null}
    }
    catch (error){
        return {error: getAuthErrorMessage(error)}
    }
}

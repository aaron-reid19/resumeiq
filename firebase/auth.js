import { 
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut as firebaseSignOut,
    GoogleAuthProvider,
    signInWithPopup,
    GithubAuthProvider,
} from "firebase/auth"
import { auth } from "./config";

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
        return { user: null, error: error.message}
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
        return { user: null, error: error.message}
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
        return { user: null, error: error.message}
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
        return { user: null, error: error.message}
    }
}
//logout

export async function logout(){
    try {
        await firebaseSignOut(auth);
        return { error: null}
    }
    catch (error){
        return {error: error.message}
    }
}

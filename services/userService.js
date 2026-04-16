import { doc, setDoc, getDoc, serverTimeStamp} from "firebase/firestore"
import { db } from "@/firebase/config";

export async function createUserDocument(user) {
    if (!user){
        return;
    }
    const useRef = doc(db, "users", user.uid);

    const userSnapshot = await getDoc(useRef);

    if (!userSnapshot.exists()){
        await setDoc(useRef, {
            uid: user.uid,
            displayName: user.displayName || "",
            email: user.email || "",
            provider: user.provider?.[0]?.providerId || "email",
            createdAt: serverTimeStamp(),
        })
    }
}

export async function getUserDocument(uid){
    if (!uid){
        return null;
    }

    const useRef = doc(db, "users", uid);
    const userSnapshot = await getDoc(useRef);

    if (!userSnapshot.exists()){
        return null;
    }
    return {
        id: userSnapshot.uid,
        ...userSnapshot.data(),
    }
}

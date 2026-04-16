import {
    collection,
    addDoc,
    getDocs,
    getDoc,
    doc,
    query,
    orderBy,
    serverTimestamp
  } from "firebase/firestore";
import { db } from "@/firebase/config";

export async function saveEvaluation(uid, evaluationData){
    if (!uid){
        throw new Error("User ID is required");
    }

    const evaluationRef = collection(db, "users", uid, "evaluations");
    const docRef = await addDoc(evaluationRef, {
        ...evaluationData,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
    });
    return docRef.id;
}

export async function getUserEvaluations(uid){
    if (!uid) {
        throw new Error("User ID is required")
    }

    const evaluationRef = collection(db, "users", uid, "evaluations");
    const q = query(evaluationRef, orderBy("createdAt", "desc"));
    const snapshot = await getDocs(q);

    return snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
    }));
}

export async function getUserEvaluationById(uid, evaluationId){
    if (!uid || !evaluationId) throw new Error("Missing required values");

    const evaluationRef = doc(db, "users", uid, "evaluations", evaluationId);
  const snapshot = await getDoc(evaluationRef);

  if (!snapshot.exists()) {
        return null;
  }

  return {
    id: snapshot.id,
    ...snapshot.data(),
  };
}

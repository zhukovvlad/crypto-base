import { initializeApp } from "firebase/app";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";

import { doc, getDoc, setDoc } from "firebase/firestore";
import { getFirestore } from "firebase/firestore";
import { config } from "./firebase.config";

const app = initializeApp(config);

export const auth = getAuth(app);

const db = getFirestore(app);

export const createUserProfileDocument = async (userAuth, additionalData) => {
    if (!userAuth) return;

    const userRef = doc(db, 'users', `${userAuth.uid}`);

    const snapShot = await getDoc(userRef);

    if (!snapShot.exists()) {
        const { displayName, email } = userAuth;
        const createdAt = new Date();

        try {
            await setDoc(userRef, {
                displayName,
                email,
                createdAt,
                ...additionalData
            })
        } catch (error) {
            console.log('error creating user', error.message);
        }
    }

    return userRef;
};

const provider = new GoogleAuthProvider();

provider.setCustomParameters({ promt: 'select_account' });

export const signInWithGoogle = () => signInWithPopup(auth, provider);

// import firebase from "firebase/app";
// 
// // Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
// // TODO: Add SDKs for Firebase products that you want to use
// // https://firebase.google.com/docs/web/setup#available-libraries
// 
// // Your web app's Firebase configuration
// const firebaseConfig = {
//   apiKey: "AIzaSyCdWkx8z5twuAQslcJ8dtIDQiBxMDNXkfI",
//   authDomain: "crypto-base-db-7e255.firebaseapp.com",
//   projectId: "crypto-base-db-7e255",
//   storageBucket: "crypto-base-db-7e255.appspot.com",
//   messagingSenderId: "848261410541",
//   appId: "1:848261410541:web:2c8ba2ef9230dd795026e4"
// };
// 
// // Initialize Firebase
// const app = initializeApp(firebaseConfig);

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
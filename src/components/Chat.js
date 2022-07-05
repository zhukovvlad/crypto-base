import React from "react";
import { auth } from "../firebase/firebase.utils";
import { useAuthState } from 'react-firebase-hooks/auth';

const Chat = () => {
    const [user] = useAuthState(auth);
  return <div>Hello, {user.displayName}</div>;
};

export default Chat;

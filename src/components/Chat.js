import React from "react";
import { auth } from "../firebase/firebase.utils";
import { useAuthState } from "react-firebase-hooks/auth";
import Container from "@mui/material/Container";

const Chat = () => {
  const [user] = useAuthState(auth);
  return (
    <Container
      sx={{
        marginY: 2,
      }}
    >
      Hello, {user.displayName}
    </Container>
  );
};

export default Chat;

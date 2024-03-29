import React from "react";
import { auth } from "../firebase/firebase.utils";
import { useAuthState } from "react-firebase-hooks/auth";
import Container from "@mui/material/Container";
import { Grid } from "@mui/material";
import AddCoin from "./AddCoin";
import Divider from "@mui/material/Divider";

const DashBoard = () => {
  const [user] = useAuthState(auth);

  return (
    <Container
      sx={{
        marginY: 2,
      }}
    >
      Hello, {user.displayName}
      <Divider sx={{ marginY: 1 }} />
      <Grid container>
        <AddCoin />
      </Grid>
    </Container>
  );
};

export default DashBoard;

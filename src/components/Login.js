import { Container, Grid, Box, Button } from "@mui/material";
import React from "react";
import { signInWithGoogle } from "../firebase/firebase.utils";

const Login = () => {
  return (
    <Container>
      <Grid
        container
        sx={{
          height: window.innerHeight - 50,
        }}
        alignItems={"center"}
        justifyContent={"center"}
      >
        <Grid
          sx={{
            width: 400,
          }}
          container
          alignItems={"center"}
          direction={"column"}
        >
          <Box p={5}>
            <Button onClick={signInWithGoogle} variant={"outlined"}>
              Login with Google
            </Button>
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Login;

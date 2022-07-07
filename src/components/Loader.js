import React from "react";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import CircularProgress from "@mui/material/CircularProgress";

const Loader = () => {
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
            <CircularProgress />
        </Grid>
      </Grid>
    </Container>
  );
};

export default Loader;

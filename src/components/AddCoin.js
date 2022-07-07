import React, { useState } from "react";
import { TextField, Button, Grid } from "@mui/material";

const AddCoin = () => {
  const [coin, setCoin] = useState("");
  return (
    <Grid container spacing={1}>
      <Grid item xs={4}>
        <TextField value={coin} onChange={(e) => setCoin(e.target.value)} />
      </Grid>
      <Grid item xs={1}>
        <Button onClick={() => console.log(coin)}>Add</Button>
      </Grid>
    </Grid>
  );
};

export default AddCoin;

import React, { useState } from "react";
import { TextField, Button, Grid } from "@mui/material";
import axios from "axios";
import { HistoricalChart } from "../config/api";

const AddCoin = () => {
  const [coin, setCoin] = useState("");
  const [coinData, setCoinData] = useState([]);

  const fetchHistoricalData = async (coinId) => {
    const { data } = await axios
      .get(HistoricalChart(coinId))
      .catch(error => {
        // handle error
        return { data: error };
      });

    console.log(data.prices ? data.prices: data.response.data);

    setCoinData(data.prices ? data.prices: data.response.data);
  };

  return (
    <Grid container spacing={1}>
      <Grid item xs={4}>
        <TextField value={coin} onChange={(e) => setCoin(e.target.value)} />
      </Grid>
      <Grid item xs={1}>
        <Button onClick={() => fetchHistoricalData(coin)}>Add</Button>
      </Grid>
    </Grid>
  );
};

export default AddCoin;

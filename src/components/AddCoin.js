import React, { useState } from "react";
import { TextField, Button, Grid } from "@mui/material";
import axios from "axios";
import { HistoricalChart, CoinData } from "../config/api";
import findMaxInArray from "../utils/findMax";

const AddCoin = () => {
  const [coin, setCoin] = useState("");
  const [coinData, setCoinData] = useState([]);

  const fetchHistoricalData = async (coinId) => {
    const { data } = await axios
      .get(CoinData(coinId))
      .catch(error => {
        // handle error
        return { data: error };
      });

    // console.log(data.prices ? data.prices: data.response.data);

    setCoinData(data);

    //setCoinData(data.prices ? findMaxInArray(data.prices): data.response.data);
  };

  return (
    <Grid container spacing={1}>
      <Grid item xs={4}>
        <TextField value={coin} onChange={(e) => setCoin(e.target.value)} />
      </Grid>
      <Grid item xs={1}>
        <Button onClick={() => fetchHistoricalData(coin)}>Add</Button>
      </Grid>
      <Grid item xs={7}></Grid>

    </Grid>
  );
};

export default AddCoin;

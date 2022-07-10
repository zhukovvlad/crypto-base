import React, { useEffect, useState, useRef } from "react";
import { TextField, Button, Grid } from "@mui/material";
import axios from "axios";
import { CoinData } from "../config/api";
import findMaxInArray from "../utils/findMax";
import { db, auth } from "../firebase/firebase.utils";
import { addDoc, collection } from "firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth";
import { COIN_DATABASE } from "../utils/consts";

const AddCoin = () => {
  const [user] = useAuthState(auth);
  const [coin, setCoin] = useState("");
  const [coinData, setCoinData] = useState([]);

  // const checkIsCoinInDatabase = async ()

  //const postCoin = async (entity) => {
  //  try {
  //    const docRef = await addDoc(collection(db, COIN_DATABASE), {
  //      user: user.uid,
  //      coin: entity,
  //      athChange: coinData.data.market_data.ath_change_percentage.usd,
  //    }, {merge: true});
  //  } catch (error) {
  //    console.log("Error adding document: ", error);
  //  }
  //};

  const isFirstRender = useRef(true);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }

    const postCoin = async (entity) => {
      try {
        const docRef = await addDoc(
          collection(db, COIN_DATABASE),
          {
            user: user.uid,
            coin: entity,
            athChange: coinData.data.market_data.ath_change_percentage.usd,
          },
          { merge: true }
        );
      } catch (error) {
        console.log("Error adding document: ", error);
      }
    };

    postCoin(coinData.data.id);
  }, [coinData, user.uid]);

  const fetchHistoricalData = async (coinId) => {
    const data = await axios.get(CoinData(coinId)).catch((error) => {
      // handle error
      //return { data: error };
      return error;
    });

    console.log(data);

    setCoinData(data);
    //if (data) {
    //  postCoin(coinId);
    //}

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

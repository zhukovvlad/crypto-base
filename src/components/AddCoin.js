import React, { useEffect, useState, useRef } from "react";
import { TextField, Button, Grid } from "@mui/material";
import axios from "axios";
import { CoinData } from "../config/api";
import { db, auth } from "../firebase/firebase.utils";
import { addDoc, collection, getDoc, getDocs } from "firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth";
import { COIN_DATABASE } from "../utils/consts";
import { query, where } from "firebase/firestore";

const AddCoin = () => {
  const [user] = useAuthState(auth);
  const [coin, setCoin] = useState("");
  const [coinData, setCoinData] = useState([]);

  const isFirstRender = useRef(true);

  const coinsRef = collection(db, "coins");

  const getCoinFromDatabase = async (coinId) => {
    const q = query(coinsRef, where("coin", "==", coinId), where("user", "==", user.uid));

    const querySnapshot = await getDocs(q);

    querySnapshot.forEach((doc) => {
        console.log(doc.id, ' => ', doc.data());
    });
  };

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }

    /**
     * POST coin info into FireBase
     * @param {string} entity Coin Id that we want to add to Database
     */
    const postCoin = async (entity) => {
      try {
        const docRef = await addDoc(collection(db, COIN_DATABASE), {
          user: user.uid,
          coin: entity,
          athChange: coinData.data.market_data.ath_change_percentage.usd,
        });
      } catch (error) {
        console.log("Error adding document: ", error);
      }
    };

    if (!coinData?.data?.id) {
      return;
    }

    postCoin(coinData.data.id);
  }, [coinData, user.uid]);

  /**
   * Receiving data from CoinGecko API.
   * @param {string} coinId coinId for receiving data from CoinGecko API
   */
  const fetchHistoricalData = async (coinId) => {
    const data = await axios.get(CoinData(coinId)).catch((error) => {
      return error;
    });

    console.log(data);

    setCoinData(data);

    getCoinFromDatabase(coinId);
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

import React, { useEffect, useState, useRef } from "react";
import { TextField, Button, Grid } from "@mui/material";
import axios from "axios";
import { CoinData } from "../config/api";
import { db, auth } from "../firebase/firebase.utils";
import { addDoc, collection, getDocs, getDoc, orderBy } from "firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth";
import { COIN_DATABASE } from "../utils/consts";
import { query, where } from "firebase/firestore";
import CoinsTable from "./CoinsTable";

const AddCoin = () => {
  const [user] = useAuthState(auth);
  const [coin, setCoin] = useState("");
  const [coinData, setCoinData] = useState([]);
  const [coinList, setCoinList] = useState([]);

  //const isFirstRender = useRef(true);

  const coinsRef = collection(db, "coins");

  /**
   * useEffect for initial render
   */
  useEffect(() => {
    const getCoinFromDatabase = async () => {
      const coinsArray = [];
      const q = query(coinsRef, where("user", "==", user.uid));

      const querySnapshot = await getDocs(q);

      console.log("Our coins: ", querySnapshot);

      querySnapshot.forEach((doc) => {
        //console.log(doc.id, ' => ', doc.data());
        coinsArray.push(doc.data());
      });
      setCoinList(coinsArray);
    };

    getCoinFromDatabase();
  }, []);

  useEffect(() => {
    //if (isFirstRender.current) {
    //  isFirstRender.current = false;
    //  return;
    //}

    /**
     * POST coin info into FireBase
     * @param {string} entity Coin Id that we want to add to Database
     */
    //getCoinFromDatabase();

    const postCoin = async (entity) => {
      try {
        const docRef = await addDoc(collection(db, COIN_DATABASE), {
          user: user.uid,
          coin: entity,
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
    const coincide = coinList.filter(
      (obj) => Object.values(obj).indexOf(coinId) > -1
    );
    console.log("Coincides: ", coincide);
    if (coincide.length > 0) {
      console.log(`Coin ${coinId} is already exists in database`);
      return;
    }
    const data = await axios.get(CoinData(coinId)).catch((error) => {
      return error;
    });

    console.log(data);

    setCoinData(data);

    setCoinList((coinList) => [...coinList, coinId]);
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
      <CoinsTable coinList={coinList} />
    </Grid>
  );
};

export default AddCoin;

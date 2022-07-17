import React, { useState, useEffect } from "react";
import { TextField, Button, Grid } from "@mui/material";
import { db, auth } from "../firebase/firebase.utils";
import { useAuthState } from "react-firebase-hooks/auth";
import {
  addDoc,
  collection,
  getDocs,
  getDoc,
  orderBy,
} from "firebase/firestore";
import CoinsTable from "./CoinsTable";

import { query, where } from "firebase/firestore";
import { CoinsData } from "../config/api";
import axios from "axios";


const AddCoin = () => {
  const [user] = useAuthState(auth);
  const [coin, setCoin] = useState('');
  const [coinList, setCoinList] = useState([]);

  const coinsRef = collection(db, "coins");
  const q = query(coinsRef, where("user", "==", user.uid));

  useEffect(() => {
    const getCoinFromDatabase = async () => {
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        setCoinList((coinList) => [...coinList, doc.data()]);
      });
    };

    const getDataFromCoinGecko = async (coinsArray) => {
        coinsArray = coinsArray.map(coin => {return coin.coin});
        const queryString = coinsArray.join();
        console.log("QueryString: ", queryString);
        const l = await axios.get(CoinsData(queryString)).catch((error) => {
            return error;
          });

          console.log(l);
    };

    getCoinFromDatabase();
    getDataFromCoinGecko(coinList);
  }, []);

  return (
    <Grid container spacing={1}>
      <Grid item xs={4}>
        <TextField value={coin} onChange={(e) => setCoin(e.target.value)} />
      </Grid>
      <Grid item xs={1}>
        <Button>Add</Button>
      </Grid>
      <Grid item xs={7}></Grid>
      <CoinsTable coinList={coinList} />
    </Grid>
  );
};

export default AddCoin;

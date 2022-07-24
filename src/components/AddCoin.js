import React, { useState, useEffect, Fragment, useContext } from "react";
import { TextField, Button, Grid } from "@mui/material";
import { db, auth } from "../firebase/firebase.utils";
import { useAuthState } from "react-firebase-hooks/auth";
import { addDoc, collection, getDocs } from "firebase/firestore";
import CoinsTable from "./CoinsTable";

import { query, where } from "firebase/firestore";
import { CoinsData, CoinData } from "../config/api";
import axios from "axios";
import { COIN_DATABASE } from "../utils/consts";
import { Context } from "../App";

const AddCoin = () => {
  const [user] = useAuthState(auth);
  const [coin, setCoin] = useState("");
  // const [coinList, setCoinList] = useState([]);
  const [coinList, setCoinList] = useContext(Context);
  const [coinGeckoList, setCoinGeckoList] = useState([]);

  const coinsRef = collection(db, "coins");
  const q = query(coinsRef, where("user", "==", user.uid));

  useEffect(() => {
    const getCoinFromDatabase = async () => {
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        setCoinList((coinList) => [...coinList, doc.data()]);
      });
      console.log("querySnapshot, ", querySnapshot);
    };

    getCoinFromDatabase();
  }, []);

  useEffect(() => {
    const getDataFromCoinGecko = async (coinsArray) => {
      coinsArray = coinsArray.map((coin) => {
        return coin.coin;
      });
      const queryString = coinsArray.join();
      console.log("Our coinList ", coinList);
      console.log("QueryString: ", queryString);
      const l = await axios.get(CoinsData(queryString)).catch((error) => {
        return error;
      });

      setCoinGeckoList(l.data);
    };

    if (coinList.length > 0) {
      getDataFromCoinGecko(coinList);
    }
  }, [coinList]);

  const postCoin = async (coinId) => {
    if (coinList.length > 0) {
      for (let index = 0; index < coinList.length; index++) {
        if (coinId === coinList[index].coin) {
          console.log(`We already have ${coinId} in databse`);
          setCoin("");
          return;
        }
      }
    }

    const { data } = await axios.get(CoinData(coinId)).catch((error) => {
      setCoin("");
      return error;
    });

    if (data) {
      console.log("data = ", data);
      try {
        await addDoc(collection(db, COIN_DATABASE), {
          user: user.uid,
          coin: coinId,
        });
      } catch (error) {
        console.log("Error adding document: ", error);
      }
      setCoinList((coinList) => [
        ...coinList,
        { coin: coinId, user: user.uid },
      ]);
    }
    setCoin("");
  };

  return (
    <Fragment>
      <Grid container spacing={1}>
        <Grid item xs={4}>
          <TextField value={coin} onChange={(e) => setCoin(e.target.value)} />
        </Grid>
        <Grid item xs={1}>
          <Button onClick={() => postCoin(coin)}>Add</Button>
        </Grid>
        <Grid item xs={7}></Grid>
      </Grid>
      <CoinsTable coinGeckoList={coinGeckoList} />
    </Fragment>
  );
};

export default AddCoin;

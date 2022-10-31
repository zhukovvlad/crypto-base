import { Box, TextField, Button } from "@mui/material";
import React from "react";
import { useState } from "react";
import { HistoricalChart } from "../config/api";
import axios from "axios";

function CorrelationForm({ onClick }) {
  const [correlatedCoins, setCorrelatedCoins] = useState({
    firstCoin: "",
    secondCoin: "",
  });

  const [coinsResponse, setCoinsResponse] = useState({
    firstCoinResponse: [],
    secondCoinResponse: [],
  });

  const getCoinArray = async () => {
    const coinsArray = [correlatedCoins.firstCoin, correlatedCoins.secondCoin];
    const datas = await axios.all(
      coinsArray.map((coin) =>
        axios.get(HistoricalChart(coin)).catch((error) => {
          setCoinsResponse({ errorResponse: error });
          return error;
        })
      )
    );

    if (datas) {
      console.log("We have prices for firstCoin: ", datas[0].data.prices);
      console.log("We have prices for secondCoin: ", datas[1].data.prices);
      setCoinsResponse({
        firstCoinResponse: datas[0].data.prices,
        secondCoinResponse: datas[1].data.prices,
      });
    }

    console.log("We have response: ", coinsResponse);
  };

  const handleChange = () => {
    getCoinArray().then(onClick(coinsResponse));
  };

  return (
    <Box
      component="form"
      sx={{
        "& .MuiTextField-root": { m: 1, width: "40ch" },
      }}
    >
      <div>
        <TextField
          variant="outlined"
          id="first-coin-field"
          placeholder="First Coin"
          label="First coin"
          value={correlatedCoins.firstCoin}
          onChange={(e) =>
            setCorrelatedCoins({
              ...correlatedCoins,
              firstCoin: e.target.value,
            })
          }
        />
      </div>
      <div>
        <TextField
          variant="outlined"
          id="second-coin-field"
          placeholder="Second Coin"
          label="Second coin"
          value={correlatedCoins.secondCoin}
          onChange={(e) =>
            setCorrelatedCoins({
              ...correlatedCoins,
              secondCoin: e.target.value,
            })
          }
        />
      </div>
      <Button sx={{ m: 1 }} variant="contained" onClick={handleChange}>
        Submit
      </Button>
    </Box>
  );
}

export default CorrelationForm;

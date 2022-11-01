import { Container, Divider } from "@mui/material";
import axios from "axios";
import React from "react";
import { useState } from "react";
import CorrelationForm from "../components/CorrelationForm";
import CorrelationTable from "../components/CorrelationTable";
import { CoinData, HistoricalChart } from "../config/api";

function Correlation() {
  const [coinsArray, setCoinsArray] = useState();
  const [coins, setCoins] = useState();

  const handleFetchToDo = async (coins) => {
    try {
      const response = await axios.all(
        coins.map((coin) => axios.get(HistoricalChart(coin)))
      );
      console.log(response[0].data.prices);
      const pricesArray = [response[0].data.prices, response[1].data.prices]
      setCoinsArray(pricesArray);
      const anotherResponse = await axios.all(
        coins.map((coin) => axios.get(CoinData(coin)))
      );
      const coinsArray = [anotherResponse[0].data, anotherResponse[1].data]
      setCoins(coinsArray);
      console.log("Our response ", anotherResponse);
      return response;
    } catch (e) {
      console.log(e.message);
    }
    return null;
  };

  return (
    <Container
      sx={{
        marginY: 2,
      }}
    >
      <CorrelationForm onFetchToDo={handleFetchToDo} />
      <Divider sx={{marginY: 3}} />
      {coinsArray && coins ? (
        <CorrelationTable coinsArray={coinsArray} coins={coins} />
      ) : (
        <div>Empty</div>
      )}
    </Container>
  );
}

export default Correlation;

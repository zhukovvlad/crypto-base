import { Box, TextField, Button } from "@mui/material";
import React from "react";
import { useState } from "react";

function CorrelationForm({ onFetchToDo }) {
  const [correlatedCoins, setCorrelatedCoins] = useState({
    firstCoin: "",
    secondCoin: "",
  });

  const handleFetchToDo = async () => {
    const coinsArray = [correlatedCoins.firstCoin, correlatedCoins.secondCoin];
    try {
      const datas = await onFetchToDo(coinsArray);
      return datas;
    } catch (e) {
      return e;
    }
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
      <Button sx={{ m: 1 }} variant="contained" onClick={handleFetchToDo}>
        Submit
      </Button>
    </Box>
  );
}

export default CorrelationForm;

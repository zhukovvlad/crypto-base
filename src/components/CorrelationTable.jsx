import {
  Card,
  CardContent,
  Typography,
  Box,
  Divider,
  Stack,
} from "@mui/material";
import React from "react";
import findCorrelation from "../utils/findCorrelation";

function CorrelationTable({ coinsArray, coins }) {
  const allDatas = findCorrelation(coinsArray);

  console.log(allDatas.arrayWithStamps.slice(-1)[0][0])

  return (
    <Box display="flex" justifyContent="center" alignItems="center">
      <Card>
        <CardContent>
          <Typography variant="h5">
            {coins[0].symbol.toUpperCase()} - {coins[1].symbol.toUpperCase()}{" "}
            Correlation
          </Typography>
          <Divider sx={{marginY: 2}} />
          <Stack
            direction="row"
            spacing={3}
            divider={<Divider orientation="vertical" flexItem />}
            justifyContent="center"
          >
            <Typography>Correlation</Typography>
            <Typography>{allDatas.correlation.toFixed(4)}</Typography>
          </Stack>
          <Stack
            direction="row"
            spacing={3}
            divider={<Divider orientation="vertical" flexItem />}
            justifyContent="center"
          >
            <Typography>Total observation days</Typography>
            <Typography>{allDatas.arrayWithStamps.length}</Typography>
          </Stack>
          <Stack
            direction="row"
            spacing={3}
            divider={<Divider orientation="vertical" flexItem />}
            justifyContent="center"
          >
            <Typography>From</Typography>
            <Typography>{new Date(allDatas.arrayWithStamps[0][0]).toDateString()}</Typography>
          </Stack>
          <Stack
            direction="row"
            spacing={3}
            divider={<Divider orientation="vertical" flexItem />}
            justifyContent="center"
          >
            <Typography>To</Typography>
            <Typography>{new Date(allDatas.arrayWithStamps.slice(-1)[0][0]).toDateString()}</Typography>
          </Stack>
        </CardContent>
      </Card>
    </Box>
  );
}

export default CorrelationTable;

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Button,
  TableSortLabel,
} from "@mui/material";
import React, { useEffect, useState } from "react";

import { numberWithCommas } from "../utils/usefulFunc";

const CoinsTable = ({ coinGeckoList }) => {
  const [rowData, setRowData] = useState([]);
  const [orderDirection, setOrderDirection] = useState("asc");

  useEffect(() => {
    setRowData(sortArray(coinGeckoList, "desc"));
  }, [coinGeckoList]);

  const sortArray = (arr, orderBy) => {
    switch (orderBy) {
      case "asc":
      default:
        return arr.sort((a, b) =>
          a.ath_change_percentage > b.ath_change_percentage
            ? 1
            : b.ath_change_percentage > a.ath_change_percentage
            ? -1
            : 0
        );
      case "desc":
        return arr.sort((a, b) =>
          a.ath_change_percentage < b.ath_change_percentage
            ? 1
            : b.ath_change_percentage < a.ath_change_percentage
            ? -1
            : 0
        );
    }
  };

  const handleSortRequest = () => {
    setRowData(sortArray(rowData, orderDirection));
    setOrderDirection(orderDirection === "asc" ? "desc" : "asc");
  };

  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableCell align="center">Coin</TableCell>
          <TableCell align="center">Symbol</TableCell>
          <TableCell align="center">Price</TableCell>
          <TableCell align="center">ATH</TableCell>
          <TableCell align="center" onClick={handleSortRequest}>
            <TableSortLabel active={true} direction={orderDirection}>
              ATH_Change
            </TableSortLabel>
          </TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {rowData.map((data) => (
          <TableRow key={data.symbol}>
            <TableCell>{data.name}</TableCell>
            <TableCell>{data.symbol.toUpperCase()}</TableCell>
            <TableCell>
              {"$ "}
              {numberWithCommas(data.current_price.toFixed(2))}
            </TableCell>
            <TableCell>
              {"$ "}
              {numberWithCommas(data.ath.toFixed(2))}
            </TableCell>
            <TableCell>
              {data.ath_change_percentage.toFixed(2)}
              {"%"}
            </TableCell>
            <TableCell>
              <Button variant="contained" color="secondary">
                Delete Coin
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default CoinsTable;

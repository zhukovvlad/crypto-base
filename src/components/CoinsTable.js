import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TableSortLabel,
} from "@mui/material";
import React, { useEffect, useState } from "react";

import { numberWithCommas } from "../utils/usefulFunc";
import DeleteCoin from "./DeleteCoin";

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
            <TableCell align="center">{data.name}</TableCell>
            <TableCell align="center">{data.symbol.toUpperCase()}</TableCell>
            <TableCell align="center">
              {"$ "}
              {numberWithCommas(data.current_price.toFixed(2))}
            </TableCell>
            <TableCell align="center">
              {"$ "}
              {numberWithCommas(data.ath.toFixed(2))}
            </TableCell>
            <TableCell align="center">
              {data.ath_change_percentage.toFixed(2)}
              {"%"}
            </TableCell>
            <TableCell align="center">
              <DeleteCoin coin={data} setRowData={setRowData} rowData={rowData} />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default CoinsTable;

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";
import React from "react";

import { numberWithCommas } from "../utils/usefulFunc";

const CoinsTable = ({ coinGeckoList }) => {
  return (
    <Table>
      <TableHead>
        <TableRow>
          {["Coin", "Price", "ATH", "ATH_Change"].map((head) => (
            <TableCell>{head}</TableCell>
          ))}
        </TableRow>
      </TableHead>
      <TableBody>
        {coinGeckoList.map((data) => (
          <TableRow>
            <TableCell>{data.symbol.toUpperCase()}</TableCell>
            <TableCell>{data.symbol.toUpperCase()}</TableCell>
            <TableCell>{"$ "}{numberWithCommas(data.current_price.toFixed(2))}</TableCell>
            <TableCell>{"$ "}{numberWithCommas(data.ath.toFixed(2))}</TableCell>
            <TableCell>{data.ath_change_percentage.toFixed(2)}{"%"}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default CoinsTable;

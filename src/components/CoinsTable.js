import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";
import React from "react";

const CoinsTable = ({ coinGeckoList }) => {
  return (
    <Table>
      <TableHead>
        <TableRow>
          {["Coin", "Price", "ATH_Change"].map((head) => (
            <TableCell>{head}</TableCell>
          ))}
        </TableRow>
      </TableHead>
      <TableBody>
        {coinGeckoList.map((data) => (
          <TableRow>
            <TableCell>{data.symbol}</TableCell>
            <TableCell>{data.current_price}</TableCell>
            <TableCell>{data.ath_change_percentage}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default CoinsTable;

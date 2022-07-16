import React from "react";

const CoinsTable = ({ coinList }) => {
  return (
    <div>
      {coinList.map((data) => (
        <div>{data.coin}</div>
      ))}
    </div>
  );
};

export default CoinsTable;

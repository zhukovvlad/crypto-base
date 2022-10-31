import { Container } from "@mui/material";
import React from "react";
import { useState } from "react";
import CorrelationForm from "../components/CorrelationForm";

function Correlation() {
  const [name, setName] = useState([]);

  const handleChange = (name) => {
    setName(name);
    console.log("Our parent state ", name.firstCoinResponse);
  };

  return (
    <Container
      sx={{
        marginY: 2,
      }}
    >
      <CorrelationForm onClick={handleChange} />
      {name?.firstCoinResponse?.length > 0 ? (
        name.firstCoinResponse.map((item) => (<div>{item[0]}</div>))
      ) : (
        <div>Empty</div>
      )}
    </Container>
  );
}

export default Correlation;

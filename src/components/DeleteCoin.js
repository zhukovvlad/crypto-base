import React from "react";
import { Button } from "@mui/material";

import { collection, getDocs, deleteDoc, doc } from "firebase/firestore";
import { db, auth } from "../firebase/firebase.utils";
import { useAuthState } from "react-firebase-hooks/auth";
import { query, where } from "firebase/firestore";

const DeleteCoin = ({ coin, setRowData, rowData }) => {
  const [user] = useAuthState(auth);
  const coinsRef = collection(db, "coins");
  const q = query(
    coinsRef,
    where("user", "==", user.uid),
    where("coin", "==", coin.id)
  );

  const handleDelete = async () => {
    const formDoc = await getDocs(q);
    console.log(formDoc.docs[0].id);
    await deleteDoc(doc(db, "coins", formDoc.docs[0].id));
    const changedRowData = rowData.filter(
      (coinData) => coinData.id !== coin.id
    );
    console.log("Changed rowData ", changedRowData);
    setRowData(changedRowData);
  };

  return (
    <Button
      variant="contained"
      color="secondary"
      onClick={() => handleDelete()}
    >
      Delete Coin
    </Button>
  );
};

export default DeleteCoin;

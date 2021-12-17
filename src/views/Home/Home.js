import axios from "axios";
import MemoCard from "./MemoCard.js";
import { Navbar } from "../../components";
import { Container } from "react-bootstrap";
import { API_URL } from "../../utils/constants";
import SpinnerLoading from "./SpinnerLoading.js";
import React, { Fragment, useState, useEffect } from "react";

export default function Home() {
  const [memos, setMemos] = useState([]);

  // Cargar todos los memos filtrados.
  useEffect(() => {
    axios
      .get(`${API_URL}/allMemosFiltered`)
      .then((res) => setMemos(res.data.message))
      .catch((e) => console.log(e));
  }, []);

  return (
    <Fragment>
      <Navbar />

      <Container>{memos.length !== 0 ? <MemoCard memos={memos} /> : <SpinnerLoading />}</Container>
    </Fragment>
  );
}

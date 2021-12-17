import React, { Fragment, useState, useEffect } from "react";
import axios from "axios";
import { API_URL } from "../../utils/constants";
import { Navbar } from "../../components";
import { Container } from "react-bootstrap";
import Card from "./Card.js";

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

      <Container>
        <Card memos={memos} />
      </Container>
    </Fragment>
  );
}

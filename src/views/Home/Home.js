import axios from "axios";
import MemoCard from "./MemoCard.js";
import { Navbar } from "../../components";
import { Container } from "react-bootstrap";
import { API_URL } from "../../utils/constants";
import SpinnerLoading from "./SpinnerLoading.js";
import React, { Fragment, useState, useEffect } from "react";
import { useLocation, useSearchParams } from "react-router-dom";

export default function Home() {
  let [searchParams, setSearchParams] = useSearchParams();
  const propPage = searchParams.get("page");
  const propSize = searchParams.get("size") || 15;

  const [memos, setMemos] = useState([]);
  const [hasNext, setHasNext] = useState(false);
  const [page, setPage] = useState(undefined);
  const [size, setSize] = useState(propSize);

  // Get the lastPosiblePage and set the query param page accordingly.
  useEffect(() => {
    axios
      .get(`${API_URL}/lastPosiblePage?size=${size}`)
      .then(({ data }) => {
        const { lastPosiblePage } = data.message;
        !isNaN(+propPage) && (+propPage > lastPosiblePage || +propPage <= 0)
          ? setPage(lastPosiblePage)
          : setPage(propPage);
      })
      .catch((e) => console.log(e));
  }, []);

  // Update the query params every time page or size updates.
  useEffect(() => page !== undefined && setSearchParams({ size, page }), [page, size]);

  // Load the corresponding memos.
  useEffect(() => {
    if (page !== undefined)
      axios
        .get(`${API_URL}/memos?page=${page}&size=${size}`)
        .then((res) => {
          setMemos(res.data.message.results);
          setHasNext(res.data.message.hasNext);
        })
        .catch((e) => console.log(e));
  }, [page, size]);

  return (
    <Fragment>
      <Navbar />

      {memos.length !== 0 ? (
        <Container>
          <MemoCard memos={memos} />
        </Container>
      ) : (
        <SpinnerLoading />
      )}
    </Fragment>
  );
}

import axios from "axios";
import MemoCard from "./MemoCard.js";
import { Navbar } from "../../components";
import { Container } from "react-bootstrap";
import SpinnerLoading from "./SpinnerLoading.js";
import { API_URL, maxSize } from "../../utils/constants";
import React, { Fragment, useState, useEffect } from "react";
import { useLocation, useSearchParams } from "react-router-dom";

export default function Home() {
  let [searchParams, setSearchParams] = useSearchParams();
  const queryPage = +searchParams.get("page");
  const querySize = (() => {
    const query = +searchParams.get("size") || 15;
    if (!isNaN(query)) {
      if (query <= 0) return 15;
      if (query > maxSize) return maxSize;
    }
    return query;
  })();

  const [memos, setMemos] = useState([]);
  const [hasNext, setHasNext] = useState(false);
  const [page, setPage] = useState(undefined);
  const [size, setSize] = useState(querySize);

  // Get the lastPosiblePage and set the query param page accordingly.
  useEffect(() => {
    axios
      .get(`${API_URL}/lastPosiblePage?size=${size}`)
      .then(({ data }) => {
        const { lastPosiblePage } = data.message;
        const pageToSet = (() => {
          if (!isNaN(queryPage)) {
            if (queryPage > lastPosiblePage) return lastPosiblePage;
            if (queryPage <= 0) return 1;
            return queryPage;
          }
          return lastPosiblePage;
        })();
        setPage(pageToSet);
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

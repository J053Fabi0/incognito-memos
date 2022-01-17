import axios from "axios";
import MemosCards from "./MemosCards.js";
import { Navbar } from "../../components";
import { Container } from "react-bootstrap";
import SpinnerLoading from "./SpinnerLoading.js";
import { useSearchParams } from "react-router-dom";
import NavigationButtons from "./NavigationButtons.js";
import React, { Fragment, useState, useEffect } from "react";
import { API_URL, maxSize, defaultSize } from "../../utils/constants";

export default function Home() {
  let [searchParams, setSearchParams] = useSearchParams();
  const queryPage = searchParams.get("page") === null ? NaN : +searchParams.get("page");
  const querySize = (() => {
    const query = +searchParams.get("size") || defaultSize;
    if (!isNaN(query)) {
      if (parseInt(query) <= 0) return defaultSize;
      if (parseInt(query) > maxSize) return maxSize;
    }
    return parseInt(query);
  })();

  const [memos, setMemos] = useState([]);
  const [page, setPage] = useState(undefined);
  const [size, setSize] = useState(querySize);
  const [hasNext, setHasNext] = useState(false);
  const [lastPosiblePage, setLastPosiblePage] = useState(0);

  // Get the lastPosiblePage and set the query param page accordingly.
  useEffect(() => {
    axios
      .get(`${API_URL}/lastPosiblePage?size=${size}`)
      .then(({ data }) => {
        const { lastPosiblePage: lastPos } = data.message;
        setLastPosiblePage(lastPos);
        const pageToSet = (() => {
          if (!isNaN(queryPage)) {
            if (parseInt(queryPage) > lastPos) return lastPos;
            if (parseInt(queryPage) <= 0) return 1;
            return parseInt(queryPage);
          }
          return lastPos;
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
          <NavigationButtons actual={page} size={lastPosiblePage} setActual={setPage} />

          <MemosCards memos={memos} />

          <NavigationButtons actual={page} size={lastPosiblePage} setActual={setPage} />
        </Container>
      ) : (
        <SpinnerLoading />
      )}
    </Fragment>
  );
}

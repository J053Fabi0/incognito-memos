import React from "react";
const { Header, Body } = Card;
import styled from "@emotion/styled";
import { Card } from "react-bootstrap";

const options = { weekday: "short", year: "numeric", month: "short", day: "numeric", hour12: true };

export default function MemosCards({ memos }) {
  const CardStyled = styled(({ className, children, txID }) => (
    <Card id={txID} className={`memoCard mt-2 ${className}`}>
      {children}
    </Card>
  ))({
    ":hover": { borderColor: "#747474" },
    "& a": { textDecoration: "none", color: "var(--bs-body-color)", ":hover": { textDecoration: "underline" } },
  });

  const HeaderStyled = styled(({ className, text, txID }) => (
    <Header className={className}>
      <a href={`https://explorer.incognito.org/tx/${txID}`} target="_blank">
        {text}
      </a>
    </Header>
  ))({
    fontSize: "0.694rem",
  });

  return memos.map(({ memo, txID, date }) => (
    <CardStyled key={txID} txID={txID}>
      <HeaderStyled txID={txID} text={new Date(date).toLocaleTimeString(undefined, options)} />
      <Body>
        <p className="mb-0">{memo}</p>
      </Body>
    </CardStyled>
  ));
}

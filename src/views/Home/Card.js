import React from "react";
import styled from "@emotion/styled";
import { Card as CardBootstrap } from "react-bootstrap";
const { Header, Body } = CardBootstrap;

const options = { weekday: "short", year: "numeric", month: "short", day: "numeric", hour12: true };

export default function Card({ memos }) {
  const CardStyled = styled(({ className, children, txID }) => (
    <CardBootstrap key={txID} id={txID} className={`memo-card mt-2 ${className}`}>
      <a href={`#${txID}`}>{children}</a>
    </CardBootstrap>
  ))({
    ":hover": { borderColor: "#747474" },
    cursor: "pointer",
    "& > a": { textDecoration: "none", color: "var(--bs-body-color)" },
  });

  const HeaderStyled = styled(({ className, text }) => <Header className={className}>{text}</Header>)({
    fontSize: "0.694rem",
  });

  return memos.map(({ info, txID, date }) => (
    <CardStyled txID={txID}>
      <HeaderStyled text={new Date(date).toLocaleTimeString(undefined, options)} />
      <Body>
        <p className="mb-0">{info}</p>
      </Body>
    </CardStyled>
  ));
}

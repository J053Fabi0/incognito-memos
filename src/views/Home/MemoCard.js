import React from "react";
const { Header, Body } = Card;
import styled from "@emotion/styled";
import { Card } from "react-bootstrap";

const options = { weekday: "short", year: "numeric", month: "short", day: "numeric", hour12: true };

export default function MemoCard({ memos }) {
  const CardStyled = styled(({ className, children, txID }) => (
    <Card key={txID} id={txID} className={`memo-card mt-2 ${className}`}>
      <a href={`#${txID}`}>{children}</a>
    </Card>
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

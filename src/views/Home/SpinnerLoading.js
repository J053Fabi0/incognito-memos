import React from "react";
import styled from "@emotion/styled";
import { Spinner } from "react-bootstrap";

export default function SpinnerLoading() {
  const SpinnerStyled = styled(({ className }) => (
    <div className={`${className} d-flex align-items-center flex-column`} id="spinnerLoading">
      <Spinner animation="border" role="status">
        <span className="visually-hidden">Loading...</span>
      </Spinner>
      <p className="pt-3">Loading memos...</p>
    </div>
  ))({
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
  });

  return <SpinnerStyled />;
}

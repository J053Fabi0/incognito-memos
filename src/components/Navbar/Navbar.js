import React from "react";
import { Navbar as Navb, Container } from "react-bootstrap";

// const { Toggle, Collapse } = Navb;
const { Brand } = Navb;

export default function Navbar() {
  return (
    <Navb expand="lg" bg="dark" variant="dark">
      <Container>
        <Brand>Incognito memos</Brand>
        {/*
        <Toggle />
        <Collapse>
          <Nav className="justify-content-end w-100" style={{ color: "white" }}>
            <Nav.Item className="d-flex justify-content-end">
              <Nav.Link href="/" style={{ color: "white" }}>
                Swap
              </Nav.Link>
            </Nav.Item>
          </Nav>
        </Collapse>
        */}
      </Container>
    </Navb>
  );
}

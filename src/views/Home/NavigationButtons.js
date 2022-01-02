import React from "react";
import { ButtonGroup, Button } from "react-bootstrap";

export default function NavigationButtons() {
  return (
    <div className="w-100 my-3 d-flex justify-content-center" data-testid="navigationButtons">
      <ButtonGroup className="me-2" aria-label="First group">
        <Button>1</Button> <Button>2</Button> <Button>3</Button> <Button>4</Button>
      </ButtonGroup>
    </div>
  );
}

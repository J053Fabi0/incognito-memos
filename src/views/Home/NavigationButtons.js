import React, { useState, useEffect } from "react";
import { ButtonGroup, Button, Form } from "react-bootstrap";

export default function NavigationButtons({ actual, size, setActual }) {
  const [value, setValue] = useState(actual);

  useEffect(() => actual !== value && setValue(actual), [actual]);

  const manageChangeInValue = ({ target: { value } }) => {
    const parsed = parseInt(value);
    if (!isNaN(parsed) && parsed <= size && parsed >= 1) setValue(parsed);
  };
  const setValueAndActual = (value) => setValue(value) & setActual(value);

  return (
    <div className="w-100 my-3 d-flex justify-content-center" data-testid="navigationButtons">
      {actual === 1 ? null : (
        <ButtonGroup className="me-2">
          <Button onClick={() => setValueAndActual(1)}>1</Button>
        </ButtonGroup>
      )}

      <ButtonGroup className="me-2">
        {Array(2)
          .fill(0)
          .map((_, i) => actual - 1 - i)
          .reverse()
          .filter((p) => p >= 1)
          .map((p) => (
            <Button key={p} onClick={() => setValueAndActual(p)}>
              {p}
            </Button>
          ))}

        <Form.Control
          size="sm"
          type="text"
          value={value}
          placeholder="Go to"
          onBlur={() => setActual(value)}
          onChange={manageChangeInValue}
          onKeyUp={({ key }) => key === "Enter" && setActual(value)}
          style={{
            width: 60,
            borderRadius:
              `.${actual === 1 ? 25 : 0}rem .${actual === size ? 25 : 0}rem ` +
              `.${actual === size ? 25 : 0}rem .${actual === 1 ? 25 : 0}rem`,
          }}
        />

        {Array(2)
          .fill(0)
          .map((_, i) => actual + 1 + i)
          .filter((p) => p <= size)
          .map((p) => (
            <Button key={p} onClick={() => setValueAndActual(p)}>
              {p}
            </Button>
          ))}
      </ButtonGroup>

      {actual === size ? null : (
        <ButtonGroup className="me-2">
          <Button onClick={() => setValueAndActual(size)}>{size}</Button>
        </ButtonGroup>
      )}
    </div>
  );
}
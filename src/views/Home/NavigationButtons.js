import React, { useState, useEffect } from "react";
import { ButtonGroup, Button, Form } from "react-bootstrap";

export default function NavigationButtons({ actual, size, setActual, isLoading }) {
  const [value, setValue] = useState(actual);

  useEffect(() => actual !== value && setValue(actual), [actual]);

  const manageChangeInValue = ({ target: { value } }) => {
    if (isLoading) return;
    const parsed = parseInt(value);
    if (!isNaN(parsed) && parsed <= size && parsed >= 1) setValue(parsed);
  };
  const setValueAndActual = (value) => !isLoading && setValue(value) & setActual(value);

  return (
    <div className="w-100 my-3 d-flex justify-content-center" data-testid="navigationButtons">
      {actual >= 4 ? (
        <ButtonGroup className="me-2">
          <Button disabled={isLoading} onClick={() => setValueAndActual(1)}>
            1
          </Button>
        </ButtonGroup>
      ) : null}

      <ButtonGroup className="me-2">
        {Array(2)
          .fill(0)
          .map((_, i) => actual - 1 - i)
          .reverse()
          .filter((p) => p >= 1)
          .map((p) => (
            <Button key={p} disabled={isLoading} onClick={() => setValueAndActual(p)}>
              {p}
            </Button>
          ))}

        <Form.Control
          type="text"
          value={value}
          disabled={isLoading}
          onBlur={() => setActual(value)}
          onChange={manageChangeInValue}
          onKeyUp={({ key }) => key === "Enter" && setActual(value)}
          style={{
            width: 70,
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
            <Button key={p} disabled={isLoading} onClick={() => setValueAndActual(p)}>
              {p}
            </Button>
          ))}
      </ButtonGroup>

      {actual <= size - 3 ? (
        <ButtonGroup className="me-2">
          <Button disabled={isLoading} onClick={() => setValueAndActual(size)}>
            {size}
          </Button>
        </ButtonGroup>
      ) : null}
    </div>
  );
}

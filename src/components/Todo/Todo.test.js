import React from "react";
import Todo from "./Todo";
import { render, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";

test("Todo input field at start", () => {
  const component = render(<Todo />);
  const inputEl = component.getByTestId("inputfield");

  expect(inputEl.value).toBe("");
});

test("Changes in the input field as user types", () => {
  const component = render(<Todo />);
  const inputEl = component.getByTestId("inputfield");

  fireEvent.change(inputEl, {
    target: {
      value: "some todo",
    },
  });

  expect(inputEl.value).toBe("some todo");
});

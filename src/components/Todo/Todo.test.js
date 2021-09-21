import React from "react";
import Todo from "./Todo";
import { render } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";

test("Todo start", () => {
  const component = render(<Todo />);
  const inputEl = component.getByTestId("inputfield");

  expect(inputEl.value).toBe("");
});

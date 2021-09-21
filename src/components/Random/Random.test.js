import React from "react";
import Random from "./Random";
import { render } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";

test("random test ", () => {
  const component = render(<Random />);
  const headerEl = component.getByTestId("header");

  expect(headerEl.textContent).toBe("Random");
});

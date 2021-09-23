import React from "react";
import Todo from "./Todo";
import { render, fireEvent, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";

describe("Practice tests", () => {
  //get by
  it("Get the word Todo List", () => {
    render(<Todo />);
    const header = screen.getByText(/Todo List/);
    expect(header).toBeInTheDocument();
  });

  //find by
  it("using find by", async () => {
    render(<Todo />);
    const header = await screen.findByText(/Todo List/i);
    expect(header).toBeInTheDocument();
  });

  //query by
  it("using query by", () => {
    render(<Todo />);
    const header = screen.queryByText(/cats/i);
    expect(header).not.toBeInTheDocument();
  });

  //get by all
  it("number of buttons", () => {
    render(<Todo />);
    const buttons = screen.getAllByRole("button");
    expect(buttons.length).toBe(3);
  });
});

//main section
const addTodo = (todos) => {
  const inputEl = screen.getByTestId("inputfield");
  const addBtn = screen.getByRole("button", { name: /Add Todo/i });
  todos.forEach((todo) => {
    fireEvent.change(inputEl, {
      target: {
        value: todo,
      },
    });
    fireEvent.click(addBtn);
  });
};

describe("Add Input", () => {
  //value
  it("Todo input field at start", () => {
    render(<Todo />);
    const inputEl = screen.getByTestId("inputfield");
    expect(inputEl.value).toBe("");
  });

  //fireEvent
  it("Changes in the input field as user types", () => {
    render(<Todo />);
    const inputEl = screen.getByTestId("inputfield");
    fireEvent.change(inputEl, {
      target: {
        value: "some todo",
      },
    });
    expect(inputEl.value).toBe("some todo");
  });

  //button element
  it("Input should change to empty after add todo button is clicked", () => {
    render(<Todo />);
    const inputEl = screen.getByTestId("inputfield");
    const addBtn = screen.getByRole("button", { name: /Add Todo/i });
    fireEvent.click(addBtn);
    expect(inputEl.value).toBe("");
  });

  //using function to avoid repetition
  it("todo list should get the same value that was typed in input", () => {
    render(<Todo />);
    addTodo(["todo1", "todo2", "todo3"]);
    const todoitem = screen.getAllByTestId("single-todo");
    expect(todoitem.length).toBe(3);
  });

  //delete single todo with help of index
  it("delete btn", async () => {
    render(<Todo />);
    addTodo(["todo1", "todo2", "todo3"]);
    const todoitem = screen.getAllByTestId("single-todo");
    expect(todoitem.length).toBe(3);
    const deleteBtn = screen.getByTestId("delete-btn-0");
    fireEvent.click(deleteBtn);
    const todoitemAfter = screen.getAllByTestId("single-todo");
    expect(todoitemAfter.length).toBe(2);
  });
});

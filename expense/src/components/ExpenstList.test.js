import { render, screen } from "@testing-library/react";
import ExpenseTable from "./ExpenseList";

//test cases

describe("Expense Component", () => { //for grouping the test
  test("render Expense List as a Text", () => {
    render(<ExpenseTable />);
    const ExpenseList = screen.getByText("Expense List");
    expect(ExpenseList).toBeInTheDocument();
  });
});
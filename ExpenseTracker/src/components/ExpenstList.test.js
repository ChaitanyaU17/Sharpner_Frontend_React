import { render, screen } from "@testing-library/react";
import ExpenseTable from "./ExpenseList";

//test cases

// describe("Expense Component", () => { //for grouping the test
//   test("render Expense List as a Text", () => {
//     render(<ExpenseTable />);
//     const ExpenseList = screen.getByText("Expense List", {exact: false});
//     expect(ExpenseList).toBeInTheDocument();
//   });
// });

describe('Expense List', () => {
  test('render ZERO EXPENSE FOUND as a text', () => {

    //Arrange
    render(<ExpenseTable />);

    //Act
    //...nothing
    //Assert
    const outputText = screen.getByText('ZERO EXPENSE FOUND');
    expect(outputText).toBeInTheDocument();
  });
});

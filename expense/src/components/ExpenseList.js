import React from 'react';
import { Table, Button } from 'react-bootstrap';

const ExpenseList = ({ expenses, editHandler, deleteHandler }) => {
  return (
    <div className="w-80">
      <h1>Expense List</h1>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>Price</th>
            <th>Description</th>
            <th>Category</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {expenses.length > 0 ? (
            expenses.map((list, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>Rs: {list.price}</td>
                <td>{list.des}</td>
                <td>{list.cat}</td>
                <td>
                  <Button
                    variant="success"
                    onClick={() => editHandler(index)}
                  >
                    Edit
                  </Button>
                  <Button
                    variant="danger"
                    onClick={() => deleteHandler(index)}
                  >
                    Delete
                  </Button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5" style={{ color: "red" }}>ZERO EXPENSE FOUND</td>
            </tr>
          )}
        </tbody>
      </Table>
    </div>
  );
};

export default ExpenseList;

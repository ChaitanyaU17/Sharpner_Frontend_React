import React, { useRef, useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import { useAuth } from '../Auth/AuthContext'; 
import ExpenseList from './ExpenseList'; 

const ExpenseForm = () => {
  const { isLoggedIn } = useAuth();
  const [expenses, setExpenses] = useState([]);
  const [showAlert, setShowAlert] = useState({ active: false, message: '' });
  const priceInputRef = useRef();
  const desInputRef = useRef();
  const catInputRef = useRef();
  const [isUpdate, setIsUpdate] = useState(false);
  const [editIndex, setEditIndex] = useState(null);

  const formHandler = (event) => {
    event.preventDefault();
    const newExpense = {
      price: priceInputRef.current.value,
      des: desInputRef.current.value,
      cat: catInputRef.current.value,
    };

    if (isUpdate) {
      const updatedExpenses = expenses.map((expense, index) =>
        index === editIndex ? newExpense : expense
      );
      setExpenses(updatedExpenses);
      setIsUpdate(false);
      setEditIndex(null);
      setShowAlert({ active: true, message: 'Expense updated successfully' });
    } else {
      setExpenses([...expenses, newExpense]);
      setShowAlert({ active: true, message: 'Expense added successfully' });
    }

    priceInputRef.current.value = '';
    desInputRef.current.value = '';
    catInputRef.current.value = '';
  };

  const editHandler = (index) => {
    const expenseToEdit = expenses[index];
    priceInputRef.current.value = expenseToEdit.price;
    desInputRef.current.value = expenseToEdit.des;
    catInputRef.current.value = expenseToEdit.cat;
    setIsUpdate(true);
    setEditIndex(index);
  };

  if (!isLoggedIn) {
    return <div>Please log in to add expenses.</div>;
  }

  return (
    <div className='mt-4'>
      {showAlert.active && (
        <div className="alert alert-dark w-50 mx-auto" role="alert">
          {showAlert.message}
        </div>
      )}
      <Form
        className="w-50 mx-auto mb-3"
        style={{ background: "#008067", borderRadius: "24px" }}
        onSubmit={formHandler}
      >
        <div className="ps-3 pe-4">
          <Form.Group className="mb-3">
            <Form.Label style={{ color: "white" }}>Price</Form.Label>
            <Form.Control
              type="number"
              placeholder="Enter Price"
              required
              ref={priceInputRef}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label style={{ color: "white" }}>Description</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              placeholder="Enter Description"
              required
              ref={desInputRef}
            />
          </Form.Group>
          <Form.Select
            aria-label="Default select example"
            className="mb-3"
            required
            ref={catInputRef}
          >
            <option>Select Category</option>
            <option value="Food">Food</option>
            <option value="Petrol">Petrol</option>
            <option value="Grocery">Grocery</option>
            <option value="Shopping">Shopping</option>
            <option value="Salary">Salary</option>
          </Form.Select>
          <Button variant="primary" type="submit" className="mb-3 w-100">
            {isUpdate ? "Update Expense" : "Add Expense"}
          </Button>
        </div>
      </Form>
      <ExpenseList expenses={expenses} editHandler={editHandler} />
    </div>
  );
};

export default ExpenseForm;

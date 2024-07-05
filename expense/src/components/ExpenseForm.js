import React, { useRef, useState, useEffect } from 'react';
import { Form, Button } from 'react-bootstrap';
import { useAuth } from '../Auth/AuthContext';
import ExpenseList from './ExpenseList';

const ExpenseForm = () => {
  const { isLoggedIn, user } = useAuth();
  const [expenses, setExpenses] = useState([]);
  const [showAlert, setShowAlert] = useState({ active: false, message: '' });
  const priceInputRef = useRef();
  const desInputRef = useRef();
  const catInputRef = useRef();
  const [isUpdate, setIsUpdate] = useState(false);
  const [editIndex, setEditIndex] = useState(null);

  useEffect(() => {
    if (user) {
      fetchExpenses();
    }
  }, [user]);

  const fetchExpenses = async () => {
    try {
      const response = await fetch(
        `https://expense-tracker-582d5-default-rtdb.firebaseio.com/expenses/${user.localId}.json`
      );

      if (!response.ok) {
        throw new Error('Failed to fetch expenses');
      }

      const data = await response.json();
      const loadedExpenses = [];

      for (const key in data) {
        loadedExpenses.push({
          id: key,
          ...data[key],
        });
      }

      setExpenses(loadedExpenses);
    } catch (error) {
      console.error(error.message);
    }
  };

  const formHandler = async (event) => {
    event.preventDefault();
    const newExpense = {
      price: priceInputRef.current.value,
      des: desInputRef.current.value,
      cat: catInputRef.current.value,
    };

    try {
      let response;

      if (isUpdate) {
        const expenseId = expenses[editIndex].id;
        response = await fetch(
          `https://expense-tracker-582d5-default-rtdb.firebaseio.com/expenses/${user.localId}/${expenseId}.json`,
          {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(newExpense),
          }
        );

        const updatedExpenses = expenses.map((expense, index) =>
          index === editIndex ? { ...newExpense, id: expenseId } : expense
        );
        setExpenses(updatedExpenses);
        setIsUpdate(false);
        setEditIndex(null);

        //shoe edit expense message
        setShowAlert({ active: true, message: 'Expense updated successfully' });
      } else {
        response = await fetch(
          `https://expense-tracker-582d5-default-rtdb.firebaseio.com/expenses/${user.localId}.json`,
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(newExpense),
          }
        );

        const data = await response.json();
        setExpenses([...expenses, { ...newExpense, id: data.name }]);
        setShowAlert({ active: true, message: 'Expense added successfully' });
      }

      if (!response.ok) {
        throw new Error('Failed to save expense');
      }
    } catch (error) {
      console.error(error.message);
    }

    priceInputRef.current.value = '';
    desInputRef.current.value = '';
    catInputRef.current.value = '';
  };

  //edit expense item
  const editHandler = (index) => {
    const expenseToEdit = expenses[index];
    priceInputRef.current.value = expenseToEdit.price;
    desInputRef.current.value = expenseToEdit.des;
    catInputRef.current.value = expenseToEdit.cat;
    setIsUpdate(true);
    setEditIndex(index);
  };

  //delete expense item
  const deleteHandler = async (index) => {
    try {
      const expenseId = expenses[index].id;
      const response = await fetch(
        `https://expense-tracker-582d5-default-rtdb.firebaseio.com/expenses/${user.localId}/${expenseId}.json`,
        {
          method: 'DELETE',
        }
      );

      if (!response.ok) {
        throw new Error('Failed to delete expense');
      }

      const updatedExpenses = expenses.filter((_, i) => i !== index);
      setExpenses(updatedExpenses);

      //show delete expense message
      setShowAlert({ active: true, message: 'Expense deleted successfully' });
    } catch (error) {
      console.error(error.message);
    }
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
      <ExpenseList expenses={expenses} editHandler={editHandler} deleteHandler={deleteHandler} />
    </div>
  );
};

export default ExpenseForm;

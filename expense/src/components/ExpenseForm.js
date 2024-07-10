import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import ExpenseTable from "./ExpenseList";
import { useRef, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { ExpenseSliceActions } from "../Store/ExpenseReducer";

function ExpenseForm() {
  const userId = useSelector(state => state.authentication.userId)

  const dispatch = useDispatch();
  const history = useNavigate();
  const priceInputRef = useRef();
  const desInputRef = useRef();
  const cateInputRef = useRef();
  const [showAlert, setShowAlert] = useState({ message: "", active: false });
  const [isUpdate, setIsUpdate] = useState(false);

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const editHandler = id => {
    history("/?id=" + id);
    setIsUpdate(true);
    axios
      .get(
        `https://expense-tracker-582d5-default-rtdb.firebaseio.com/${userId}/${id}.json`
      )
      .then(res => {
        priceInputRef.current.value = res.data.price;
        desInputRef.current.value = res.data.des;
        cateInputRef.current.value = res.data.cat;
      });
  };
  const formHandler = async e => {
    e.preventDefault();
    if (isUpdate) {
      const updateId = queryParams.get("id");
      
      await axios.put(
        `https://expense-tracker-582d5-default-rtdb.firebaseio.com/${userId}/${updateId}.json`,
        {
          price: priceInputRef.current.value,
          des: desInputRef.current.value,
          cat: cateInputRef.current.value
        }
      );

      setShowAlert({ message: "Updated SuccessFully", active: true });
      setIsUpdate(false)
      setTimeout(() => {
        setShowAlert({ message: "", active: false });

        priceInputRef.current.value = "";
        desInputRef.current.value = "";
        cateInputRef.current.value = "";
        history("/");
      }, 2000);
    } else {
      const obj = {
        price: priceInputRef.current.value,
        des: desInputRef.current.value,
        cat: cateInputRef.current.value
      };
      const data = await axios
        .post(
          `https://expense-tracker-582d5-default-rtdb.firebaseio.com/${userId}.json`,
          obj
        )
        .then(res => res.data)
        .catch(err => console.log(err));
      if (data) {
        dispatch(ExpenseSliceActions.newExpense(obj))
        setShowAlert({ message: "Expenses Added SuccessFully", active: true });
        setTimeout(() => {
          setShowAlert({ message: "", active: false });
        }, 2000);
        priceInputRef.current.value = "";
        desInputRef.current.value = "";
        cateInputRef.current.value = "";
      }
    }
  };
  return (
    <div>
      {showAlert.active &&
        <div className="alert alert-dark w-50 mx-auto" role="alert">
          {showAlert.message}
        </div>}
      <Form
        className="w-50 mx-auto mb-3 bg-success bg-opacity-75"
        style={{ borderRadius: "24px" }}
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
            ref={cateInputRef}
          >
            <option>Select Category</option>
            <option value="Food">Food</option>
            <option value="Petrol">Petrol</option>
            <option value="Grocery">Grocery</option>
            <option value="Shopping">Shopping</option>
            <option value="Salary">Salary</option>
          </Form.Select>
          <Button type="submit" className="mb-3 w-100 btn-success bg-opacity-75 border-white">
            {isUpdate ? "Update" : "Add Expense"}
          </Button>
        </div>
      </Form>
      <ExpenseTable  editHandler={editHandler} isUpdate={isUpdate}/>
    </div>
  );
}

export default ExpenseForm;

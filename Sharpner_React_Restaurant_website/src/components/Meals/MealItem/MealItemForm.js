import classes from './MealItemForm.module.css';
import Input from '../../UI/Input';
import { useContext } from 'react';
import CartContext from '../../../utils/cartContext';

const MealItemForm = (props) => {
  const cartCtx = useContext(CartContext); 

  const amountChangeHandler = (event) => {
    const enteredAmount = event.target.value;
    // Validate or process the entered amount here
    console.log("Entered amount:", enteredAmount); 
  };

  const addToCartHandler = (event) => {
    event.preventDefault(); 
    const enteredAmount = parseInt(cartCtx.amountChangeHandler); // Get and convert amount

    // Add item to cart using cart context functions (assuming functions exist)
    cartCtx.addItem({
      id: props.id, // Assuming ID is passed as a prop
      name: props.name, // Assuming name is passed as a prop
      amount: enteredAmount,
      price: props.price, // Assuming price is passed as a prop
    });
  };

  return (
    <form className={classes.form}>
      <Input
        label='Amount'
        input={{
          id: 'amount',
          type: 'number',
          min: '1',
          max: '5',
          step: '1',
          defaultValue: '1',
          onChange: amountChangeHandler, 
        }}
      />
      <button onClick={addToCartHandler}>+ Add</button>
    </form>
  );
};

export default MealItemForm;
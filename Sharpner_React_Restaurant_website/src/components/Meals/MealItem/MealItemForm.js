import classes from './MealItemForm.module.css';
import Input from '../../UI/Input';
import { useRef } from 'react';

const MealItemForm = () => {
    const amountInputRef = useRef();
    return (
       <form className={classes.form}>
        <Input
        ref={amountInputRef}
         label='Amount'
         input={{
           id: 'amount',
           type: 'number',
           min: '1',
           max: '5',
           step: '1',
           defaultValue: '1',
         }}
        />
         <button>+ Add</button>
       </form>
    );
}

export default MealItemForm;
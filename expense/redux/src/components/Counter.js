import classes from './Counter.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { counterActions } from '../store/Counter';

const Counter = () => {
  const counter = useSelector(state => state.counter.counter);
  const dispatch = useDispatch();
  const show = useSelector(state => state.counter.showCounter);


  const incrementHandler = () => {
    dispatch(counterActions.increment());
  };

  const increaseHandler = () => {
    dispatch(counterActions.increase(5));
  }

  const decrementHandler = () => {
    dispatch(counterActions.decrement());
  };

  const toggleCounterHandler = () => {
    dispatch(counterActions.toggleCounter());
  };

  return (
    <main className={classes.counter}>
      <h1>Redux Counter</h1>
      { show && <div className={classes.value}>{counter}</div> }
      <button onClick={increaseHandler}>Increase</button>&nbsp;
      <button onClick={incrementHandler}>Increment by 1</button>&nbsp;
      <button onClick={decrementHandler}>Decrement by 1</button>&nbsp;
      <button onClick={toggleCounterHandler} >Toggle Counter</button>
      
    </main>
  );
};



export default Counter;

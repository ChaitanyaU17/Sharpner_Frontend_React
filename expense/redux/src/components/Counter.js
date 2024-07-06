import classes from './Counter.module.css';
import { useDispatch, useSelector } from 'react-redux';

const Counter = () => {
  const counter = useSelector(state => state.counter);
  const dispatch = useDispatch();
  const show = useSelector(state => state.showCounter);


  const incrementHandler = () => {
    dispatch({ type: 'increment', amount: 2 });
  };

  const decrementHandler = () => {
    dispatch({ type: 'decrement', amount: 2 });
  };

  const toggleCounterHandler = () => {
    dispatch({type: 'toggle'});
  };

  return (
    <main className={classes.counter}>
      <h1>Redux Counter</h1>
      { show && <div className={classes.value}>{counter}</div> }
      <button onClick={toggleCounterHandler}>Toggle Counter</button>&nbsp;
      <button onClick={incrementHandler}>Increment by 2</button>&nbsp;
      <button onClick={decrementHandler}>Decrement by 2</button>
      <button style={{marginTop: '4px'}} onClick={toggleCounterHandler}>toggle counter</button>
    </main>
  );
};



export default Counter;

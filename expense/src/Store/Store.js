const redux = require('redux');

// Define action types
const INCREMENTBY2 = 'INCREMENTBY2';
const DECREMENTBY2 = 'DECREMENTBY2';

// Define the CounterReducer
const CounterReducer = (state = { counter: 0 }, action) => {
  switch (action.type) {
    case INCREMENTBY2:
      return {
        counter: state.counter + 2,
      };
    case DECREMENTBY2:
      return {
        counter: state.counter - 2,
      };
    default:
      return state;
  }
};

// Create the Redux store
const store = redux.createStore(CounterReducer);

// Define the subscriber
const CounterSubscriber = () => {
  const latestState = store.getState();
  console.log(latestState);
};

// Subscribe to the store
store.subscribe(CounterSubscriber);

// Dispatch actions
store.dispatch({ type: INCREMENTBY2 });
store.dispatch({ type: DECREMENTBY2 });

export { store, INCREMENTBY2, DECREMENTBY2 };

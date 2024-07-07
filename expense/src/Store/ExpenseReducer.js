const initialState = [];

const expenseReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_EXPENSES':
      return action.payload;
    case 'ADD_EXPENSE':
      return [...state, action.payload];
    case 'EDIT_EXPENSE':
      return state.map((expense, index) =>
        index === action.payload.index ? action.payload.expense : expense
      );
    case 'DELETE_EXPENSE':
      return state.filter((_, index) => index !== action.payload);
    default:
      return state;
  }
};

export default expenseReducer;

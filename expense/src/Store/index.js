import { configureStore } from '@reduxjs/toolkit';
import authReducer from './AuthReducer';
import expenseReducer from './ExpenseReducer';

export const store = configureStore({
  reducer: {
    authentication: authReducer,
    expense: expenseReducer,
  },
});



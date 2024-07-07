import { createStore, combineReducers } from 'redux';
import authReducer from './AuthReducer';
import expenseReducer from './ExpenseReducer';
import themeReducer from './ThemeReducer';

const rootReducer = combineReducers({
  auth: authReducer,
  expenses: expenseReducer,
  theme: themeReducer,
});

export const store = createStore(rootReducer);

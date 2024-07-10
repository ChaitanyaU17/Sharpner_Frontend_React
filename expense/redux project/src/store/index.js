import { configureStore } from '@reduxjs/toolkit';
import counterReducer from './Counter';
import authReducer from './Auth';


const store = configureStore({
    reducer: { counter: counterReducer, auth: authReducer},
});

export default store;
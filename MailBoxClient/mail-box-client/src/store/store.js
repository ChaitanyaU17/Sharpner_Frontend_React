import { configureStore } from "@reduxjs/toolkit";
import sentReducer from './sentSlice';

const store = configureStore({
    reducer: {
        sent: sentReducer
    },
});

export default store;
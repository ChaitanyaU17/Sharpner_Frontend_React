import { configureStore } from "@reduxjs/toolkit";
import sentReducer from './sentSlice';
import inboxReducer from './inboxSlice';

const store = configureStore({
    reducer: {
        inbox: inboxReducer,
        sent: sentReducer
    },
});

export default store;
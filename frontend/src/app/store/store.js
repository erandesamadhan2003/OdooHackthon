import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/authentication/authSlice.js'
export const store = configureStore({
    reducer: {
        auth: authReducer
    },
});

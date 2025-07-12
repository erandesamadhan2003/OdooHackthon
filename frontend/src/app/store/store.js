import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/authentication/authSlice.js'
import itemsReducer from '../features/items/itemsSlice.js'
import categoriesReducer from '../features/categories/categoriesSlice.js'

export const store = configureStore({
    reducer: {
        auth: authReducer,
        items: itemsReducer,
        categories: categoriesReducer
    },
});

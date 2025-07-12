import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/authentication/authSlice.js'
import itemsReducer from '../features/items/itemsSlice.js'
import categoriesReducer from '../features/categories/categoriesSlice.js'
import pointsReducer from '../features/points/pointsSlice.js'
import swapsReducer from '../features/swaps/swapsSlice.js'
import transactionsReducer from '../features/transactions/transactionsSlice.js'
import adminReducer from '../features/admin/adminSlice.js'

export const store = configureStore({
    reducer: {
        auth: authReducer,
        items: itemsReducer,
        categories: categoriesReducer,
        points: pointsReducer,
        swaps: swapsReducer,
        transactions: transactionsReducer,
        admin: adminReducer
    },
});

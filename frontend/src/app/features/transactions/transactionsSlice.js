import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Get user transactions async thunk
export const getUserTransactions = createAsyncThunk(
    'transactions/getUserTransactions',
    async (_, { rejectWithValue }) => {
        try {
            const response = await fetch('http://localhost:8004/api/transactions', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
            });

            const data = await response.json();

            if (!response.ok) {
                return rejectWithValue(data.error || 'Failed to fetch transactions');
            }

            return data;
        } catch (error) {
            return rejectWithValue(error.message || 'Network error');
        }
    }
);

const transactionsSlice = createSlice({
    name: 'transactions',
    initialState: {
        transactions: [],
        loading: false,
        error: null,
    },
    reducers: {
        clearError: (state) => {
            state.error = null;
        },
        addTransaction: (state, action) => {
            state.transactions.unshift(action.payload);
        },
        updateTransaction: (state, action) => {
            const index = state.transactions.findIndex(txn => txn._id === action.payload._id);
            if (index !== -1) {
                state.transactions[index] = action.payload;
            }
        },
        removeTransaction: (state, action) => {
            state.transactions = state.transactions.filter(txn => txn._id !== action.payload);
        },
    },
    extraReducers: (builder) => {
        builder
            // Get user transactions cases
            .addCase(getUserTransactions.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getUserTransactions.fulfilled, (state, action) => {
                state.loading = false;
                state.transactions = action.payload;
                state.error = null;
            })
            .addCase(getUserTransactions.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export const { 
    clearError, 
    addTransaction, 
    updateTransaction, 
    removeTransaction 
} = transactionsSlice.actions;

export default transactionsSlice.reducer; 
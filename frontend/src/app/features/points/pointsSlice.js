import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Get points balance async thunk
export const getPointsBalance = createAsyncThunk(
    'points/getPointsBalance',
    async (_, { rejectWithValue }) => {
        try {
            const response = await fetch('http://localhost:8004/api/points/balance', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
            });

            const data = await response.json();

            if (!response.ok) {
                return rejectWithValue(data.error || 'Failed to fetch points balance');
            }

            return data;
        } catch (error) {
            return rejectWithValue(error.message || 'Network error');
        }
    }
);

// Redeem points async thunk
export const redeemPoints = createAsyncThunk(
    'points/redeemPoints',
    async ({ item_id, points }, { rejectWithValue }) => {
        try {
            const response = await fetch('http://localhost:8004/api/points/redeem', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ item_id, points }),
                credentials: 'include',
            });

            const data = await response.json();

            if (!response.ok) {
                return rejectWithValue(data.error || 'Failed to redeem points');
            }

            return data;
        } catch (error) {
            return rejectWithValue(error.message || 'Network error');
        }
    }
);

// Get points history async thunk
export const getPointsHistory = createAsyncThunk(
    'points/getPointsHistory',
    async (_, { rejectWithValue }) => {
        try {
            const response = await fetch('http://localhost:8004/api/points/history', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
            });

            const data = await response.json();

            if (!response.ok) {
                return rejectWithValue(data.error || 'Failed to fetch points history');
            }

            return data;
        } catch (error) {
            return rejectWithValue(error.message || 'Network error');
        }
    }
);

const pointsSlice = createSlice({
    name: 'points',
    initialState: {
        balance: 0,
        history: [],
        loading: false,
        error: null,
        redeemLoading: false,
        redeemError: null,
    },
    reducers: {
        clearError: (state) => {
            state.error = null;
            state.redeemError = null;
        },
        updateBalance: (state, action) => {
            state.balance = action.payload;
        },
        addTransaction: (state, action) => {
            state.history.unshift(action.payload);
        },
    },
    extraReducers: (builder) => {
        builder
            // Get points balance cases
            .addCase(getPointsBalance.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getPointsBalance.fulfilled, (state, action) => {
                state.loading = false;
                state.balance = action.payload.balance;
                state.error = null;
            })
            .addCase(getPointsBalance.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            // Redeem points cases
            .addCase(redeemPoints.pending, (state) => {
                state.redeemLoading = true;
                state.redeemError = null;
            })
            .addCase(redeemPoints.fulfilled, (state, action) => {
                state.redeemLoading = false;
                state.redeemError = null;
                // Balance will be updated by the backend
            })
            .addCase(redeemPoints.rejected, (state, action) => {
                state.redeemLoading = false;
                state.redeemError = action.payload;
            })
            // Get points history cases
            .addCase(getPointsHistory.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getPointsHistory.fulfilled, (state, action) => {
                state.loading = false;
                state.history = action.payload;
                state.error = null;
            })
            .addCase(getPointsHistory.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export const { clearError, updateBalance, addTransaction } = pointsSlice.actions;
export default pointsSlice.reducer; 
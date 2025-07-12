import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Request swap async thunk
export const requestSwap = createAsyncThunk(
    'swaps/requestSwap',
    async ({ owner_id, item_id, message }, { rejectWithValue }) => {
        try {
            const response = await fetch('http://localhost:8004/api/swaps', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ owner_id, item_id, message }),
                credentials: 'include',
            });

            const data = await response.json();

            if (!response.ok) {
                return rejectWithValue(data.error || 'Failed to request swap');
            }

            return data;
        } catch (error) {
            return rejectWithValue(error.message || 'Network error');
        }
    }
);

// Get user swaps async thunk
export const getUserSwaps = createAsyncThunk(
    'swaps/getUserSwaps',
    async (_, { rejectWithValue }) => {
        try {
            const response = await fetch('http://localhost:8004/api/swaps', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
            });

            const data = await response.json();

            if (!response.ok) {
                return rejectWithValue(data.error || 'Failed to fetch swaps');
            }

            return data;
        } catch (error) {
            return rejectWithValue(error.message || 'Network error');
        }
    }
);

// Update swap status async thunk
export const updateSwapStatus = createAsyncThunk(
    'swaps/updateSwapStatus',
    async ({ swapId, status }, { rejectWithValue }) => {
        try {
            const response = await fetch(`http://localhost:8004/api/swaps/${swapId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ status }),
                credentials: 'include',
            });

            const data = await response.json();

            if (!response.ok) {
                return rejectWithValue(data.error || 'Failed to update swap status');
            }

            return { swapId, status, data };
        } catch (error) {
            return rejectWithValue(error.message || 'Network error');
        }
    }
);

const swapsSlice = createSlice({
    name: 'swaps',
    initialState: {
        swaps: [],
        loading: false,
        error: null,
        requestLoading: false,
        requestError: null,
        updateLoading: false,
        updateError: null,
    },
    reducers: {
        clearError: (state) => {
            state.error = null;
            state.requestError = null;
            state.updateError = null;
        },
        addSwap: (state, action) => {
            state.swaps.unshift(action.payload);
        },
        updateSwapInList: (state, action) => {
            const index = state.swaps.findIndex(swap => swap._id === action.payload._id);
            if (index !== -1) {
                state.swaps[index] = action.payload;
            }
        },
        removeSwap: (state, action) => {
            state.swaps = state.swaps.filter(swap => swap._id !== action.payload);
        },
    },
    extraReducers: (builder) => {
        builder
            // Request swap cases
            .addCase(requestSwap.pending, (state) => {
                state.requestLoading = true;
                state.requestError = null;
            })
            .addCase(requestSwap.fulfilled, (state, action) => {
                state.requestLoading = false;
                state.requestError = null;
            })
            .addCase(requestSwap.rejected, (state, action) => {
                state.requestLoading = false;
                state.requestError = action.payload;
            })
            // Get user swaps cases
            .addCase(getUserSwaps.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getUserSwaps.fulfilled, (state, action) => {
                state.loading = false;
                state.swaps = action.payload;
                state.error = null;
            })
            .addCase(getUserSwaps.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            // Update swap status cases
            .addCase(updateSwapStatus.pending, (state) => {
                state.updateLoading = true;
                state.updateError = null;
            })
            .addCase(updateSwapStatus.fulfilled, (state, action) => {
                state.updateLoading = false;
                state.updateError = null;
                // Update the swap in the list
                const index = state.swaps.findIndex(swap => swap._id === action.payload.swapId);
                if (index !== -1) {
                    state.swaps[index].status = action.payload.status;
                }
            })
            .addCase(updateSwapStatus.rejected, (state, action) => {
                state.updateLoading = false;
                state.updateError = action.payload;
            });
    },
});

export const { 
    clearError, 
    addSwap, 
    updateSwapInList, 
    removeSwap 
} = swapsSlice.actions;

export default swapsSlice.reducer; 
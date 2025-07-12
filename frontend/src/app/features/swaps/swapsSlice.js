import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Request swap async thunk
export const requestSwap = createAsyncThunk(
    'swaps/requestSwap',
    async ({ owner_id, item_id, message }, { rejectWithValue }) => {
        console.log('Requesting swap:', { owner_id, item_id, message });    
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
            console.log('Swap response:', data);
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

// Get swap by ID async thunk
export const getSwapById = createAsyncThunk(
    'swaps/getSwapById',
    async (swapId, { rejectWithValue }) => {
        try {
            const response = await fetch(`http://localhost:8004/api/swaps/${swapId}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
            });

            const data = await response.json();

            if (!response.ok) {
                return rejectWithValue(data.error || 'Failed to fetch swap details');
            }

            return data;
        } catch (error) {
            return rejectWithValue(error.message || 'Network error');
        }
    }
);

const swapsSlice = createSlice({
    name: 'swaps',
    initialState: {
        swaps: [],
        currentSwap: null,
        loading: false,
        error: null,
        requestLoading: false,
        requestError: null,
        updateLoading: false,
        updateError: null,
        detailLoading: false,
        detailError: null,
    },
    reducers: {
        clearError: (state) => {
            state.error = null;
            state.requestError = null;
            state.updateError = null;
            state.detailError = null;
        },
        clearCurrentSwap: (state) => {
            state.currentSwap = null;
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
        clearSwaps: (state) => {
            state.swaps = [];
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
                // Add the new swap to the list if it exists
                if (action.payload.swap) {
                    state.swaps.unshift(action.payload.swap);
                }
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
                    // Update with the returned swap data if available
                    if (action.payload.data && action.payload.data.swap) {
                        state.swaps[index] = action.payload.data.swap;
                    }
                }
            })
            .addCase(updateSwapStatus.rejected, (state, action) => {
                state.updateLoading = false;
                state.updateError = action.payload;
            })
            // Get swap by ID cases
            .addCase(getSwapById.pending, (state) => {
                state.detailLoading = true;
                state.detailError = null;
            })
            .addCase(getSwapById.fulfilled, (state, action) => {
                state.detailLoading = false;
                state.currentSwap = action.payload;
                state.detailError = null;
            })
            .addCase(getSwapById.rejected, (state, action) => {
                state.detailLoading = false;
                state.detailError = action.payload;
            });
    },
});

export const { 
    clearError, 
    clearCurrentSwap,
    addSwap, 
    updateSwapInList, 
    removeSwap,
    clearSwaps
} = swapsSlice.actions;

export default swapsSlice.reducer; 
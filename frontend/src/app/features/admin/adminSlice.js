import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Fetch all users
export const fetchAllUsers = createAsyncThunk(
    'admin/fetchAllUsers',
    async (_, { rejectWithValue }) => {
        try {
            const response = await fetch('http://localhost:8004/api/admin/users', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
            });

            const data = await response.json();

            if (!response.ok) {
                return rejectWithValue(data.error || 'Failed to fetch users');
            }

            return data;
        } catch (error) {
            return rejectWithValue(error.message || 'Network error');
        }
    }
);

// Ban user
export const banUser = createAsyncThunk(
    'admin/banUser',
    async (userId, { rejectWithValue }) => {
        try {
            const response = await fetch(`http://localhost:8004/api/admin/users/${userId}/ban`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
            });

            const data = await response.json();

            if (!response.ok) {
                return rejectWithValue(data.error || 'Failed to ban user');
            }

            return { userId, data };
        } catch (error) {
            return rejectWithValue(error.message || 'Network error');
        }
    }
);

// Unban user
export const unbanUser = createAsyncThunk(
    'admin/unbanUser',
    async (userId, { rejectWithValue }) => {
        try {
            const response = await fetch(`http://localhost:8004/api/admin/users/${userId}/unban`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
            });

            const data = await response.json();

            if (!response.ok) {
                return rejectWithValue(data.error || 'Failed to unban user');
            }

            return { userId, data };
        } catch (error) {
            return rejectWithValue(error.message || 'Network error');
        }
    }
);

// Fetch all orders
export const fetchAllOrders = createAsyncThunk(
    'admin/fetchAllOrders',
    async (_, { rejectWithValue }) => {
        try {
            const response = await fetch('http://localhost:8004/api/admin/orders', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
            });

            const data = await response.json();

            if (!response.ok) {
                return rejectWithValue(data.error || 'Failed to fetch orders');
            }

            return data;
        } catch (error) {
            return rejectWithValue(error.message || 'Network error');
        }
    }
);

// Update order status
export const updateOrderStatus = createAsyncThunk(
    'admin/updateOrderStatus',
    async ({ orderId, status }, { rejectWithValue }) => {
        try {
            const response = await fetch(`http://localhost:8004/api/admin/orders/${orderId}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ status }),
                credentials: 'include',
            });

            const data = await response.json();

            if (!response.ok) {
                return rejectWithValue(data.error || 'Failed to update order status');
            }

            return { orderId, data };
        } catch (error) {
            return rejectWithValue(error.message || 'Network error');
        }
    }
);

// Fetch all listings
export const fetchAllListings = createAsyncThunk(
    'admin/fetchAllListings',
    async (_, { rejectWithValue }) => {
        try {
            const response = await fetch('http://localhost:8004/api/admin/listings', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
            });

            const data = await response.json();

            if (!response.ok) {
                return rejectWithValue(data.error || 'Failed to fetch listings');
            }

            return data;
        } catch (error) {
            return rejectWithValue(error.message || 'Network error');
        }
    }
);

// Approve listing
export const approveListing = createAsyncThunk(
    'admin/approveListing',
    async (listingId, { rejectWithValue }) => {
        try {
            const response = await fetch(`http://localhost:8004/api/admin/listings/${listingId}/approve`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
            });

            const data = await response.json();

            if (!response.ok) {
                return rejectWithValue(data.error || 'Failed to approve listing');
            }

            return { listingId, data };
        } catch (error) {
            return rejectWithValue(error.message || 'Network error');
        }
    }
);

// Reject listing
export const rejectListing = createAsyncThunk(
    'admin/rejectListing',
    async (listingId, { rejectWithValue }) => {
        try {
            const response = await fetch(`http://localhost:8004/api/admin/listings/${listingId}/reject`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
            });

            const data = await response.json();

            if (!response.ok) {
                return rejectWithValue(data.error || 'Failed to reject listing');
            }

            return { listingId, data };
        } catch (error) {
            return rejectWithValue(error.message || 'Network error');
        }
    }
);

// Remove listing
export const removeListing = createAsyncThunk(
    'admin/removeListing',
    async (listingId, { rejectWithValue }) => {
        try {
            const response = await fetch(`http://localhost:8004/api/admin/listings/${listingId}/remove`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
            });

            const data = await response.json();

            if (!response.ok) {
                return rejectWithValue(data.error || 'Failed to remove listing');
            }

            return { listingId, data };
        } catch (error) {
            return rejectWithValue(error.message || 'Network error');
        }
    }
);

const adminSlice = createSlice({
    name: 'admin',
    initialState: {
        users: [],
        orders: [],
        listings: [],
        loading: {
            users: false,
            orders: false,
            listings: false,
        },
        error: {
            users: null,
            orders: null,
            listings: null,
        },
        actionLoading: {
            banUser: false,
            unbanUser: false,
            updateOrder: false,
            approveListing: false,
            rejectListing: false,
            removeListing: false,
        },
        actionError: {
            banUser: null,
            unbanUser: null,
            updateOrder: null,
            approveListing: null,
            rejectListing: null,
            removeListing: null,
        },
    },
    reducers: {
        clearError: (state, action) => {
            const { section } = action.payload;
            if (section) {
                state.error[section] = null;
                state.actionError[section] = null;
            } else {
                state.error = { users: null, orders: null, listings: null };
                state.actionError = {
                    banUser: null,
                    unbanUser: null,
                    updateOrder: null,
                    approveListing: null,
                    rejectListing: null,
                    removeListing: null,
                };
            }
        },
        clearActionError: (state, action) => {
            const { action: actionType } = action.payload;
            if (actionType) {
                state.actionError[actionType] = null;
            }
        },
    },
    extraReducers: (builder) => {
        builder
            // Fetch all users
            .addCase(fetchAllUsers.pending, (state) => {
                state.loading.users = true;
                state.error.users = null;
            })
            .addCase(fetchAllUsers.fulfilled, (state, action) => {
                state.loading.users = false;
                state.users = action.payload;
                state.error.users = null;
            })
            .addCase(fetchAllUsers.rejected, (state, action) => {
                state.loading.users = false;
                state.error.users = action.payload;
            })
            // Ban user
            .addCase(banUser.pending, (state) => {
                state.actionLoading.banUser = true;
                state.actionError.banUser = null;
            })
            .addCase(banUser.fulfilled, (state, action) => {
                state.actionLoading.banUser = false;
                const index = state.users.findIndex(user => user._id === action.payload.userId);
                if (index !== -1) {
                    state.users[index] = action.payload.data;
                }
                state.actionError.banUser = null;
            })
            .addCase(banUser.rejected, (state, action) => {
                state.actionLoading.banUser = false;
                state.actionError.banUser = action.payload;
            })
            // Unban user
            .addCase(unbanUser.pending, (state) => {
                state.actionLoading.unbanUser = true;
                state.actionError.unbanUser = null;
            })
            .addCase(unbanUser.fulfilled, (state, action) => {
                state.actionLoading.unbanUser = false;
                const index = state.users.findIndex(user => user._id === action.payload.userId);
                if (index !== -1) {
                    state.users[index] = action.payload.data;
                }
                state.actionError.unbanUser = null;
            })
            .addCase(unbanUser.rejected, (state, action) => {
                state.actionLoading.unbanUser = false;
                state.actionError.unbanUser = action.payload;
            })
            // Fetch all orders
            .addCase(fetchAllOrders.pending, (state) => {
                state.loading.orders = true;
                state.error.orders = null;
            })
            .addCase(fetchAllOrders.fulfilled, (state, action) => {
                state.loading.orders = false;
                state.orders = action.payload;
                state.error.orders = null;
            })
            .addCase(fetchAllOrders.rejected, (state, action) => {
                state.loading.orders = false;
                state.error.orders = action.payload;
            })
            // Update order status
            .addCase(updateOrderStatus.pending, (state) => {
                state.actionLoading.updateOrder = true;
                state.actionError.updateOrder = null;
            })
            .addCase(updateOrderStatus.fulfilled, (state, action) => {
                state.actionLoading.updateOrder = false;
                const index = state.orders.findIndex(order => order._id === action.payload.orderId);
                if (index !== -1) {
                    state.orders[index] = action.payload.data;
                }
                state.actionError.updateOrder = null;
            })
            .addCase(updateOrderStatus.rejected, (state, action) => {
                state.actionLoading.updateOrder = false;
                state.actionError.updateOrder = action.payload;
            })
            // Fetch all listings
            .addCase(fetchAllListings.pending, (state) => {
                state.loading.listings = true;
                state.error.listings = null;
            })
            .addCase(fetchAllListings.fulfilled, (state, action) => {
                state.loading.listings = false;
                state.listings = action.payload;
                state.error.listings = null;
            })
            .addCase(fetchAllListings.rejected, (state, action) => {
                state.loading.listings = false;
                state.error.listings = action.payload;
            })
            // Approve listing
            .addCase(approveListing.pending, (state) => {
                state.actionLoading.approveListing = true;
                state.actionError.approveListing = null;
            })
            .addCase(approveListing.fulfilled, (state, action) => {
                state.actionLoading.approveListing = false;
                const index = state.listings.findIndex(listing => listing._id === action.payload.listingId);
                if (index !== -1) {
                    state.listings[index] = action.payload.data;
                }
                state.actionError.approveListing = null;
            })
            .addCase(approveListing.rejected, (state, action) => {
                state.actionLoading.approveListing = false;
                state.actionError.approveListing = action.payload;
            })
            // Reject listing
            .addCase(rejectListing.pending, (state) => {
                state.actionLoading.rejectListing = true;
                state.actionError.rejectListing = null;
            })
            .addCase(rejectListing.fulfilled, (state, action) => {
                state.actionLoading.rejectListing = false;
                const index = state.listings.findIndex(listing => listing._id === action.payload.listingId);
                if (index !== -1) {
                    state.listings[index] = action.payload.data;
                }
                state.actionError.rejectListing = null;
            })
            .addCase(rejectListing.rejected, (state, action) => {
                state.actionLoading.rejectListing = false;
                state.actionError.rejectListing = action.payload;
            })
            // Remove listing
            .addCase(removeListing.pending, (state) => {
                state.actionLoading.removeListing = true;
                state.actionError.removeListing = null;
            })
            .addCase(removeListing.fulfilled, (state, action) => {
                state.actionLoading.removeListing = false;
                const index = state.listings.findIndex(listing => listing._id === action.payload.listingId);
                if (index !== -1) {
                    state.listings[index] = action.payload.data;
                }
                state.actionError.removeListing = null;
            })
            .addCase(removeListing.rejected, (state, action) => {
                state.actionLoading.removeListing = false;
                state.actionError.removeListing = action.payload;
            });
    },
});

export const { clearError, clearActionError } = adminSlice.actions;
export default adminSlice.reducer; 
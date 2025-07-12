import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Fetch all items async thunk
export const fetchItems = createAsyncThunk(
    'items/fetchItems',
    async (filters = {}, { rejectWithValue }) => {
        try {
            const queryParams = new URLSearchParams();
            
            // Add filters to query params
            if (filters.category) queryParams.append('category', filters.category);
            if (filters.size) queryParams.append('size', filters.size);
            if (filters.condition) queryParams.append('condition', filters.condition);
            if (filters.search) queryParams.append('search', filters.search);

            const response = await fetch(`http://localhost:8004/api/items?${queryParams.toString()}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            const data = await response.json();

            if (!response.ok) {
                return rejectWithValue(data.error || 'Failed to fetch items');
            }

            return data;
        } catch (error) {
            return rejectWithValue(error.message || 'Network error');
        }
    }
);

// Fetch single item by ID async thunk
export const fetchItemById = createAsyncThunk(
    'items/fetchItemById',
    async (itemId, { rejectWithValue }) => {
        try {
            const response = await fetch(`http://localhost:8004/api/items/${itemId}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            const data = await response.json();

            if (!response.ok) {
                return rejectWithValue(data.error || 'Failed to fetch item');
            }

            return data;
        } catch (error) {
            return rejectWithValue(error.message || 'Network error');
        }
    }
);

// Create new item async thunk
export const createItem = createAsyncThunk(
    'items/createItem',
    async (itemData, { rejectWithValue }) => {
        try {
            const formData = new FormData();
            
            // Add text fields
            Object.keys(itemData).forEach(key => {
                if (key !== 'images') {
                    formData.append(key, itemData[key]);
                }
            });

            // Add images
            if (itemData.images) {
                itemData.images.forEach(image => {
                    formData.append('images', image);
                });
            }

            const response = await fetch('http://localhost:8004/api/items', {
                method: 'POST',
                body: formData,
                credentials: 'include',
            });

            const data = await response.json();

            if (!response.ok) {
                return rejectWithValue(data.error || 'Failed to create item');
            }

            return data;
        } catch (error) {
            return rejectWithValue(error.message || 'Network error');
        }
    }
);

// Update item async thunk
export const updateItem = createAsyncThunk(
    'items/updateItem',
    async ({ itemId, itemData }, { rejectWithValue }) => {
        try {
            const response = await fetch(`http://localhost:8004/api/items/${itemId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(itemData),
                credentials: 'include',
            });

            const data = await response.json();

            if (!response.ok) {
                return rejectWithValue(data.error || 'Failed to update item');
            }

            return data;
        } catch (error) {
            return rejectWithValue(error.message || 'Network error');
        }
    }
);

// Delete item async thunk
export const deleteItem = createAsyncThunk(
    'items/deleteItem',
    async (itemId, { rejectWithValue }) => {
        try {
            const response = await fetch(`http://localhost:8004/api/items/${itemId}`, {
                method: 'DELETE',
                credentials: 'include',
            });

            if (!response.ok) {
                const data = await response.json();
                return rejectWithValue(data.error || 'Failed to delete item');
            }

            return itemId;
        } catch (error) {
            return rejectWithValue(error.message || 'Network error');
        }
    }
);

const itemsSlice = createSlice({
    name: 'items',
    initialState: {
        items: [],
        currentItem: null,
        loading: false,
        error: null,
        filters: {
            category: '',
            size: '',
            condition: '',
            search: ''
        },
        pagination: {
            page: 1,
            limit: 12,
            total: 0
        }
    },
    reducers: {
        clearError: (state) => {
            state.error = null;
        },
        setFilters: (state, action) => {
            state.filters = { ...state.filters, ...action.payload };
        },
        clearFilters: (state) => {
            state.filters = {
                category: '',
                size: '',
                condition: '',
                search: ''
            };
        },
        setCurrentItem: (state, action) => {
            state.currentItem = action.payload;
        },
        clearCurrentItem: (state) => {
            state.currentItem = null;
        },
        updateItemInList: (state, action) => {
            const index = state.items.findIndex(item => item._id === action.payload._id);
            if (index !== -1) {
                state.items[index] = action.payload;
            }
        },
        removeItemFromList: (state, action) => {
            state.items = state.items.filter(item => item._id !== action.payload);
        }
    },
    extraReducers: (builder) => {
        builder
            // Fetch all items cases
            .addCase(fetchItems.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchItems.fulfilled, (state, action) => {
                state.loading = false;
                state.items = action.payload;
                state.error = null;
            })
            .addCase(fetchItems.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            // Fetch single item cases
            .addCase(fetchItemById.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchItemById.fulfilled, (state, action) => {
                state.loading = false;
                state.currentItem = action.payload;
                state.error = null;
            })
            .addCase(fetchItemById.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            // Create item cases
            .addCase(createItem.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(createItem.fulfilled, (state, action) => {
                state.loading = false;
                state.items.unshift(action.payload);
                state.error = null;
            })
            .addCase(createItem.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            // Update item cases
            .addCase(updateItem.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(updateItem.fulfilled, (state, action) => {
                state.loading = false;
                const index = state.items.findIndex(item => item._id === action.payload._id);
                if (index !== -1) {
                    state.items[index] = action.payload;
                }
                if (state.currentItem && state.currentItem._id === action.payload._id) {
                    state.currentItem = action.payload;
                }
                state.error = null;
            })
            .addCase(updateItem.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            // Delete item cases
            .addCase(deleteItem.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(deleteItem.fulfilled, (state, action) => {
                state.loading = false;
                state.items = state.items.filter(item => item._id !== action.payload);
                if (state.currentItem && state.currentItem._id === action.payload) {
                    state.currentItem = null;
                }
                state.error = null;
            })
            .addCase(deleteItem.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export const { 
    clearError, 
    setFilters, 
    clearFilters, 
    setCurrentItem, 
    clearCurrentItem,
    updateItemInList,
    removeItemFromList
} = itemsSlice.actions;

export default itemsSlice.reducer; 
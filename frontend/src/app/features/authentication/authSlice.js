import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Login async thunk
export const loginUser = createAsyncThunk(
    'auth/loginUser',
    async ({ email, password, role }, { rejectWithValue }) => {
        try {
            const response = await fetch('http://localhost:8004/api/user/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password, role }),
                credentials: 'include',
            });

            const data = await response.json();

            if (!response.ok) {
                return rejectWithValue(data.error || 'Login failed');
            }

            return data;
        } catch (error) {
            return rejectWithValue(error.message || 'Network error');
        }
    }
);

// Signup async thunk
export const signupUser = createAsyncThunk(
    'auth/signupUser',
    async ({ username, email, password }, { rejectWithValue }) => {
        try {
            const response = await fetch('http://localhost:8004/api/user/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, email, password }),
            });

            const data = await response.json();

            if (!response.ok) {
                return rejectWithValue(data.error || 'Registration failed');
            }

            return data;
        } catch (error) {
            return rejectWithValue(error.message || 'Network error');
        }
    }
);

// Logout async thunk
export const logoutUser = createAsyncThunk(
    'auth/logoutUser',
    async (_, { rejectWithValue }) => {
        try {
            const response = await fetch('http://localhost:8004/api/user/logout', {
                method: 'GET',
                credentials: 'include',
            });

            if (!response.ok) {
                return rejectWithValue('Logout failed');
            }

            return true;
        } catch (error) {
            return rejectWithValue(error.message || 'Network error');
        }
    }
);

const authSlice = createSlice({
    name: 'auth',
    initialState: {
        user: null, // This will now contain { id, username, email }
        username: null,
        isAuthenticated: false,
        loading: false,
        error: null,
        signupSuccess: false,
    },
    reducers: {
        clearError: (state) => {
            state.error = null;
        },
        clearSignupSuccess: (state) => {
            state.signupSuccess = false;
        },
        setUser: (state, action) => {
            state.user = action.payload;
            state.username = action.payload.username;
            state.isAuthenticated = true;
        },
        clearUser: (state) => {
            state.user = null;
            state.username = null;
            state.isAuthenticated = false;
        },
    },
    extraReducers: (builder) => {
        builder
            // Login cases
            .addCase(loginUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                state.loading = false;
                state.isAuthenticated = true;
                state.error = null;
                // Store the complete user object including userId
                state.user = action.payload.user;
                state.username = action.payload.user.username;
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
                state.isAuthenticated = false;
            })
            // Signup cases
            .addCase(signupUser.pending, (state) => {
                state.loading = true;
                state.error = null;
                state.signupSuccess = false;
            })
            .addCase(signupUser.fulfilled, (state, action) => {
                state.loading = false;
                state.error = null;
                state.signupSuccess = true;
            })
            .addCase(signupUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
                state.signupSuccess = false;
            })
            // Logout cases
            .addCase(logoutUser.pending, (state) => {
                state.loading = true;
            })
            .addCase(logoutUser.fulfilled, (state) => {
                state.loading = false;
                state.user = null;
                state.username = null;
                state.isAuthenticated = false;
                state.error = null;
            })
            .addCase(logoutUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
}

export const { clearError, clearSignupSuccess, setUser, clearUser } = authSlice.actions;
export default authSlice.reducer;
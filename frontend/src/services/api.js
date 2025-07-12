// Base API configuration
const API_BASE_URL = 'http://localhost:8004/api';

// Helper function to handle API requests
const apiRequest = async (endpoint, options = {}) => {
    const url = `${API_BASE_URL}${endpoint}`;
    
    const defaultOptions = {
        headers: {
            'Content-Type': 'application/json',
        },
        credentials: 'include', // Include cookies for authentication
    };

    const config = {
        ...defaultOptions,
        ...options,
        headers: {
            ...defaultOptions.headers,
            ...options.headers,
        },
    };

    try {
        const response = await fetch(url, config);
        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.error || `HTTP ${response.status}: ${response.statusText}`);
        }

        return data;
    } catch (error) {
        console.error('API Request Error:', error);
        throw error;
    }
};

// Authentication API
export const authAPI = {
    login: (credentials) => apiRequest('/user/login', {
        method: 'POST',
        body: JSON.stringify(credentials),
    }),
    
    register: (userData) => apiRequest('/user/register', {
        method: 'POST',
        body: JSON.stringify(userData),
    }),
    
    logout: () => apiRequest('/user/logout', {
        method: 'GET',
    }),
    
    socialLogin: (socialData) => apiRequest('/user/social-login', {
        method: 'POST',
        body: JSON.stringify(socialData),
    }),
    
    getProfile: () => apiRequest('/user/profile', {
        method: 'GET',
    }),
    
    updateProfile: (profileData) => apiRequest('/user/profile', {
        method: 'PUT',
        body: JSON.stringify(profileData),
    }),
    
    uploadProfilePicture: (formData) => apiRequest('/user/profile/upload-picture', {
        method: 'POST',
        headers: {}, // Let browser set content-type for FormData
        body: formData,
    }),
    
    verifyToken: () => apiRequest('/user/verify', {
        method: 'GET',
    }),
};

// Items API
export const itemsAPI = {
    getAllItems: (filters = {}) => {
        const queryParams = new URLSearchParams();
        Object.entries(filters).forEach(([key, value]) => {
            if (value) queryParams.append(key, value);
        });
        
        return apiRequest(`/items?${queryParams.toString()}`, {
            method: 'GET',
        });
    },
    
    getItemById: (itemId) => apiRequest(`/items/${itemId}`, {
        method: 'GET',
    }),
    
    createItem: (itemData) => apiRequest('/items', {
        method: 'POST',
        headers: {}, // Let browser set content-type for FormData
        body: itemData, // FormData for file uploads
    }),
    
    updateItem: (itemId, itemData) => apiRequest(`/items/${itemId}`, {
        method: 'PUT',
        body: JSON.stringify(itemData),
    }),
    
    deleteItem: (itemId) => apiRequest(`/items/${itemId}`, {
        method: 'DELETE',
    }),
};

// Points API
export const pointsAPI = {
    getBalance: () => apiRequest('/points/balance', {
        method: 'GET',
    }),
    
    redeemPoints: (redeemData) => apiRequest('/points/redeem', {
        method: 'POST',
        body: JSON.stringify(redeemData),
    }),
    
    getHistory: () => apiRequest('/points/history', {
        method: 'GET',
    }),
};

// Swaps API
export const swapsAPI = {
    requestSwap: (swapData) => apiRequest('/swaps', {
        method: 'POST',
        body: JSON.stringify(swapData),
    }),
    
    getUserSwaps: () => apiRequest('/swaps', {
        method: 'GET',
    }),
    
    updateSwapStatus: (swapId, status) => apiRequest(`/swaps/${swapId}`, {
        method: 'PUT',
        body: JSON.stringify({ status }),
    }),
};

// Transactions API
export const transactionsAPI = {
    getUserTransactions: () => apiRequest('/transactions', {
        method: 'GET',
    }),
};

// Utility functions
export const apiUtils = {
    // Check if user is authenticated
    isAuthenticated: async () => {
        try {
            await authAPI.verifyToken();
            return true;
        } catch (error) {
            return false;
        }
    },
    
    // Handle API errors
    handleError: (error) => {
        console.error('API Error:', error);
        return {
            message: error.message || 'An unexpected error occurred',
            status: error.status || 500,
        };
    },
    
    // Create FormData for file uploads
    createFormData: (data) => {
        const formData = new FormData();
        Object.entries(data).forEach(([key, value]) => {
            if (value !== null && value !== undefined) {
                if (key === 'images' && Array.isArray(value)) {
                    value.forEach((file, index) => {
                        formData.append(`images`, file);
                    });
                } else {
                    formData.append(key, value);
                }
            }
        });
        return formData;
    },
};

export default {
    auth: authAPI,
    items: itemsAPI,
    points: pointsAPI,
    swaps: swapsAPI,
    transactions: transactionsAPI,
    utils: apiUtils,
}; 
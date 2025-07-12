# Backend-Frontend Integration Documentation

This document describes the complete integration between the backend API and frontend Redux store for the ReWear application.

## 🏗️ **Architecture Overview**

### **Backend API Endpoints**
- **Authentication**: `/api/user/*` - Login, register, social login, profile management
- **Items**: `/api/items/*` - CRUD operations for clothing items
- **Points**: `/api/points/*` - Points balance, redemption, history
- **Swaps**: `/api/swaps/*` - Swap requests, user swaps, status updates
- **Transactions**: `/api/transactions/*` - User transaction history

### **Frontend Redux Slices**
- **Auth Slice**: User authentication and profile management
- **Items Slice**: Item CRUD operations and filtering
- **Categories Slice**: Dynamic category management
- **Points Slice**: Points balance and redemption
- **Swaps Slice**: Swap requests and management
- **Transactions Slice**: Transaction history

## 📦 **Redux Store Structure**

```javascript
{
  auth: {
    user: null,
    username: null,
    isAuthenticated: false,
    loading: false,
    error: null,
    socialProvider: null,
    userProfile: null
  },
  items: {
    items: [],
    currentItem: null,
    loading: false,
    error: null,
    filters: { category: '', size: '', condition: '', search: '' },
    pagination: { page: 1, limit: 12, total: 0 }
  },
  categories: {
    selectedCategory: '',
    loading: false,
    error: null
  },
  points: {
    balance: 0,
    history: [],
    loading: false,
    error: null,
    redeemLoading: false,
    redeemError: null
  },
  swaps: {
    swaps: [],
    loading: false,
    error: null,
    requestLoading: false,
    requestError: null,
    updateLoading: false,
    updateError: null
  },
  transactions: {
    transactions: [],
    loading: false,
    error: null
  }
}
```

## 🔌 **API Service Layer**

### **Centralized API Service (`/src/services/api.js`)**

The API service provides a centralized way to interact with the backend:

```javascript
import api from '@/services/api';

// Authentication
await api.auth.login({ email, password });
await api.auth.register({ username, email, password });
await api.auth.socialLogin({ provider, userData });
await api.auth.getProfile();

// Items
await api.items.getAllItems({ category: 'Clothing', size: 'M' });
await api.items.createItem(formData);
await api.items.updateItem(itemId, itemData);
await api.items.deleteItem(itemId);

// Points
await api.points.getBalance();
await api.points.redeemPoints({ item_id, points });
await api.points.getHistory();

// Swaps
await api.swaps.requestSwap({ owner_id, item_id, message });
await api.swaps.getUserSwaps();
await api.swaps.updateSwapStatus(swapId, 'accepted');

// Transactions
await api.transactions.getUserTransactions();
```

## 🎯 **Redux Slices Usage**

### **1. Authentication Slice**

```javascript
import { useDispatch, useSelector } from 'react-redux';
import { loginUser, logoutUser, socialLogin } from '@/app/features/authentication/authSlice';

// In component
const dispatch = useDispatch();
const { isAuthenticated, user, loading } = useSelector((state) => state.auth);

// Login
dispatch(loginUser({ email, password }));

// Social login
dispatch(socialLogin({ provider: 'google', userData }));

// Logout
dispatch(logoutUser());
```

### **2. Items Slice**

```javascript
import { fetchItems, createItem, updateItem, deleteItem } from '@/app/features/items/itemsSlice';

// Fetch items with filters
dispatch(fetchItems({ category: 'Clothing', size: 'M' }));

// Create new item
const formData = new FormData();
formData.append('title', 'Vintage Jacket');
formData.append('category', 'Clothing');
// ... add other fields
dispatch(createItem(formData));

// Update item
dispatch(updateItem({ itemId: '123', itemData: { title: 'New Title' } }));

// Delete item
dispatch(deleteItem('123'));
```

### **3. Categories Slice**

```javascript
import { setSelectedCategory, clearSelectedCategory } from '@/app/features/categories/categoriesSlice';
import { selectCategories, selectItemsByCategory } from '@/app/features/categories/categoriesSlice';

// Get categories from items
const categories = useSelector(selectCategories);

// Get filtered items by category
const filteredItems = useSelector(selectItemsByCategory);

// Select category
dispatch(setSelectedCategory('Clothing'));

// Clear category filter
dispatch(clearSelectedCategory());
```

### **4. Points Slice**

```javascript
import { getPointsBalance, redeemPoints, getPointsHistory } from '@/app/features/points/pointsSlice';

// Get points balance
dispatch(getPointsBalance());

// Redeem points for item
dispatch(redeemPoints({ item_id: '123', points: 500 }));

// Get points history
dispatch(getPointsHistory());

// Access state
const { balance, history, loading } = useSelector((state) => state.points);
```

### **5. Swaps Slice**

```javascript
import { requestSwap, getUserSwaps, updateSwapStatus } from '@/app/features/swaps/swapsSlice';

// Request a swap
dispatch(requestSwap({ 
  owner_id: 'user123', 
  item_id: 'item456', 
  message: 'Would you like to swap?' 
}));

// Get user's swaps
dispatch(getUserSwaps());

// Update swap status
dispatch(updateSwapStatus({ swapId: 'swap123', status: 'accepted' }));

// Access state
const { swaps, loading } = useSelector((state) => state.swaps);
```

### **6. Transactions Slice**

```javascript
import { getUserTransactions } from '@/app/features/transactions/transactionsSlice';

// Get transaction history
dispatch(getUserTransactions());

// Access state
const { transactions, loading } = useSelector((state) => state.transactions);
```

## 🔄 **Data Flow Examples**

### **Item Creation Flow**

1. **User fills form** → Component state
2. **Form submission** → `createItem(formData)` action
3. **API call** → Backend `/api/items` POST
4. **Success response** → Redux store updated
5. **UI update** → New item appears in list

### **Category Filtering Flow**

1. **User clicks category** → `setSelectedCategory('Clothing')`
2. **Redux selector** → `selectItemsByCategory` filters items
3. **Component re-renders** → Shows filtered items
4. **URL updates** → Reflects current filter state

### **Points Redemption Flow**

1. **User clicks redeem** → `redeemPoints({ item_id, points })`
2. **API call** → Backend `/api/points/redeem` POST
3. **Backend validation** → Checks sufficient points
4. **Success response** → Points balance updated
5. **UI update** → New balance displayed

## 🛠️ **Error Handling**

### **Redux Error States**

Each slice includes error handling:

```javascript
const { error, loading } = useSelector((state) => state.items);

if (error) {
  return <div className="error">{error}</div>;
}

if (loading) {
  return <div className="loading">Loading...</div>;
}
```

### **API Error Handling**

```javascript
try {
  const result = await api.items.createItem(formData);
  // Handle success
} catch (error) {
  // Handle error
  console.error('API Error:', error.message);
}
```

## 🔐 **Authentication Flow**

### **Login Process**

1. **User submits credentials** → `loginUser({ email, password })`
2. **API call** → Backend validates credentials
3. **JWT token** → Stored in httpOnly cookie
4. **Redux state** → `isAuthenticated: true`
5. **Protected routes** → Now accessible

### **Token Verification**

```javascript
// Check if user is authenticated
const isAuth = await api.utils.isAuthenticated();

// Verify token on app load
useEffect(() => {
  dispatch(verifyToken());
}, []);
```

## 📱 **Component Integration Examples**

### **Items List Component**

```javascript
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchItems } from '@/app/features/items/itemsSlice';

const ItemsList = () => {
  const dispatch = useDispatch();
  const { items, loading, error } = useSelector((state) => state.items);

  useEffect(() => {
    dispatch(fetchItems());
  }, [dispatch]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      {items.map(item => (
        <ItemCard key={item._id} item={item} />
      ))}
    </div>
  );
};
```

### **Points Display Component**

```javascript
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getPointsBalance } from '@/app/features/points/pointsSlice';

const PointsDisplay = () => {
  const dispatch = useDispatch();
  const { balance, loading } = useSelector((state) => state.points);

  useEffect(() => {
    dispatch(getPointsBalance());
  }, [dispatch]);

  return (
    <div>
      <h3>Points Balance: {balance}</h3>
    </div>
  );
};
```

## 🚀 **Best Practices**

### **1. Loading States**
Always handle loading states in components:

```javascript
const { loading, error, data } = useSelector((state) => state.someSlice);

if (loading) return <LoadingSpinner />;
if (error) return <ErrorMessage error={error} />;
```

### **2. Error Boundaries**
Wrap components with error boundaries:

```javascript
<ErrorBoundary>
  <ItemsList />
</ErrorBoundary>
```

### **3. Optimistic Updates**
Update UI immediately, then sync with backend:

```javascript
// Optimistic update
dispatch(addItem(newItem));

// Sync with backend
dispatch(createItem(formData));
```

### **4. Debounced Search**
For search functionality:

```javascript
const debouncedSearch = useCallback(
  debounce((searchTerm) => {
    dispatch(fetchItems({ search: searchTerm }));
  }, 300),
  [dispatch]
);
```

## 🔧 **Development Setup**

### **Environment Variables**

```env
# Frontend (.env)
VITE_API_BASE_URL=http://localhost:8004/api
VITE_CLERK_PUBLISHABLE_KEY=your_clerk_key

# Backend (.env)
PORT=8004
MONGODB_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret
```

### **CORS Configuration**

Backend should allow frontend origin:

```javascript
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}));
```

## 📊 **Performance Optimization**

### **1. Memoized Selectors**
Use `createSelector` for expensive computations:

```javascript
export const selectFilteredItems = createSelector(
  [(state) => state.items.items, (state) => state.items.filters],
  (items, filters) => {
    // Expensive filtering logic
    return items.filter(item => /* filter logic */);
  }
);
```

### **2. Lazy Loading**
Load data only when needed:

```javascript
const { data } = useSelector((state) => state.items);
const shouldLoad = data.length === 0 && !loading;

useEffect(() => {
  if (shouldLoad) {
    dispatch(fetchItems());
  }
}, [shouldLoad, dispatch]);
```

### **3. Pagination**
Implement pagination for large datasets:

```javascript
dispatch(fetchItems({ page: 1, limit: 12 }));
```

## 🧪 **Testing**

### **Redux Testing**

```javascript
import { renderWithProviders } from '@/test/utils';

test('should fetch items', async () => {
  const { store } = renderWithProviders(<ItemsList />);
  
  await waitFor(() => {
    expect(store.getState().items.items).toHaveLength(5);
  });
});
```

### **API Testing**

```javascript
test('should create item', async () => {
  const formData = new FormData();
  formData.append('title', 'Test Item');
  
  const result = await api.items.createItem(formData);
  expect(result).toHaveProperty('_id');
});
```

This integration provides a robust, scalable foundation for your ReWear application with proper error handling, loading states, and type safety throughout the application. 
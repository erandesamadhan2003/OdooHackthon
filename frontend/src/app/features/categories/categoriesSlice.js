import { createSlice, createSelector } from '@reduxjs/toolkit';

const categoriesSlice = createSlice({
    name: 'categories',
    initialState: {
        selectedCategory: '',
        loading: false,
        error: null
    },
    reducers: {
        setSelectedCategory: (state, action) => {
            state.selectedCategory = action.payload;
        },
        clearSelectedCategory: (state) => {
            state.selectedCategory = '';
        },
        clearError: (state) => {
            state.error = null;
        }
    }
});

// Selector to get unique categories from items
export const selectCategories = createSelector(
    [(state) => state.items.items],
    (items) => {
        if (!items || items.length === 0) return [];
        
        // Extract unique categories and count items
        const categoryMap = new Map();
        
        items.forEach(item => {
            if (item.category) {
                if (categoryMap.has(item.category)) {
                    categoryMap.set(item.category, categoryMap.get(item.category) + 1);
                } else {
                    categoryMap.set(item.category, 1);
                }
            }
        });
        
        // Convert to array and sort by count (descending)
        const categories = Array.from(categoryMap.entries()).map(([name, count]) => ({
            name,
            count,
            image: getCategoryIcon(name)
        }));
        
        return categories.sort((a, b) => b.count - a.count);
    }
);

// Selector to get items filtered by selected category
export const selectItemsByCategory = createSelector(
    [(state) => state.items.items, (state) => state.categories.selectedCategory],
    (items, selectedCategory) => {
        if (!selectedCategory) return items;
        return items.filter(item => item.category === selectedCategory);
    }
);

// Helper function to get category icons
const getCategoryIcon = (categoryName) => {
    const icons = {
        'Clothing': '👕',
        'Shoes': '👟',
        'Accessories': '👜',
        'Electronics': '📱',
        'Books': '📚',
        'Dresses': '👗',
        'Tops & Shirts': '👚',
        'Pants & Jeans': '👖',
        'Skirts': '👗',
        'Jackets & Coats': '🧥',
        'Other': '📦'
    };
    
    return icons[categoryName] || '📦';
};

export const { 
    setSelectedCategory, 
    clearSelectedCategory, 
    clearError 
} = categoriesSlice.actions;

export default categoriesSlice.reducer; 
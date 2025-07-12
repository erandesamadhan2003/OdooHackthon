import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { 
  Search, 
  ShoppingBag, 
  Filter, 
  Grid3X3, 
  List, 
  Heart, 
  Star, 
  SlidersHorizontal,
  ChevronDown,
  MapPin,
  Clock,
  X,
  MessageCircle,
  AlertCircle
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Navbar } from '@/components/layouts/Navbar';
import { Notification } from '@/components/ui/notification';
import { fetchItems, setFilters, clearFilters } from '@/app/features/items/itemsSlice';
import { requestSwap } from '@/app/features/swaps/swapsSlice';
import { selectCategories } from '@/app/features/categories/categoriesSlice';

export const Browse = () => {
  const dispatch = useDispatch();
  const { items, loading, error, filters } = useSelector((state) => state.items);
  const { requestLoading, requestError } = useSelector((state) => state.swaps);
  const categories = useSelector(selectCategories);
  const user = useSelector((state) => state.auth.user);



  // Local state
  const [viewMode, setViewMode] = useState('grid');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [priceRange, setPriceRange] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('latest');
  const [showSwapModal, setShowSwapModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [swapMessage, setSwapMessage] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [notification, setNotification] = useState({ show: false, type: 'success', message: '' });

  // Fetch items on component mount
  useEffect(() => {
    dispatch(fetchItems());
  }, [dispatch]);

  // Price ranges for filtering
  const priceRanges = [
    { id: 'all', name: 'All Prices' },
    { id: 'low', name: 'Under 500 Points' },
    { id: 'medium', name: '500-1000 Points' },
    { id: 'high', name: 'Over 1000 Points' }
  ];

  // Sort options
  const sortOptions = [
    { value: 'latest', label: 'Latest' },
    { value: 'price-low', label: 'Price: Low to High' },
    { value: 'price-high', label: 'Price: High to Low' },
    { value: 'rating', label: 'Highest Rated' }
  ];

  // Helper function to get safe property values
  const getItemProperty = (item, property, fallback = 'N/A') => {
    return item && item[property] !== undefined && item[property] !== null ? item[property] : fallback;
  };

  // Helper function to get item name (handles both 'name' and 'title' properties)
  const getItemName = (item) => {
    return item?.title || item?.name || 'Unnamed Item';
  };

  // Helper function to get item points
  const getItemPoints = (item) => {
    const points = item?.points_value || item?.points || item?.price || 0;
    return typeof points === 'number' ? points : 0;
  };

  // Filter items based on price range
  const filteredItems = items.filter(item => {
    const itemPoints = getItemPoints(item);
    
    if (priceRange === 'all') return true;
    if (priceRange === 'low') return itemPoints < 500;
    if (priceRange === 'medium') return itemPoints >= 500 && itemPoints <= 1000;
    if (priceRange === 'high') return itemPoints > 1000;
    return true;
  });

  // Helper function to get condition color
  const getConditionColor = (condition) => {
    switch (condition?.toLowerCase()) {
      case 'excellent':
        return 'bg-green-100 text-green-700';
      case 'good':
        return 'bg-blue-100 text-blue-700';
      case 'fair':
        return 'bg-yellow-100 text-yellow-700';
      case 'poor':
        return 'bg-red-100 text-red-700';
      default:
        return 'bg-[#EAE4D5] text-[#B6B09F]';
    }
  };

  // Helper function to check if user owns the item
  const isUserOwner = (item) => {
    if (!user || !item) return false;
    const uploadedBy = item.uploaded_by || item.owner || item.user;
    
    // Handle both object and string ID cases
    if (typeof uploadedBy === 'object' && uploadedBy !== null) {
      return user._id === uploadedBy._id;
    }
    return user._id === uploadedBy;
  };

  // Handle swap request
  const handleSwapRequest = async () => {
    if (!user) {
      setNotification({
        show: true,
        type: 'error',
        message: 'Please login to request a swap'
      });
      return;
    }

    if (!swapMessage.trim()) {
      setNotification({
        show: true,
        type: 'error',
        message: 'Please enter a message for your swap request'
      });
      return;
    }

    try {
      const uploadedBy = selectedItem.uploaded_by || selectedItem.owner || selectedItem.user;
      const ownerId = typeof uploadedBy === 'object' && uploadedBy !== null ? uploadedBy._id : uploadedBy;
      
      console.log('Sending swap request:', {
        owner_id: ownerId,
        item_id: selectedItem._id,
        message: swapMessage
      });
      
      await dispatch(requestSwap({
        owner_id: ownerId,
        item_id: selectedItem._id,
        message: swapMessage
      })).unwrap();
      
      setShowSwapModal(false);
      setSelectedItem(null);
      setSwapMessage('');
      setNotification({
        show: true,
        type: 'success',
        message: 'Swap request sent successfully!'
      });
    } catch (error) {
      setNotification({
        show: true,
        type: 'error',
        message: error || 'Failed to send swap request'
      });
    }
  };

  // Handle search with debounce
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  // Debounced search effect
  useEffect(() => {
    const timer = setTimeout(() => {
      const filtersToApply = {
        category: selectedCategory !== 'all' ? selectedCategory : '',
        search: searchTerm,
        sortBy
      };
      
      dispatch(fetchItems(filtersToApply));
    }, 500); // 500ms debounce

    return () => clearTimeout(timer);
  }, [searchTerm, dispatch, selectedCategory, sortBy]);

  // Handle category and sort changes immediately
  useEffect(() => {
    if (selectedCategory !== 'all' || sortBy !== 'latest') {
      const filtersToApply = {
        category: selectedCategory !== 'all' ? selectedCategory : '',
        search: searchTerm,
        sortBy
      };
      
      dispatch(fetchItems(filtersToApply));
    }
  }, [selectedCategory, sortBy, dispatch, searchTerm]);

  // Handle category change
  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
  };

  // Handle price range change
  const handlePriceRangeChange = (e) => {
    setPriceRange(e.target.value);
  };

  // Handle sort change
  const handleSortChange = (e) => {
    setSortBy(e.target.value);
  };

  // Open swap modal
  const openSwapModal = (item) => {
    if (!user) {
      setNotification({
        show: true,
        type: 'error',
        message: 'Please login to request a swap'
      });
      return;
    }
    
    setSelectedItem(item);
    setShowSwapModal(true);
  };

  return (
    <div className="min-h-screen bg-[#F2F2F2]">
      {/* Navbar */}
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search and Filters */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            {/* Search Bar */}
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-[#B6B09F]" />
              <Input
                type="text"
                placeholder="Search for clothes, brands, or styles..."
                value={searchTerm}
                onChange={handleSearchChange}
                className="pl-10 pr-4 py-3 w-full border-[#B6B09F]/30 focus:border-[#B6B09F] focus:ring-1 focus:ring-[#B6B09F]"
              />
            </div>
            
            {/* View Toggle */}
            <div className="flex items-center space-x-2">
              <Button
                variant={viewMode === 'grid' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setViewMode('grid')}
                className={viewMode === 'grid' ? 'bg-black hover:bg-[#B6B09F]' : 'border-[#B6B09F]/30 hover:bg-[#B6B09F] hover:text-white'}
              >
                <Grid3X3 className="h-4 w-4" />
              </Button>
              <Button
                variant={viewMode === 'list' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setViewMode('list')}
                className={viewMode === 'list' ? 'bg-black hover:bg-[#B6B09F]' : 'border-[#B6B09F]/30 hover:bg-[#B6B09F] hover:text-white'}
              >
                <List className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Filter Row */}
          <div className="flex flex-wrap gap-4">
            <div className="flex items-center space-x-2">
              <SlidersHorizontal className="h-4 w-4 text-[#B6B09F]" />
              <span className="text-sm font-medium text-black">Filters:</span>
            </div>
            
            <select
              value={selectedCategory}
              onChange={handleCategoryChange}
              className="px-3 py-2 border border-[#B6B09F]/30 rounded-lg focus:border-[#B6B09F] focus:outline-none text-sm"
            >
              <option value="all">All Categories</option>
              {categories.map(category => (
                <option key={category.name} value={category.name}>{category.name} ({category.count})</option>
              ))}
            </select>
            
            <select
              value={priceRange}
              onChange={handlePriceRangeChange}
              className="px-3 py-2 border border-[#B6B09F]/30 rounded-lg focus:border-[#B6B09F] focus:outline-none text-sm"
            >
              {priceRanges.map(range => (
                <option key={range.id} value={range.id}>{range.name}</option>
              ))}
            </select>

            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                setSelectedCategory('all');
                setPriceRange('all');
                setSearchTerm('');
                setSortBy('latest');
              }}
              className="border-[#B6B09F]/30 text-black hover:bg-[#B6B09F] hover:text-white"
            >
              Clear Filters
            </Button>
          </div>
        </div>

        {/* Results Header */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-black">
            Browse Clothes ({filteredItems.length} items)
          </h1>
          <div className="flex items-center space-x-2">
            <span className="text-sm text-[#B6B09F]">Sort by:</span>
            <select 
              value={sortBy}
              onChange={handleSortChange}
              className="px-3 py-2 border border-[#B6B09F]/30 rounded-lg focus:border-[#B6B09F] focus:outline-none text-sm"
            >
              {sortOptions.map(option => (
                <option key={option.value} value={option.value}>{option.label}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#B6B09F] mx-auto"></div>
            <p className="text-[#B6B09F] mt-4">Loading items...</p>
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="text-center py-12">
            <AlertCircle className="h-12 w-12 text-red-500 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-black mb-2">Error loading items</h3>
            <p className="text-[#B6B09F]">{error}</p>
            <Button
              onClick={() => dispatch(fetchItems())}
              className="mt-4 bg-black hover:bg-[#B6B09F] text-white"
            >
              Try Again
            </Button>
          </div>
        )}

        {/* Items Grid/List */}
        {!loading && !error && (
        <div className={`grid gap-6 ${viewMode === 'grid' ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4' : 'grid-cols-1'}`}>
          {filteredItems.map((item) => (
              <Card key={item._id} className={`bg-white border-[#B6B09F]/20 hover:shadow-lg transition-shadow ${viewMode === 'list' ? 'flex' : ''}`}>
              <CardContent className={`p-4 ${viewMode === 'list' ? 'flex space-x-4' : ''}`}>
                <div className={`${viewMode === 'list' ? 'w-48 h-48' : 'aspect-[3/4]'} bg-[#EAE4D5] rounded-lg mb-4 flex items-center justify-center relative group`}>
                    {item.images && item.images.length > 0 ? (
                      <img 
                        src={item.images[0]} 
                        alt={getItemName(item)}
                        className="w-full h-full object-cover rounded-lg"
                      />
                    ) : (
                      <span className="text-[#B6B09F] text-sm">No Image</span>
                    )}
                  <Button
                    variant="ghost"
                    size="sm"
                      className="absolute top-2 right-2 p-1 opacity-0 group-hover:opacity-100 transition-opacity bg-white/80"
                  >
                    <Heart className="h-4 w-4 text-[#B6B09F]" />
                  </Button>
                </div>
                <div className={`space-y-2 ${viewMode === 'list' ? 'flex-1' : ''}`}>
                      <h3 className="font-semibold text-black">{getItemName(item)}</h3>
                      <p className="text-sm text-[#B6B09F]">{getItemProperty(item, 'description', 'No description available')}</p>
                      
                      {/* Item Details */}
                      <div className="flex flex-wrap gap-2 text-xs">
                        {item.category && (
                          <span className="bg-[#EAE4D5] text-[#B6B09F] px-2 py-1 rounded-full">
                            {item.category}
                          </span>
                        )}
                        {item.type && (
                          <span className="bg-[#F2F2F2] text-gray-600 px-2 py-1 rounded-full">
                            {item.type}
                          </span>
                        )}
                        {item.size && (
                          <span className="bg-[#F2F2F2] text-gray-600 px-2 py-1 rounded-full">
                            Size: {item.size}
                          </span>
                        )}
                      </div>
                      
                  <div className="flex items-center justify-between">
                        <span className="text-lg font-bold text-black">
                          {getItemPoints(item)} Points
                        </span>
                        {item.condition && (
                    <div className="flex items-center space-x-1">
                            <span className={`text-xs px-2 py-1 rounded-full font-medium ${getConditionColor(item.condition)}`}>
                              {item.condition}
                            </span>
                    </div>
                        )}
                  </div>
                  <div className="flex items-center space-x-4 text-sm text-[#B6B09F]">
                    <div className="flex items-center space-x-1">
                        <Clock className="h-3 w-3" />
                        <span>
                          {item.createdAt ? new Date(item.createdAt).toLocaleDateString() : 'Unknown date'}
                        </span>
                    </div>
                      {item.uploaded_by && (
                    <div className="flex items-center space-x-1">
                          <span className="text-xs">by {item.uploaded_by.username || 'Unknown user'}</span>
                        </div>
                      )}
                  </div>
                  <div className="flex space-x-2">
                      <Link to={`/item/${item._id}`} className="flex-1">
                      <Button className="w-full bg-black hover:bg-[#B6B09F] text-white">
                        View Details
                      </Button>
                    </Link>
                    <Button 
                      variant="outline" 
                      size="sm"
                        onClick={() => openSwapModal(item)}
                      className="border-[#B6B09F]/30 text-black hover:bg-[#B6B09F] hover:text-white"
                        disabled={isUserOwner(item)}
                    >
                        {isUserOwner(item) ? 'Your Item' : 'Swap'}
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
          </div>
        )}

        {/* No Results */}
        {!loading && !error && filteredItems.length === 0 && (
          <div className="text-center py-12">
            <div className="text-[#B6B09F] text-6xl mb-4">👗</div>
            <h3 className="text-xl font-semibold text-black mb-2">No items found</h3>
            <p className="text-[#B6B09F]">Try adjusting your search or filters</p>
          </div>
        )}
      </div>

      {/* Swap Modal */}
      {showSwapModal && selectedItem && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-black">Request Swap</h3>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowSwapModal(false)}
                className="p-1"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
            
            <div className="mb-4">
              <h4 className="font-medium text-black mb-2">Item: {getItemName(selectedItem)}</h4>
              <p className="text-sm text-[#B6B09F]">{getItemPoints(selectedItem)} Points</p>
            </div>
            
            <div className="mb-4">
              <label className="block text-sm font-medium text-black mb-2">
                Message to owner:
              </label>
              <textarea
                value={swapMessage}
                onChange={(e) => setSwapMessage(e.target.value)}
                placeholder="Tell the owner why you'd like to swap for this item..."
                className="w-full p-3 border border-[#B6B09F]/30 rounded-lg focus:border-[#B6B09F] focus:outline-none resize-none"
                rows={4}
              />
            </div>
            
            {requestError && (
              <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
                <p className="text-sm text-red-600">{requestError}</p>
              </div>
            )}
            
            <div className="flex space-x-3">
              <Button
                variant="outline"
                onClick={() => setShowSwapModal(false)}
                className="flex-1 border-[#B6B09F]/30 text-black hover:bg-[#B6B09F] hover:text-white"
              >
                Cancel
              </Button>
              <Button
                onClick={handleSwapRequest}
                disabled={requestLoading || !swapMessage.trim()}
                className="flex-1 bg-black hover:bg-[#B6B09F] text-white"
              >
                {requestLoading ? 'Sending...' : 'Send Request'}
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Notification */}
      <Notification
        type={notification.type}
        message={notification.message}
        isVisible={notification.show}
        onClose={() => setNotification({ show: false, type: 'success', message: '' })}
      />
    </div>
  );
};
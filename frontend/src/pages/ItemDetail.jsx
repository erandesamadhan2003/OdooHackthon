import React, { useState, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { 
  ShoppingBag, 
  ArrowLeft, 
  Heart, 
  Star, 
  MapPin, 
  Clock, 
  Package, 
  User,
  MessageCircle,
  Share2,
  ChevronLeft,
  ChevronRight,
  X,
  Coins,
  ArrowUpDown
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Notification } from '@/components/ui/notification';
import { fetchItemById } from '@/app/features/items/itemsSlice';
import { requestSwap } from '@/app/features/swaps/swapsSlice';
import { redeemPoints, getPointsBalance } from '@/app/features/points/pointsSlice';

export const ItemDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  const { currentItem, loading, error } = useSelector((state) => state.items);
  const { requestLoading, requestError } = useSelector((state) => state.swaps);
  const { balance: pointsBalance, redeemLoading, redeemError } = useSelector((state) => state.points);
  const user = useSelector((state) => state.auth.user);

  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isLiked, setIsLiked] = useState(false);
  const [showOptionsModal, setShowOptionsModal] = useState(false);
  const [showSwapModal, setShowSwapModal] = useState(false);
  const [swapMessage, setSwapMessage] = useState('');
  const [notification, setNotification] = useState({ show: false, type: 'success', message: '' });

  // Fetch item data on component mount
  useEffect(() => {
    if (id) {
      dispatch(fetchItemById(id));
    }
  }, [dispatch, id]);

  // Fetch points balance if user is logged in
  useEffect(() => {
    if (user) {
      dispatch(getPointsBalance());
    }
  }, [dispatch, user]);

  const nextImage = () => {
    if (currentItem?.images) {
      setCurrentImageIndex((prev) => 
        prev === currentItem.images.length - 1 ? 0 : prev + 1
      );
    }
  };

  const prevImage = () => {
    if (currentItem?.images) {
      setCurrentImageIndex((prev) => 
        prev === 0 ? currentItem.images.length - 1 : prev - 1
      );
    }
  };

  // Helper function to get item points
  const getItemPoints = (item) => {
    const points = item?.points_value || item?.points || item?.price || 0;
    return typeof points === 'number' ? points : 0;
  };

  // Helper function to check if user owns the item
  const isUserOwner = (item) => {
    if (!user || !item) return false;
    const uploadedBy = item.uploaded_by || item.owner || item.user;
    
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
      const uploadedBy = currentItem.uploaded_by || currentItem.owner || currentItem.user;
      const ownerId = typeof uploadedBy === 'object' && uploadedBy !== null ? uploadedBy._id : uploadedBy;
      
      await dispatch(requestSwap({
        owner_id: ownerId,
        item_id: currentItem._id,
        message: swapMessage
      })).unwrap();
      
      setShowSwapModal(false);
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

  // Handle points redemption
  const handleRedeemPoints = async () => {
    if (!user) {
      setNotification({
        show: true,
        type: 'error',
        message: 'Please login to redeem points'
      });
      return;
    }

    const itemPoints = getItemPoints(currentItem);
    
    if (pointsBalance < itemPoints) {
      setNotification({
        show: true,
        type: 'error',
        message: `Not enough points. You have ${pointsBalance} points, but this item costs ${itemPoints} points.`
      });
      return;
    }

    try {
      await dispatch(redeemPoints({
        item_id: currentItem._id,
        points: itemPoints
      })).unwrap();
      
      setShowOptionsModal(false);
      setNotification({
        show: true,
        type: 'success',
        message: 'Item purchased successfully with points!'
      });
      
      // Refresh points balance
      dispatch(getPointsBalance());
    } catch (error) {
      setNotification({
        show: true,
        type: 'error',
        message: error || 'Failed to redeem points'
      });
    }
  };

  // Open options modal
  const openOptionsModal = () => {
    if (!user) {
      setNotification({
        show: true,
        type: 'error',
        message: 'Please login to interact with items'
      });
      return;
    }
    
    setShowOptionsModal(true);
  };

  // Open swap modal
  const openSwapModal = () => {
    setShowOptionsModal(false);
    setShowSwapModal(true);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#F2F2F2] flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#B6B09F] mx-auto"></div>
          <p className="text-[#B6B09F] mt-4">Loading item details...</p>
        </div>
      </div>
    );
  }

  if (error || !currentItem) {
    return (
      <div className="min-h-screen bg-[#F2F2F2] flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-xl font-semibold text-black mb-2">Item not found</h2>
          <p className="text-[#B6B09F] mb-4">{error || 'The item you are looking for does not exist.'}</p>
          <Button onClick={() => navigate('/browse')} className="bg-black hover:bg-[#B6B09F] text-white">
            Back to Browse
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F2F2F2]">
      {/* Header */}
      <header className="bg-white border-b border-[#B6B09F]/20 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Link to="/" className="flex items-center">
                <ShoppingBag className="h-8 w-8 text-[#B6B09F]" />
                <span className="ml-2 text-xl font-bold text-black">ReWear</span>
              </Link>
            </div>
            <nav className="hidden md:flex space-x-8">
              <Link to="/" className="text-black hover:text-[#B6B09F] transition-colors">Home</Link>
              <Link to="/browse" className="text-black hover:text-[#B6B09F] transition-colors">Browse</Link>
              <Link to="/profile" className="text-black hover:text-[#B6B09F] transition-colors">Profile</Link>
              <Link to="/login" className="text-black hover:text-[#B6B09F] transition-colors">Login</Link>
              <Link to="/signup" className="text-black hover:text-[#B6B09F] transition-colors">Sign Up</Link>
            </nav>
          </div>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back Button */}
        <Button
          variant="outline"
          onClick={() => navigate(-1)}
          className="mb-6 border-[#B6B09F]/30 text-black hover:bg-[#B6B09F] hover:text-white"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Browse
        </Button>

        {/* Main Content */}
        <div className="bg-white rounded-lg shadow-lg border border-[#B6B09F]/20 overflow-hidden">
          {/* Title Section */}
          <div className="p-6 border-b border-[#B6B09F]/20">
            <h1 className="text-2xl font-bold text-black text-center">Item Details</h1>
          </div>

          {/* Product Content */}
          <div className="p-6">
            {/* Main Layout - Image and Details */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
              {/* Left Side - Main Product Image */}
              <div>
                <div className="relative">
                  <div className="aspect-[4/5] bg-[#EAE4D5] rounded-lg overflow-hidden">
                    {currentItem.images && currentItem.images.length > 0 ? (
                      <img 
                        src={currentItem.images[currentImageIndex]} 
                        alt={currentItem.title}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <span className="text-[#B6B09F]">No Image Available</span>
                      </div>
                    )}
                    
                    {/* Navigation Arrows */}
                    {currentItem.images && currentItem.images.length > 1 && (
                      <>
                        <button
                          onClick={prevImage}
                          className="absolute left-3 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white rounded-full p-2 shadow-lg"
                        >
                          <ChevronLeft className="w-5 h-5 text-black" />
                        </button>
                        <button
                          onClick={nextImage}
                          className="absolute right-3 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white rounded-full p-2 shadow-lg"
                        >
                          <ChevronRight className="w-5 h-5 text-black" />
                        </button>
                      </>
                    )}
                    
                    {/* Like Button */}
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setIsLiked(!isLiked)}
                      className="absolute top-4 right-4 bg-white/80 hover:bg-white rounded-full p-2"
                    >
                      <Heart className={`h-5 w-5 ${isLiked ? 'fill-red-500 text-red-500' : 'text-black'}`} />
                    </Button>
                  </div>
                  
                  {/* Image Counter */}
                  {currentItem.images && currentItem.images.length > 1 && (
                    <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-black/50 text-white px-3 py-1 rounded-full text-sm">
                      {currentImageIndex + 1} / {currentItem.images.length}
                    </div>
                  )}
                </div>
              </div>

              {/* Right Side - Product Details */}
              <div className="space-y-6">
                {/* Product Name */}
                <div>
                  <h2 className="text-xl font-bold text-black mb-2">Product Name</h2>
                  <h3 className="text-2xl font-semibold text-black">{currentItem.title}</h3>
                </div>

                {/* Description */}
                <div>
                  <h3 className="text-lg font-semibold text-black mb-3">Description</h3>
                  <div className="bg-[#EAE4D5]/30 rounded-lg p-4">
                    <p className="text-black leading-relaxed">{currentItem.description || 'No description available'}</p>
                  </div>
                </div>

                {/* Price and Rating */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Package className="h-5 w-5 text-[#B6B09F]" />
                    <span className="text-2xl font-bold text-black">{getItemPoints(currentItem)} Points</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                    <span className="text-lg font-semibold text-black">4.8</span>
                  </div>
                </div>

                {/* Item Details */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <p className="text-sm text-[#B6B09F]">Category</p>
                    <p className="font-semibold text-black">{currentItem.category || 'Uncategorized'}</p>
                  </div>
                  <div className="space-y-2">
                    <p className="text-sm text-[#B6B09F]">Size</p>
                    <p className="font-semibold text-black">{currentItem.size || 'Not specified'}</p>
                  </div>
                  <div className="space-y-2">
                    <p className="text-sm text-[#B6B09F]">Brand</p>
                    <p className="font-semibold text-black">{currentItem.brand || 'Not specified'}</p>
                  </div>
                  <div className="space-y-2">
                    <p className="text-sm text-[#B6B09F]">Condition</p>
                    <p className="font-semibold text-black">{currentItem.condition || 'Not specified'}</p>
                  </div>
                </div>

                {/* Location and Time */}
                <div className="flex items-center space-x-4 text-sm text-[#B6B09F]">
                  <div className="flex items-center space-x-1">
                    <Clock className="h-4 w-4" />
                    <span>{currentItem.createdAt ? new Date(currentItem.createdAt).toLocaleDateString() : 'Unknown date'}</span>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex space-x-3">
                  <Button 
                    onClick={openOptionsModal}
                    disabled={isUserOwner(currentItem)}
                    className="flex-1 bg-black hover:bg-[#B6B09F] text-white py-3"
                  >
                    {isUserOwner(currentItem) ? 'Your Item' : 'Swap/Redeem'}
                  </Button>
                  <Button 
                    variant="outline" 
                    className="border-[#B6B09F]/30 text-black hover:bg-[#B6B09F] hover:text-white"
                  >
                    <MessageCircle className="h-4 w-4 mr-2" />
                    Message
                  </Button>
                  <Button 
                    variant="outline" 
                    className="border-[#B6B09F]/30 text-black hover:bg-[#B6B09F] hover:text-white"
                  >
                    <Share2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>

            {/* Additional Product Images */}
            {currentItem.images && currentItem.images.length > 1 && (
              <div>
                <h3 className="text-lg font-semibold text-black mb-4">Product Images</h3>
                <div className="grid grid-cols-4 gap-4">
                  {currentItem.images.map((image, index) => (
                    <div 
                      key={index}
                      className={`aspect-square bg-[#EAE4D5] rounded-lg overflow-hidden cursor-pointer border-2 ${
                        currentImageIndex === index ? 'border-[#B6B09F]' : 'border-transparent'
                      }`}
                      onClick={() => setCurrentImageIndex(index)}
                    >
                      <img 
                        src={image} 
                        alt={`${currentItem.title} ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Seller Information */}
            <Card className="mt-8 border-[#B6B09F]/20">
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold text-black mb-4">Seller Information</h3>
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-[#EAE4D5] rounded-full flex items-center justify-center">
                    <User className="h-6 w-6 text-[#B6B09F]" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-black">
                      {currentItem.uploaded_by?.username || 'Unknown User'}
                    </h4>
                    <div className="flex items-center space-x-4 text-sm text-[#B6B09F]">
                      <div className="flex items-center space-x-1">
                        <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                        <span>4.9</span>
                      </div>
                      <span>23 items sold</span>
                    </div>
                  </div>
                  <Button 
                    variant="outline" 
                    className="border-[#B6B09F]/30 text-black hover:bg-[#B6B09F] hover:text-white"
                  >
                    View Profile
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Options Modal */}
      {showOptionsModal && currentItem && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-black">Choose Action</h3>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowOptionsModal(false)}
                className="p-1"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
            
            <div className="mb-6">
              <h4 className="font-medium text-black mb-2">Item: {currentItem.title}</h4>
              <p className="text-sm text-[#B6B09F] mb-2">{getItemPoints(currentItem)} Points</p>
              <p className="text-sm text-[#B6B09F]">Your Points Balance: {pointsBalance}</p>
            </div>
            
            <div className="space-y-3">
              <Button
                onClick={openSwapModal}
                className="w-full bg-black hover:bg-[#B6B09F] text-white flex items-center justify-center space-x-2"
              >
                <ArrowUpDown className="h-4 w-4" />
                <span>Direct Swap Request</span>
              </Button>
              
              <Button
                onClick={handleRedeemPoints}
                disabled={redeemLoading || pointsBalance < getItemPoints(currentItem)}
                className={`w-full flex items-center justify-center space-x-2 ${
                  pointsBalance < getItemPoints(currentItem) 
                    ? 'bg-gray-300 text-gray-500 cursor-not-allowed' 
                    : 'bg-green-600 hover:bg-green-700 text-white'
                }`}
              >
                <Coins className="h-4 w-4" />
                <span>
                  {redeemLoading ? 'Redeeming...' : 'Redeem with Points'}
                </span>
              </Button>
            </div>
            
            {redeemError && (
              <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg">
                <p className="text-sm text-red-600">{redeemError}</p>
              </div>
            )}
            
            {pointsBalance < getItemPoints(currentItem) && (
              <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                <p className="text-sm text-yellow-700">
                  Not enough points. You need {getItemPoints(currentItem) - pointsBalance} more points to redeem this item.
                </p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Swap Modal */}
      {showSwapModal && currentItem && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-black">Direct Swap Request</h3>
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
              <h4 className="font-medium text-black mb-2">Item: {currentItem.title}</h4>
              <p className="text-sm text-[#B6B09F]">{getItemPoints(currentItem)} Points</p>
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
                {requestLoading ? 'Sending...' : 'Send Swap Request'}
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

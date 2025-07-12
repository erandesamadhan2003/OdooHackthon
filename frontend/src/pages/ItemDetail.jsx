import React, { useState } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
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
  ChevronRight
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

export const ItemDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isLiked, setIsLiked] = useState(false);

  // Sample item data - in real app, this would come from API
  const item = {
    id: 1,
    name: 'Vintage Denim Jacket',
    description: 'Beautiful vintage denim jacket in excellent condition. Perfect for casual wear or layering. Features classic blue wash with minimal wear. Originally from a premium brand, this piece has been well-maintained and is ready for a new owner. The jacket has a relaxed fit and works great with both casual and semi-formal outfits.',
    points: 450,
    images: [
      '/api/placeholder/500/600',
      '/api/placeholder/500/600',
      '/api/placeholder/500/600',
      '/api/placeholder/500/600',
      '/api/placeholder/500/600'
    ],
    rating: 4.8,
    location: 'New York, NY',
    timePosted: '2 hours ago',
    category: 'Jackets',
    size: 'M',
    condition: 'Like New',
    brand: 'Levi\'s',
    color: 'Blue',
    seller: {
      name: 'Sarah Johnson',
      rating: 4.9,
      itemsSold: 23,
      avatar: '/api/placeholder/50/50'
    }
  };

  const nextImage = () => {
    setCurrentImageIndex((prev) => 
      prev === item.images.length - 1 ? 0 : prev + 1
    );
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => 
      prev === 0 ? item.images.length - 1 : prev - 1
    );
  };

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
            <h1 className="text-2xl font-bold text-black text-center">Item Listing</h1>
          </div>

          {/* Search Bar */}
          <div className="p-6 border-b border-[#B6B09F]/20">
            <div className="relative">
              <input
                type="text"
                placeholder="Search within this listing..."
                className="w-full px-4 py-3 border border-[#B6B09F]/30 rounded-lg focus:border-[#B6B09F] focus:outline-none"
              />
              <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                <div className="w-6 h-6 bg-[#B6B09F] rounded-full flex items-center justify-center">
                  <span className="text-white text-xs">🔍</span>
                </div>
              </div>
            </div>
          </div>

          {/* Product Content */}
          <div className="p-6">
            {/* Main Layout - Image and Details */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
              {/* Left Side - Main Product Image */}
              <div>
                <div className="relative">
                  <div className="aspect-[4/5] bg-[#EAE4D5] rounded-lg overflow-hidden">
                    <img 
                      src={item.images[currentImageIndex]} 
                      alt={item.name}
                      className="w-full h-full object-cover"
                    />
                    {/* Navigation Arrows */}
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
                  <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-black/50 text-white px-3 py-1 rounded-full text-sm">
                    {currentImageIndex + 1} / {item.images.length}
                  </div>
                </div>
              </div>

              {/* Right Side - Product Details */}
              <div className="space-y-6">
                {/* Product Name */}
                <div>
                  <h2 className="text-xl font-bold text-black mb-2">Product name</h2>
                  <h3 className="text-2xl font-semibold text-black">{item.name}</h3>
                </div>

                {/* Description */}
                <div>
                  <h3 className="text-lg font-semibold text-black mb-3">Description</h3>
                  <div className="bg-[#EAE4D5]/30 rounded-lg p-4">
                    <p className="text-black leading-relaxed">{item.description}</p>
                  </div>
                </div>

                {/* Price and Rating */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Package className="h-5 w-5 text-[#B6B09F]" />
                    <span className="text-2xl font-bold text-black">{item.points} Points</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                    <span className="text-lg font-semibold text-black">{item.rating}</span>
                  </div>
                </div>

                {/* Item Details */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <p className="text-sm text-[#B6B09F]">Category</p>
                    <p className="font-semibold text-black">{item.category}</p>
                  </div>
                  <div className="space-y-2">
                    <p className="text-sm text-[#B6B09F]">Size</p>
                    <p className="font-semibold text-black">{item.size}</p>
                  </div>
                  <div className="space-y-2">
                    <p className="text-sm text-[#B6B09F]">Condition</p>
                    <p className="font-semibold text-black">{item.condition}</p>
                  </div>
                  <div className="space-y-2">
                    <p className="text-sm text-[#B6B09F]">Brand</p>
                    <p className="font-semibold text-black">{item.brand}</p>
                  </div>
                </div>

                {/* Location and Time */}
                <div className="flex items-center space-x-4 text-sm text-[#B6B09F]">
                  <div className="flex items-center space-x-1">
                    <MapPin className="h-4 w-4" />
                    <span>{item.location}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Clock className="h-4 w-4" />
                    <span>{item.timePosted}</span>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex space-x-3">
                  <Button className="flex-1 bg-black hover:bg-[#B6B09F] text-white py-3">
                    Request Swap
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
            <div>
              <h3 className="text-lg font-semibold text-black mb-4">Product Images</h3>
              <div className="grid grid-cols-4 gap-4">
                {item.images.map((image, index) => (
                  <div 
                    key={index}
                    className={`aspect-square bg-[#EAE4D5] rounded-lg overflow-hidden cursor-pointer border-2 ${
                      currentImageIndex === index ? 'border-[#B6B09F]' : 'border-transparent'
                    }`}
                    onClick={() => setCurrentImageIndex(index)}
                  >
                    <img 
                      src={image} 
                      alt={`${item.name} ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Seller Information */}
            <Card className="mt-8 border-[#B6B09F]/20">
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold text-black mb-4">Seller Information</h3>
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-[#EAE4D5] rounded-full flex items-center justify-center">
                    <User className="h-6 w-6 text-[#B6B09F]" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-black">{item.seller.name}</h4>
                    <div className="flex items-center space-x-4 text-sm text-[#B6B09F]">
                      <div className="flex items-center space-x-1">
                        <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                        <span>{item.seller.rating}</span>
                      </div>
                      <span>{item.seller.itemsSold} items sold</span>
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
    </div>
  );
};

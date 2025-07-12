import React, { useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { 
  Upload, 
  Camera, 
  X, 
  Plus,
  Edit3,
  Save,
  ArrowLeft,
  Search,
  Package,
  Eye,
  Heart,
  Star,
  MapPin,
  Clock
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Navbar } from '@/components/layouts/Navbar';

export const ProductDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [mainImage, setMainImage] = useState(null);
  const [additionalImages, setAdditionalImages] = useState([]);
  
  const [productData, setProductData] = useState({
    name: 'Vintage Denim Jacket',
    description: 'Beautiful vintage denim jacket in excellent condition. Perfect for casual wear or layering. Features classic blue wash with minimal wear. Originally from a premium brand, this piece has been well-maintained and is ready for a new owner. The jacket has a relaxed fit and works great with both casual and semi-formal outfits. Made from high-quality denim material that gets better with age.',
    category: 'Jackets',
    size: 'M',
    condition: 'Like New',
    brand: 'Levi\'s',
    color: 'Blue',
    points: 450,
    status: 'available'
  });

  // Previous listings data
  const previousListings = [
    { id: 1, name: 'Designer Handbag', points: 680, image: '/api/placeholder/200/250', status: 'sold', views: 45, likes: 12 },
    { id: 2, name: 'Silk Blouse', points: 320, image: '/api/placeholder/200/250', status: 'available', views: 18, likes: 8 },
    { id: 3, name: 'Leather Boots', points: 750, image: '/api/placeholder/200/250', status: 'available', views: 31, likes: 9 },
    { id: 4, name: 'Wool Sweater', points: 560, image: '/api/placeholder/200/250', status: 'sold', views: 22, likes: 6 }
  ];

  const handleImageUpload = (event, isMain = false) => {
    const files = Array.from(event.target.files);
    files.forEach(file => {
      const reader = new FileReader();
      reader.onload = (e) => {
        if (isMain) {
          setMainImage(e.target.result);
        } else {
          setAdditionalImages(prev => [...prev, e.target.result]);
        }
      };
      reader.readAsDataURL(file);
    });
  };

  const removeImage = (index) => {
    setAdditionalImages(prev => prev.filter((_, i) => i !== index));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProductData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSave = () => {
    setIsEditing(false);
    // Here you would typically save to backend
    console.log('Product saved:', productData);
  };

  const toggleAvailability = () => {
    setProductData(prev => ({
      ...prev,
      status: prev.status === 'available' ? 'unavailable' : 'available'
    }));
  };

  return (
    <div className="min-h-screen bg-[#F2F2F2]">
      {/* Header */}
      <Navbar />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back Button */}
        <Button
          variant="outline"
          onClick={() => navigate(-1)}
          className="mb-6 border-[#B6B09F]/30 text-black hover:bg-[#B6B09F] hover:text-white"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back
        </Button>

        {/* Main Content */}
        <div className="bg-white rounded-lg shadow-lg border border-[#B6B09F]/20 overflow-hidden">
          {/* Title Section */}
          <div className="p-6 border-b border-[#B6B09F]/20">
            <h1 className="text-2xl font-bold text-black text-center">Product Detail Page</h1>
            <p className="text-[#B6B09F] text-center mt-1">Edit and manage your product listing</p>
          </div>

          {/* Search Bar */}
          <div className="p-6 border-b border-[#B6B09F]/20">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-[#B6B09F]" />
              <Input
                type="text"
                placeholder="Search product details..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-3 w-full border-[#B6B09F]/30 focus:border-[#B6B09F] focus:ring-1 focus:ring-[#B6B09F]"
              />
            </div>
          </div>

          {/* Product Content */}
          <div className="p-6">
            {/* Main Layout - Images and Description */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
              {/* Left Side - Add Images */}
              <div>
                <h3 className="text-lg font-semibold text-black mb-4">Add Images</h3>
                <div className="space-y-4">
                  {/* Main Image */}
                  <div className="relative">
                    <div className="aspect-[4/5] bg-[#EAE4D5] rounded-lg border-2 border-dashed border-[#B6B09F]/50 flex items-center justify-center overflow-hidden">
                      {mainImage ? (
                        <img 
                          src={mainImage} 
                          alt="Main product" 
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="text-center">
                          <Camera className="w-12 h-12 text-[#B6B09F] mx-auto mb-2" />
                          <p className="text-[#B6B09F] text-sm">Click to add main image</p>
                        </div>
                      )}
                    </div>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => handleImageUpload(e, true)}
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                    />
                  </div>

                  {/* Additional Images Grid */}
                  <div className="grid grid-cols-4 gap-3">
                    {[...Array(4)].map((_, index) => (
                      <div key={index} className="relative">
                        <div className="aspect-square bg-[#EAE4D5] rounded-lg border-2 border-dashed border-[#B6B09F]/50 flex items-center justify-center overflow-hidden">
                          {additionalImages[index] ? (
                            <>
                              <img 
                                src={additionalImages[index]} 
                                alt={`Additional ${index + 1}`} 
                                className="w-full h-full object-cover"
                              />
                              <Button
                                type="button"
                                variant="destructive"
                                size="sm"
                                onClick={() => removeImage(index)}
                                className="absolute top-1 right-1 p-1 h-6 w-6"
                              >
                                <X className="h-3 w-3" />
                              </Button>
                            </>
                          ) : (
                            <Plus className="w-6 h-6 text-[#B6B09F]" />
                          )}
                        </div>
                        {!additionalImages[index] && (
                          <input
                            type="file"
                            accept="image/*"
                            onChange={(e) => handleImageUpload(e, false)}
                            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                          />
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Right Side - Add Product Description */}
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-black">Add Product Description</h3>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setIsEditing(!isEditing)}
                    className="border-[#B6B09F]/30 text-black hover:bg-[#B6B09F] hover:text-white"
                  >
                    <Edit3 className="h-4 w-4 mr-2" />
                    {isEditing ? 'Cancel' : 'Edit'}
                  </Button>
                </div>

                <div className="space-y-4">
                  {/* Product Name */}
                  <div>
                    <label className="block text-sm font-medium text-black mb-1">Product Name</label>
                    {isEditing ? (
                      <Input
                        name="name"
                        value={productData.name}
                        onChange={handleInputChange}
                        className="border-[#B6B09F]/30 focus:border-[#B6B09F]"
                      />
                    ) : (
                      <div className="px-3 py-2 bg-[#EAE4D5]/30 rounded-lg border border-[#B6B09F]/20">
                        <span className="text-black font-medium">{productData.name}</span>
                      </div>
                    )}
                  </div>

                  {/* Description */}
                  <div>
                    <label className="block text-sm font-medium text-black mb-1">Description</label>
                    {isEditing ? (
                      <textarea
                        name="description"
                        value={productData.description}
                        onChange={handleInputChange}
                        rows={8}
                        className="w-full px-3 py-2 border border-[#B6B09F]/30 rounded-lg focus:border-[#B6B09F] focus:outline-none focus:ring-1 focus:ring-[#B6B09F]"
                      />
                    ) : (
                      <div className="px-3 py-2 bg-[#EAE4D5]/30 rounded-lg border border-[#B6B09F]/20 min-h-[200px]">
                        <p className="text-black leading-relaxed">{productData.description}</p>
                      </div>
                    )}
                  </div>

                  {/* Product Details Grid */}
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-black mb-1">Category</label>
                      <div className="px-3 py-2 bg-[#EAE4D5]/30 rounded-lg border border-[#B6B09F]/20">
                        <span className="text-black">{productData.category}</span>
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-black mb-1">Size</label>
                      <div className="px-3 py-2 bg-[#EAE4D5]/30 rounded-lg border border-[#B6B09F]/20">
                        <span className="text-black">{productData.size}</span>
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-black mb-1">Condition</label>
                      <div className="px-3 py-2 bg-[#EAE4D5]/30 rounded-lg border border-[#B6B09F]/20">
                        <span className="text-black">{productData.condition}</span>
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-black mb-1">Points</label>
                      <div className="px-3 py-2 bg-[#EAE4D5]/30 rounded-lg border border-[#B6B09F]/20">
                        <span className="text-black font-bold">{productData.points} Points</span>
                      </div>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex space-x-3 pt-4">
                    {isEditing && (
                      <Button
                        onClick={handleSave}
                        className="flex-1 bg-black hover:bg-[#B6B09F] text-white"
                      >
                        <Save className="h-4 w-4 mr-2" />
                        Save Changes
                      </Button>
                    )}
                    <Button
                      onClick={toggleAvailability}
                      className={`flex-1 ${
                        productData.status === 'available' 
                          ? 'bg-green-600 hover:bg-green-700' 
                          : 'bg-gray-600 hover:bg-gray-700'
                      } text-white`}
                    >
                      <Package className="h-4 w-4 mr-2" />
                      {productData.status === 'available' ? 'Available/Swap' : 'Mark Available'}
                    </Button>
                  </div>
                </div>
              </div>
            </div>

            {/* Previous Listings Section */}
            <div className="mt-8">
              <h3 className="text-lg font-semibold text-black mb-4">Previous Listings</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {previousListings.map((item) => (
                  <Card key={item.id} className="bg-[#F2F2F2] border-[#B6B09F]/20 hover:shadow-lg transition-shadow">
                    <CardContent className="p-4">
                      <div className="aspect-square bg-[#EAE4D5] rounded-lg mb-3 flex items-center justify-center relative">
                        <span className="text-[#B6B09F] text-sm">Image</span>
                        <div className={`absolute top-2 right-2 px-2 py-1 rounded-full text-xs font-medium ${
                          item.status === 'available' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                        }`}>
                          {item.status}
                        </div>
                      </div>
                      <div className="space-y-2">
                        <h4 className="font-semibold text-black text-sm">{item.name}</h4>
                        <p className="text-lg font-bold text-black">{item.points} Points</p>
                        <div className="flex items-center justify-between text-xs text-[#B6B09F]">
                          <div className="flex items-center space-x-1">
                            <Eye className="h-3 w-3" />
                            <span>{item.views}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Heart className="h-3 w-3" />
                            <span>{item.likes}</span>
                          </div>
                        </div>
                        <Link to={`/product-detail/${item.id}`} className="block">
                          <Button size="sm" className="w-full bg-black hover:bg-[#B6B09F] text-white text-xs">
                            View Details
                          </Button>
                        </Link>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

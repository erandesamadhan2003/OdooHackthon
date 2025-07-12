import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  ShoppingBag, 
  Upload, 
  Camera, 
  X, 
  Plus,
  MapPin,
  DollarSign,
  Package,
  Info,
  ArrowLeft,
  Check
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';

export const ItemListing = () => {
  const navigate = useNavigate();
  const [mainImage, setMainImage] = useState(null);
  const [additionalImages, setAdditionalImages] = useState([]);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    category: '',
    size: '',
    condition: '',
    brand: '',
    color: '',
    points: '',
    location: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const categories = [
    { value: '', label: 'Select Category' },
    { value: 'dresses', label: 'Dresses' },
    { value: 'tops', label: 'Tops & Shirts' },
    { value: 'pants', label: 'Pants & Jeans' },
    { value: 'skirts', label: 'Skirts' },
    { value: 'jackets', label: 'Jackets & Coats' },
    { value: 'accessories', label: 'Accessories' }
  ];

  const sizes = [
    { value: '', label: 'Select Size' },
    { value: 'xs', label: 'XS' },
    { value: 's', label: 'S' },
    { value: 'm', label: 'M' },
    { value: 'l', label: 'L' },
    { value: 'xl', label: 'XL' },
    { value: 'xxl', label: 'XXL' }
  ];

  const conditions = [
    { value: '', label: 'Select Condition' },
    { value: 'new', label: 'New with tags' },
    { value: 'like-new', label: 'Like new' },
    { value: 'good', label: 'Good condition' },
    { value: 'fair', label: 'Fair condition' }
  ];

  const handleMainImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setMainImage(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAdditionalImageUpload = (event) => {
    const files = Array.from(event.target.files);
    files.forEach(file => {
      const reader = new FileReader();
      reader.onload = (e) => {
        setAdditionalImages(prev => [...prev, e.target.result]);
      };
      reader.readAsDataURL(file);
    });
  };

  const removeAdditionalImage = (index) => {
    setAdditionalImages(prev => prev.filter((_, i) => i !== index));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      alert('Item listed successfully!');
      navigate('/browse');
    }, 2000);
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
          Back
        </Button>

        <form onSubmit={handleSubmit}>
          <div className="bg-white rounded-lg shadow-lg border border-[#B6B09F]/20 p-6">
            {/* Header Title */}
            <div className="mb-6">
              <h1 className="text-2xl font-bold text-black">Item Listing</h1>
              <p className="text-[#B6B09F] mt-1">Add photos and details about your item</p>
            </div>

            {/* Main Content Grid - Following Wireframe Layout */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
              {/* Left Side - Main Product Image */}
              <div>
                <label className="block text-sm font-medium text-black mb-3">
                  Product Image *
                </label>
                <div className="relative">
                  <div className="w-full aspect-[4/5] bg-[#EAE4D5] rounded-lg border-2 border-dashed border-[#B6B09F]/50 flex items-center justify-center overflow-hidden">
                    {mainImage ? (
                      <img 
                        src={mainImage} 
                        alt="Main product" 
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="text-center">
                        <Upload className="w-16 h-16 text-[#B6B09F] mx-auto mb-4" />
                        <p className="text-[#B6B09F] text-lg">Product Image</p>
                      </div>
                    )}
                  </div>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleMainImageUpload}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                    required
                  />
                </div>
              </div>

              {/* Right Side - Product Name and Description */}
              <div className="space-y-6">
                {/* Product Name */}
                <div>
                  <label className="block text-sm font-medium text-black mb-2">
                    Product name *
                  </label>
                  <Input
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="Enter product name"
                    className="border-[#B6B09F]/30 focus:border-[#B6B09F] text-lg py-3"
                    required
                  />
                </div>

                {/* Description */}
                <div>
                  <label className="block text-sm font-medium text-black mb-2">
                    Description *
                  </label>
                  <div className="border border-[#B6B09F]/30 rounded-lg p-4 bg-[#EAE4D5]/20">
                    <textarea
                      name="description"
                      value={formData.description}
                      onChange={handleInputChange}
                      placeholder="Describe your item - condition, style, fit, etc."
                      rows={8}
                      className="w-full bg-transparent border-none focus:outline-none resize-none text-black placeholder-[#B6B09F]"
                      required
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Additional Product Images */}
            <div className="mb-8">
              <label className="block text-sm font-medium text-black mb-3">
                Product Images
              </label>
              <div className="grid grid-cols-4 gap-4">
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
                            onClick={() => removeAdditionalImage(index)}
                            className="absolute top-2 right-2 p-1 h-6 w-6"
                          >
                            <X className="h-3 w-3" />
                          </Button>
                        </>
                      ) : (
                        <Plus className="w-8 h-8 text-[#B6B09F]" />
                      )}
                    </div>
                    {!additionalImages[index] && (
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleAdditionalImageUpload}
                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                        multiple
                      />
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Product Details Form */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              {/* Category */}
              <div>
                <label className="block text-sm font-medium text-black mb-2">
                  Category *
                </label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-[#B6B09F]/30 rounded-lg focus:border-[#B6B09F] focus:outline-none"
                  required
                >
                  {categories.map(cat => (
                    <option key={cat.value} value={cat.value}>{cat.label}</option>
                  ))}
                </select>
              </div>

              {/* Size */}
              <div>
                <label className="block text-sm font-medium text-black mb-2">
                  Size *
                </label>
                <select
                  name="size"
                  value={formData.size}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-[#B6B09F]/30 rounded-lg focus:border-[#B6B09F] focus:outline-none"
                  required
                >
                  {sizes.map(size => (
                    <option key={size.value} value={size.value}>{size.label}</option>
                  ))}
                </select>
              </div>

              {/* Condition */}
              <div>
                <label className="block text-sm font-medium text-black mb-2">
                  Condition *
                </label>
                <select
                  name="condition"
                  value={formData.condition}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-[#B6B09F]/30 rounded-lg focus:border-[#B6B09F] focus:outline-none"
                  required
                >
                  {conditions.map(condition => (
                    <option key={condition.value} value={condition.value}>{condition.label}</option>
                  ))}
                </select>
              </div>

              {/* Brand */}
              <div>
                <label className="block text-sm font-medium text-black mb-2">
                  Brand
                </label>
                <Input
                  name="brand"
                  value={formData.brand}
                  onChange={handleInputChange}
                  placeholder="e.g., Nike, Zara"
                  className="border-[#B6B09F]/30 focus:border-[#B6B09F]"
                />
              </div>

              {/* Color */}
              <div>
                <label className="block text-sm font-medium text-black mb-2">
                  Color
                </label>
                <Input
                  name="color"
                  value={formData.color}
                  onChange={handleInputChange}
                  placeholder="e.g., Blue, Red"
                  className="border-[#B6B09F]/30 focus:border-[#B6B09F]"
                />
              </div>

              {/* Points Value */}
              <div>
                <label className="block text-sm font-medium text-black mb-2">
                  Points Value *
                </label>
                <div className="relative">
                  <Package className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-[#B6B09F]" />
                  <Input
                    name="points"
                    type="number"
                    value={formData.points}
                    onChange={handleInputChange}
                    placeholder="e.g., 450"
                    className="pl-10 border-[#B6B09F]/30 focus:border-[#B6B09F]"
                    required
                  />
                </div>
              </div>
            </div>

            {/* Location */}
            <div className="mb-8">
              <label className="block text-sm font-medium text-black mb-2">
                Location *
              </label>
              <div className="relative max-w-md">
                <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-[#B6B09F]" />
                <Input
                  name="location"
                  value={formData.location}
                  onChange={handleInputChange}
                  placeholder="City, State"
                  className="pl-10 border-[#B6B09F]/30 focus:border-[#B6B09F]"
                  required
                />
              </div>
            </div>

            {/* Submit Button */}
            <div className="flex justify-end">
              <Button
                type="submit"
                disabled={isSubmitting}
                className="px-8 py-3 bg-black hover:bg-[#B6B09F] text-white text-lg font-medium"
              >
                {isSubmitting ? (
                  <div className="flex items-center">
                    <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent mr-2"></div>
                    Listing Item...
                  </div>
                ) : (
                  <>
                    <Check className="w-5 h-5 mr-2" />
                    List Item for Swap
                  </>
                )}
              </Button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

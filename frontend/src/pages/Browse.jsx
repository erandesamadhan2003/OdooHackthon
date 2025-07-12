import React, { useState } from 'react';
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
  Clock
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';

export const Browse = () => {
  const [viewMode, setViewMode] = useState('grid');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [priceRange, setPriceRange] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  const categories = [
    { id: 'all', name: 'All Categories' },
    { id: 'dresses', name: 'Dresses' },
    { id: 'tops', name: 'Tops & Shirts' },
    { id: 'pants', name: 'Pants & Jeans' },
    { id: 'skirts', name: 'Skirts' },
    { id: 'jackets', name: 'Jackets & Coats' },
    { id: 'accessories', name: 'Accessories' }
  ];

  const priceRanges = [
    { id: 'all', name: 'All Prices' },
    { id: 'low', name: 'Under 500 Points' },
    { id: 'medium', name: '500-1000 Points' },
    { id: 'high', name: 'Over 1000 Points' }
  ];

  const clothingItems = [
    { id: 1, name: 'Vintage Denim Jacket', points: 450, image: '/api/placeholder/300/400', rating: 4.8, location: 'New York', timePosted: '2 hours ago', category: 'jackets' },
    { id: 2, name: 'Floral Summer Dress', points: 320, image: '/api/placeholder/300/400', rating: 4.9, location: 'Los Angeles', timePosted: '5 hours ago', category: 'dresses' },
    { id: 3, name: 'Leather Ankle Boots', points: 680, image: '/api/placeholder/300/400', rating: 4.7, location: 'Chicago', timePosted: '1 day ago', category: 'accessories' },
    { id: 4, name: 'Cashmere Sweater', points: 890, image: '/api/placeholder/300/400', rating: 4.8, location: 'Miami', timePosted: '2 days ago', category: 'tops' },
    { id: 5, name: 'Designer Jeans', points: 750, image: '/api/placeholder/300/400', rating: 4.6, location: 'Seattle', timePosted: '3 days ago', category: 'pants' },
    { id: 6, name: 'Silk Blouse', points: 420, image: '/api/placeholder/300/400', rating: 4.7, location: 'Boston', timePosted: '4 days ago', category: 'tops' },
    { id: 7, name: 'Wool Winter Coat', points: 1200, image: '/api/placeholder/300/400', rating: 4.9, location: 'Denver', timePosted: '5 days ago', category: 'jackets' },
    { id: 8, name: 'Midi Skirt', points: 380, image: '/api/placeholder/300/400', rating: 4.5, location: 'Austin', timePosted: '1 week ago', category: 'skirts' },
    { id: 9, name: 'Leather Handbag', points: 650, image: '/api/placeholder/300/400', rating: 4.8, location: 'Portland', timePosted: '1 week ago', category: 'accessories' },
    { id: 10, name: 'Knit Cardigan', points: 480, image: '/api/placeholder/300/400', rating: 4.6, location: 'Nashville', timePosted: '2 weeks ago', category: 'tops' },
    { id: 11, name: 'Evening Gown', points: 950, image: '/api/placeholder/300/400', rating: 4.9, location: 'Atlanta', timePosted: '2 weeks ago', category: 'dresses' },
    { id: 12, name: 'Casual Sneakers', points: 290, image: '/api/placeholder/300/400', rating: 4.4, location: 'Phoenix', timePosted: '3 weeks ago', category: 'accessories' }
  ];

  const filteredItems = clothingItems.filter(item => {
    const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesPrice = priceRange === 'all' || 
      (priceRange === 'low' && item.points < 500) ||
      (priceRange === 'medium' && item.points >= 500 && item.points <= 1000) ||
      (priceRange === 'high' && item.points > 1000);
    
    return matchesCategory && matchesSearch && matchesPrice;
  });

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
              <Link to="/browse" className="text-[#B6B09F] font-medium">Browse</Link>
              <Link to="/profile" className="text-black hover:text-[#B6B09F] transition-colors">Profile</Link>
              <Link to="/login" className="text-black hover:text-[#B6B09F] transition-colors">Login</Link>
              <Link to="/signup" className="text-black hover:text-[#B6B09F] transition-colors">Sign Up</Link>
            </nav>
          </div>
        </div>
      </header>

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
                onChange={(e) => setSearchTerm(e.target.value)}
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
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-3 py-2 border border-[#B6B09F]/30 rounded-lg focus:border-[#B6B09F] focus:outline-none text-sm"
            >
              {categories.map(category => (
                <option key={category.id} value={category.id}>{category.name}</option>
              ))}
            </select>
            
            <select
              value={priceRange}
              onChange={(e) => setPriceRange(e.target.value)}
              className="px-3 py-2 border border-[#B6B09F]/30 rounded-lg focus:border-[#B6B09F] focus:outline-none text-sm"
            >
              {priceRanges.map(range => (
                <option key={range.id} value={range.id}>{range.name}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Results Header */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-black">
            Browse Clothes ({filteredItems.length} items)
          </h1>
          <div className="flex items-center space-x-2">
            <span className="text-sm text-[#B6B09F]">Sort by:</span>
            <select className="px-3 py-2 border border-[#B6B09F]/30 rounded-lg focus:border-[#B6B09F] focus:outline-none text-sm">
              <option>Latest</option>
              <option>Price: Low to High</option>
              <option>Price: High to Low</option>
              <option>Highest Rated</option>
            </select>
          </div>
        </div>

        {/* Items Grid/List */}
        <div className={`grid gap-6 ${viewMode === 'grid' ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4' : 'grid-cols-1'}`}>
          {filteredItems.map((item) => (
            <Card key={item.id} className={`bg-white border-[#B6B09F]/20 hover:shadow-lg transition-shadow ${viewMode === 'list' ? 'flex' : ''}`}>
              <CardContent className={`p-4 ${viewMode === 'list' ? 'flex space-x-4' : ''}`}>
                <div className={`${viewMode === 'list' ? 'w-48 h-48' : 'aspect-[3/4]'} bg-[#EAE4D5] rounded-lg mb-4 flex items-center justify-center relative group`}>
                  <span className="text-[#B6B09F] text-sm">Image</span>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="absolute top-2 right-2 p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <Heart className="h-4 w-4 text-[#B6B09F]" />
                  </Button>
                </div>
                <div className={`space-y-2 ${viewMode === 'list' ? 'flex-1' : ''}`}>
                  <h3 className="font-semibold text-black">{item.name}</h3>
                  <div className="flex items-center justify-between">
                    <span className="text-lg font-bold text-black">{item.points} Points</span>
                    <div className="flex items-center space-x-1">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      <span className="text-sm text-[#B6B09F]">{item.rating}</span>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4 text-sm text-[#B6B09F]">
                    <div className="flex items-center space-x-1">
                      <MapPin className="h-3 w-3" />
                      <span>{item.location}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Clock className="h-3 w-3" />
                      <span>{item.timePosted}</span>
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <Link to={`/item/${item.id}`} className="flex-1">
                      <Button className="w-full bg-black hover:bg-[#B6B09F] text-white">
                        View Details
                      </Button>
                    </Link>
                    <Button 
                      variant="outline" 
                      size="sm"
                      className="border-[#B6B09F]/30 text-black hover:bg-[#B6B09F] hover:text-white"
                    >
                      Swap
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Load More Button */}
        {filteredItems.length > 0 && (
          <div className="text-center mt-8">
            <Button
              variant="outline"
              className="border-[#B6B09F]/30 text-black hover:bg-[#B6B09F] hover:text-white"
            >
              Load More Items
            </Button>
          </div>
        )}

        {/* No Results */}
        {filteredItems.length === 0 && (
          <div className="text-center py-12">
            <div className="text-[#B6B09F] text-6xl mb-4">👗</div>
            <h3 className="text-xl font-semibold text-black mb-2">No items found</h3>
            <p className="text-[#B6B09F]">Try adjusting your search or filters</p>
          </div>
        )}
      </div>
    </div>
  );
};

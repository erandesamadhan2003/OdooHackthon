import React from 'react';
import { Link } from 'react-router-dom';
import { Search, ShoppingBag, User, Heart, Star, ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';

export const Home = () => {
  const categories = [
    { name: 'Dresses', image: '/api/placeholder/200/200' },
    { name: 'Tops & Shirts', image: '/api/placeholder/200/200' },
    { name: 'Pants & Jeans', image: '/api/placeholder/200/200' },
    { name: 'Skirts', image: '/api/placeholder/200/200' },
    { name: 'Jackets & Coats', image: '/api/placeholder/200/200' },
    { name: 'Accessories', image: '/api/placeholder/200/200' }
  ];

  const featuredItems = [
    { id: 1, name: 'Vintage Denim Jacket', price: '450 Points', image: '/api/placeholder/300/400', rating: 4.8 },
    { id: 2, name: 'Floral Summer Dress', price: '320 Points', image: '/api/placeholder/300/400', rating: 4.9 },
    { id: 3, name: 'Leather Ankle Boots', price: '680 Points', image: '/api/placeholder/300/400', rating: 4.7 },
    { id: 4, name: 'Cashmere Sweater', price: '890 Points', image: '/api/placeholder/300/400', rating: 4.8 }
  ];

  const products = [
    { id: 1, name: 'Vintage Blazer', price: '550 Points', image: '/api/placeholder/250/350', rating: 4.6 },
    { id: 2, name: 'Silk Scarf', price: '280 Points', image: '/api/placeholder/250/350', rating: 4.7 },
    { id: 3, name: 'Designer Jeans', price: '750 Points', image: '/api/placeholder/250/350', rating: 4.8 },
    { id: 4, name: 'Wool Winter Coat', price: '1200 Points', image: '/api/placeholder/250/350', rating: 4.9 },
    { id: 5, name: 'Summer Blouse', price: '350 Points', image: '/api/placeholder/250/350', rating: 4.5 },
    { id: 6, name: 'Leather Handbag', price: '650 Points', image: '/api/placeholder/250/350', rating: 4.7 },
    { id: 7, name: 'Knit Cardigan', price: '480 Points', image: '/api/placeholder/250/350', rating: 4.6 },
    { id: 8, name: 'Midi Skirt', price: '420 Points', image: '/api/placeholder/250/350', rating: 4.8 }
  ];

  return (
    <div className="min-h-screen bg-[#F2F2F2]">
      {/* Header */}
      <header className="bg-white border-b border-[#B6B09F]/20 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <ShoppingBag className="h-8 w-8 text-[#B6B09F]" />
              <span className="ml-2 text-xl font-bold text-black">ReWear</span>
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

      {/* Hero Section */}
      <section className="bg-[#EAE4D5] px-4 sm:px-6 lg:px-8 py-16">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-black mb-6">
            Exchange Your Clothes, Reduce Waste
          </h1>
          <p className="text-xl text-[#B6B09F] mb-8 max-w-2xl mx-auto">
            Transform your wardrobe sustainably. Swap clothes directly with others or use our point-based system to give your unused garments a second life.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-black hover:bg-[#B6B09F] text-white px-8 py-3 text-lg">
              Start Swapping
            </Button>
            <Button size="lg" variant="outline" className="px-8 py-3 text-lg border-black text-black hover:bg-black hover:text-white">
              Browse Clothes
            </Button>
          </div>
        </div>
      </section>

      {/* Search Bar */}
      <section className="px-4 sm:px-6 lg:px-8 py-8 bg-white">
        <div className="max-w-2xl mx-auto">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-[#B6B09F]" />
            <Input
              type="text"
              placeholder="Search for clothes, brands, or styles..."
              className="pl-10 pr-4 py-3 w-full border-[#B6B09F]/30 focus:border-[#B6B09F] focus:ring-1 focus:ring-[#B6B09F]"
            />
          </div>
        </div>
      </section>

      {/* Carousel of Featured Items */}
      <section className="px-4 sm:px-6 lg:px-8 py-16 bg-[#F2F2F2]">
        <div className="max-w-6xl mx-auto">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold text-black">Featured clothes</h2>
            <div className="flex space-x-2">
              <Button variant="outline" size="sm" className="p-2 border-[#B6B09F] text-[#B6B09F] hover:bg-[#B6B09F] hover:text-white">
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="sm" className="p-2 border-[#B6B09F] text-[#B6B09F] hover:bg-[#B6B09F] hover:text-white">
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredItems.map((item) => (
              <Card key={item.id} className="bg-white border-[#B6B09F]/20 hover:shadow-lg transition-shadow">
                <CardContent className="p-4">
                  <div className="aspect-[3/4] bg-[#EAE4D5] rounded-lg mb-4 flex items-center justify-center">
                    <span className="text-[#B6B09F] text-sm">Image</span>
                  </div>
                  <div className="space-y-2">
                    <h3 className="font-semibold text-black">{item.name}</h3>
                    <div className="flex items-center justify-between">
                      <span className="text-lg font-bold text-black">{item.price}</span>
                      <div className="flex items-center space-x-1">
                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        <span className="text-sm text-[#B6B09F]">{item.rating}</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="px-4 sm:px-6 lg:px-8 py-16 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-black mb-12">Shop by Clothing Category</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {categories.map((category, index) => (
              <Card key={index} className="bg-[#F2F2F2] border-[#B6B09F]/20 hover:shadow-lg transition-shadow cursor-pointer">
                <CardContent className="p-4">
                  <div className="aspect-square bg-[#EAE4D5] rounded-lg mb-4 flex items-center justify-center">
                    <span className="text-[#B6B09F] text-sm">Image</span>
                  </div>
                  <h3 className="font-semibold text-center text-black">{category.name}</h3>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Product Listings */}
      <section className="px-4 sm:px-6 lg:px-8 py-16 bg-[#F2F2F2]">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-black mb-12">Latest Clothing Listings</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {products.map((product) => (
              <Card key={product.id} className="bg-white border-[#B6B09F]/20 hover:shadow-lg transition-shadow">
                <CardContent className="p-4">
                  <div className="aspect-[3/4] bg-[#EAE4D5] rounded-lg mb-4 flex items-center justify-center relative group">
                    <span className="text-[#B6B09F] text-sm">Image</span>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="absolute top-2 right-2 p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <Heart className="h-4 w-4 text-[#B6B09F]" />
                    </Button>
                  </div>
                  <div className="space-y-2">
                    <h3 className="font-semibold text-black">{product.name}</h3>
                    <div className="flex items-center justify-between">
                      <span className="text-lg font-bold text-black">{product.price}</span>
                      <div className="flex items-center space-x-1">
                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        <span className="text-sm text-[#B6B09F]">{product.rating}</span>
                      </div>
                    </div>
                    <Button className="w-full bg-black hover:bg-[#B6B09F] text-white">
                      View Details
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black text-white py-8">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="flex items-center justify-center mb-4">
              <ShoppingBag className="h-6 w-6 mr-2" />
              <span className="text-lg font-semibold">ReWear</span>
            </div>
            <p className="text-[#B6B09F]">
              © 2025 ReWear. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};
import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Search, ShoppingBag, Heart, Star, ChevronLeft, ChevronRight, Users, Shield, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Navbar } from '@/components/layouts/Navbar';
import { ItemCard } from '@/components/items/ItemCard';
import { FilterBar } from '@/components/items/FilterBar';
import { CategorySection } from '@/components/categories/CategorySection';
import { fetchItems, setFilters, clearFilters } from '@/app/features/items/itemsSlice';
import { selectItemsByCategory } from '@/app/features/categories/categoriesSlice';

export const Home = () => {
  const dispatch = useDispatch();
  const { items, loading, error, filters } = useSelector((state) => state.items);
  const selectedCategory = useSelector((state) => state.categories.selectedCategory);
  const filteredItems = useSelector(selectItemsByCategory);

  // Fetch items on component mount
  useEffect(() => {
    dispatch(fetchItems());
  }, [dispatch]);

  // Handle filter changes
  const handleFilterChange = (newFilters) => {
    dispatch(setFilters(newFilters));
    dispatch(fetchItems({ ...filters, ...newFilters }));
  };

  // Handle clear filters
  const handleClearFilters = () => {
    dispatch(clearFilters());
    dispatch(fetchItems());
  };

  // Handle item click
  const handleItemClick = (item) => {
    // Navigate to item detail page or open modal
    console.log('Item clicked:', item);
  };

  // Get featured items (first 4 items from filtered results)
  const featuredItems = filteredItems.slice(0, 4);

  return (
    <div className="min-h-screen bg-[#F2F2F2]">
      {/* Navbar */}
      <Navbar />

      {/* Hero Section */}
      <section className="bg-[#EAE4D5] px-4 sm:px-6 lg:px-8 py-16">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-black mb-6">
            Exchange Your Clothes,
            <span className="text-[#B6B09F]"> Reduce Waste</span>
          </h1>
          <p className="text-xl text-[#B6B09F] mb-8 max-w-2xl mx-auto">
            Transform your wardrobe sustainably. Swap clothes directly with others or use our point-based system to give your unused garments a second life.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/signup">
              <Button size="lg" className="bg-black hover:bg-[#B6B09F] text-white px-8 py-3 text-lg">
                Start Swapping
              </Button>
            </Link>
            <Link to="/browse">
              <Button size="lg" variant="outline" className="px-8 py-3 text-lg border-black text-black hover:bg-black hover:text-white">
                Browse Clothes
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Filter Bar */}
      <FilterBar 
        filters={filters}
        onFilterChange={handleFilterChange}
        onClearFilters={handleClearFilters}
      />

      {/* Featured Items Section */}
      <section className="px-4 sm:px-6 lg:px-8 py-16 bg-[#F2F2F2]">
        <div className="max-w-6xl mx-auto">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold text-black">
              {selectedCategory ? `Featured ${selectedCategory} Items` : 'Featured Items'}
            </h2>
            <div className="flex space-x-2">
              <Button variant="outline" size="sm" className="p-2 border-[#B6B09F] text-[#B6B09F] hover:bg-[#B6B09F] hover:text-white">
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="sm" className="p-2 border-[#B6B09F] text-[#B6B09F] hover:bg-[#B6B09F] hover:text-white">
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
          
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[...Array(4)].map((_, index) => (
                <Card key={index} className="bg-white border-[#B6B09F]/20 animate-pulse">
                  <CardContent className="p-4">
                    <div className="aspect-square bg-gray-200 rounded-lg mb-4"></div>
                    <div className="space-y-2">
                      <div className="h-4 bg-gray-200 rounded"></div>
                      <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : error ? (
            <div className="text-center py-8">
              <p className="text-red-600">Error loading items: {error}</p>
              <Button onClick={() => dispatch(fetchItems())} className="mt-4">
                Try Again
              </Button>
            </div>
          ) : featuredItems.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {featuredItems.map((item) => (
                <ItemCard 
                  key={item._id} 
                  item={item} 
                  onItemClick={handleItemClick}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <p className="text-[#B6B09F]">
                {selectedCategory 
                  ? `No ${selectedCategory} items available` 
                  : 'No featured items available'
                }
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Categories Section */}
      <CategorySection />

      {/* Features Section */}
      <section className="px-4 sm:px-6 lg:px-8 py-16 bg-[#EAE4D5]">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-black mb-12">
            Why Choose ReWear?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="text-center border-0 shadow-lg bg-white/80 backdrop-blur-sm">
              <CardHeader>
                <div className="mx-auto w-16 h-16 bg-[#B6B09F]/20 rounded-full flex items-center justify-center mb-4">
                  <Users className="h-8 w-8 text-[#B6B09F]" />
                </div>
                <CardTitle className="text-xl font-semibold text-black">
                  Sustainable Fashion
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-[#B6B09F]">
                  Join our community committed to sustainable fashion. Reduce waste by giving clothes a second life through buying and selling.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="text-center border-0 shadow-lg bg-white/80 backdrop-blur-sm">
              <CardHeader>
                <div className="mx-auto w-16 h-16 bg-[#B6B09F]/20 rounded-full flex items-center justify-center mb-4">
                  <Shield className="h-8 w-8 text-[#B6B09F]" />
                </div>
                <CardTitle className="text-xl font-semibold text-black">
                  Secure Trading
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-[#B6B09F]">
                  Trade with confidence. Our secure platform ensures safe transactions and protects both buyers and sellers.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="text-center border-0 shadow-lg bg-white/80 backdrop-blur-sm">
              <CardHeader>
                <div className="mx-auto w-16 h-16 bg-[#B6B09F]/20 rounded-full flex items-center justify-center mb-4">
                  <Zap className="h-8 w-8 text-[#B6B09F]" />
                </div>
                <CardTitle className="text-xl font-semibold text-black">
                  Easy Swapping
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-[#B6B09F]">
                  Simple and intuitive platform to swap, buy, or sell your clothes. List items quickly and discover unique pieces.
                </CardDescription>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* All Items Section */}
      <section className="px-4 sm:px-6 lg:px-8 py-16 bg-[#F2F2F2]">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-black mb-12">
            {selectedCategory ? `${selectedCategory} Items` : 'Latest Clothing Listings'}
          </h2>
          
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[...Array(8)].map((_, index) => (
                <Card key={index} className="bg-white border-[#B6B09F]/20 animate-pulse">
                  <CardContent className="p-4">
                    <div className="aspect-square bg-gray-200 rounded-lg mb-4"></div>
                    <div className="space-y-2">
                      <div className="h-4 bg-gray-200 rounded"></div>
                      <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : error ? (
            <div className="text-center py-8">
              <p className="text-red-600">Error loading items: {error}</p>
              <Button onClick={() => dispatch(fetchItems())} className="mt-4">
                Try Again
              </Button>
            </div>
          ) : filteredItems.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {filteredItems.map((item) => (
                <ItemCard 
                  key={item._id} 
                  item={item} 
                  onItemClick={handleItemClick}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <p className="text-[#B6B09F]">
                {selectedCategory 
                  ? `No ${selectedCategory} items available` 
                  : 'No items available'
                }
              </p>
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="px-4 sm:px-6 lg:px-8 py-16 bg-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-black mb-6">
            Ready to Get Started?
          </h2>
          <p className="text-xl text-[#B6B09F] mb-8">
            Join thousands of fashion lovers who are already trading clothes sustainably with ReWear.
          </p>
          <Link to="/signup">
            <Button size="lg" className="bg-black hover:bg-[#B6B09F] text-white px-8 py-3 text-lg">
              Start Trading Today
            </Button>
          </Link>
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
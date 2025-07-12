import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CategoryCard } from './CategoryCard';
import { 
    selectCategories, 
    selectItemsByCategory,
    setSelectedCategory, 
    clearSelectedCategory 
} from '@/app/features/categories/categoriesSlice';
import { X, Filter, ShoppingBag } from 'lucide-react';

export const CategorySection = () => {
    const dispatch = useDispatch();
    const categories = useSelector(selectCategories);
    const selectedCategory = useSelector((state) => state.categories.selectedCategory);
    const itemsByCategory = useSelector(selectItemsByCategory);

    const handleCategoryClick = (category) => {
        if (selectedCategory === category.name) {
            dispatch(clearSelectedCategory());
        } else {
            dispatch(setSelectedCategory(category.name));
        }
    };

    const handleClearCategory = () => {
        dispatch(clearSelectedCategory());
    };

    return (
        <section className="px-4 sm:px-6 lg:px-8 py-16 bg-white">
            <div className="max-w-6xl mx-auto">
                {/* Section Header */}
                <div className="text-center mb-12">
                    <h2 className="text-3xl font-bold text-black mb-4">
                        Shop by Category
                    </h2>
                    <p className="text-[#B6B09F] text-lg max-w-2xl mx-auto">
                        Discover items organized by category. Click on a category to filter items.
                    </p>
                </div>

                {/* Selected Category Info */}
                {selectedCategory && (
                    <div className="mb-8">
                        <Card className="bg-[#EAE4D5]/30 border-[#B6B09F]/30">
                            <CardContent className="p-6">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-4">
                                        <div className="w-12 h-12 bg-[#B6B09F] rounded-full flex items-center justify-center">
                                            <Filter className="w-6 h-6 text-white" />
                                        </div>
                                        <div>
                                            <h3 className="text-xl font-semibold text-black">
                                                {selectedCategory}
                                            </h3>
                                            <p className="text-[#B6B09F]">
                                                {itemsByCategory.length} items available
                                            </p>
                                        </div>
                                    </div>
                                    <Button
                                        variant="outline"
                                        onClick={handleClearCategory}
                                        className="border-[#B6B09F]/30 text-[#B6B09F] hover:bg-[#B6B09F] hover:text-white"
                                    >
                                        <X className="w-4 h-4 mr-2" />
                                        Clear Filter
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                )}

                {/* Categories Grid */}
                {categories.length > 0 ? (
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
                        {categories.map((category) => (
                            <CategoryCard
                                key={category.name}
                                category={category}
                                onCategoryClick={handleCategoryClick}
                                isSelected={selectedCategory === category.name}
                            />
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-12">
                        <div className="w-16 h-16 bg-[#EAE4D5] rounded-full flex items-center justify-center mx-auto mb-4">
                            <ShoppingBag className="w-8 h-8 text-[#B6B09F]" />
                        </div>
                        <h3 className="text-lg font-semibold text-black mb-2">
                            No Categories Available
                        </h3>
                        <p className="text-[#B6B09F]">
                            Categories will appear here once items are added to the platform.
                        </p>
                    </div>
                )}

                {/* Category Summary */}
                {categories.length > 0 && (
                    <div className="mt-12 pt-8 border-t border-[#B6B09F]/20">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <div className="text-center">
                                <div className="text-3xl font-bold text-black mb-2">
                                    {categories.length}
                                </div>
                                <p className="text-[#B6B09F]">Categories</p>
                            </div>
                            <div className="text-center">
                                <div className="text-3xl font-bold text-black mb-2">
                                    {categories.reduce((total, cat) => total + cat.count, 0)}
                                </div>
                                <p className="text-[#B6B09F]">Total Items</p>
                            </div>
                            <div className="text-center">
                                <div className="text-3xl font-bold text-black mb-2">
                                    {categories.length > 0 ? Math.round(
                                        categories.reduce((total, cat) => total + cat.count, 0) / categories.length
                                    ) : 0}
                                </div>
                                <p className="text-[#B6B09F]">Avg Items/Category</p>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </section>
    );
}; 
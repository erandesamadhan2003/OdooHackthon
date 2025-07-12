import React, { useState } from 'react';
import { Search, Filter, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export const FilterBar = ({ filters, onFilterChange, onClearFilters }) => {
    const [isExpanded, setIsExpanded] = useState(false);

    const categories = ['Clothing', 'Shoes', 'Accessories', 'Electronics', 'Books', 'Other'];
    const sizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL', 'One Size'];
    const conditions = ['Excellent', 'Good', 'Fair', 'Poor'];

    const handleFilterChange = (key, value) => {
        onFilterChange({ [key]: value });
    };

    const hasActiveFilters = Object.values(filters).some(value => value !== '');

    return (
        <div className="bg-white border-b border-[#B6B09F]/20 p-4">
            <div className="max-w-7xl mx-auto">
                {/* Search Bar */}
                <div className="flex items-center gap-4 mb-4">
                    <div className="relative flex-1">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#B6B09F] w-4 h-4" />
                        <Input
                            type="text"
                            placeholder="Search items..."
                            value={filters.search}
                            onChange={(e) => handleFilterChange('search', e.target.value)}
                            className="pl-10 border-[#B6B09F]/30 focus:border-[#B6B09F] focus:ring-[#B6B09F]/20"
                        />
                    </div>
                    <Button
                        variant="outline"
                        onClick={() => setIsExpanded(!isExpanded)}
                        className="border-[#B6B09F]/30 text-black hover:bg-[#B6B09F] hover:text-white"
                    >
                        <Filter className="w-4 h-4 mr-2" />
                        Filters
                    </Button>
                    {hasActiveFilters && (
                        <Button
                            variant="outline"
                            onClick={onClearFilters}
                            className="border-red-300 text-red-600 hover:bg-red-50"
                        >
                            <X className="w-4 h-4 mr-2" />
                            Clear
                        </Button>
                    )}
                </div>

                {/* Filter Options */}
                {isExpanded && (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4 border-t border-[#B6B09F]/20">
                        {/* Category Filter */}
                        <div>
                            <label className="block text-sm font-medium text-black mb-2">
                                Category
                            </label>
                            <select
                                value={filters.category}
                                onChange={(e) => handleFilterChange('category', e.target.value)}
                                className="w-full p-2 border border-[#B6B09F]/30 rounded-lg focus:border-[#B6B09F] focus:ring-[#B6B09F]/20"
                            >
                                <option value="">All Categories</option>
                                {categories.map(category => (
                                    <option key={category} value={category}>
                                        {category}
                                    </option>
                                ))}
                            </select>
                        </div>

                        {/* Size Filter */}
                        <div>
                            <label className="block text-sm font-medium text-black mb-2">
                                Size
                            </label>
                            <select
                                value={filters.size}
                                onChange={(e) => handleFilterChange('size', e.target.value)}
                                className="w-full p-2 border border-[#B6B09F]/30 rounded-lg focus:border-[#B6B09F] focus:ring-[#B6B09F]/20"
                            >
                                <option value="">All Sizes</option>
                                {sizes.map(size => (
                                    <option key={size} value={size}>
                                        {size}
                                    </option>
                                ))}
                            </select>
                        </div>

                        {/* Condition Filter */}
                        <div>
                            <label className="block text-sm font-medium text-black mb-2">
                                Condition
                            </label>
                            <select
                                value={filters.condition}
                                onChange={(e) => handleFilterChange('condition', e.target.value)}
                                className="w-full p-2 border border-[#B6B09F]/30 rounded-lg focus:border-[#B6B09F] focus:ring-[#B6B09F]/20"
                            >
                                <option value="">All Conditions</option>
                                {conditions.map(condition => (
                                    <option key={condition} value={condition}>
                                        {condition}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>
                )}

                {/* Active Filters Display */}
                {hasActiveFilters && (
                    <div className="flex flex-wrap gap-2 mt-4">
                        {Object.entries(filters).map(([key, value]) => {
                            if (value) {
                                return (
                                    <span
                                        key={key}
                                        className="inline-flex items-center gap-1 bg-[#EAE4D5] text-[#B6B09F] px-3 py-1 rounded-full text-sm"
                                    >
                                        {key}: {value}
                                        <button
                                            onClick={() => handleFilterChange(key, '')}
                                            className="ml-1 hover:text-black"
                                        >
                                            <X className="w-3 h-3" />
                                        </button>
                                    </span>
                                );
                            }
                            return null;
                        })}
                    </div>
                )}
            </div>
        </div>
    );
}; 
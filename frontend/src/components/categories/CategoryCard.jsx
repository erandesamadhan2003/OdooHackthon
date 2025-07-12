import React from 'react';
import { Card, CardContent } from '@/components/ui/card';

export const CategoryCard = ({ category, onCategoryClick, isSelected = false }) => {
    const { name, count, image } = category;

    return (
        <Card 
            className={`cursor-pointer transition-all duration-300 hover:shadow-lg hover:scale-[1.02] border-[#B6B09F]/20 hover:border-[#B6B09F]/40 ${
                isSelected ? 'border-[#B6B09F] bg-[#EAE4D5]/50' : ''
            }`}
            onClick={() => onCategoryClick && onCategoryClick(category)}
        >
            <CardContent className="p-4">
                {/* Category Icon */}
                <div className="aspect-square overflow-hidden rounded-lg mb-4 relative group">
                    <div className="w-full h-full bg-[#EAE4D5] flex items-center justify-center">
                        <span className="text-4xl group-hover:scale-110 transition-transform duration-300">
                            {image}
                        </span>
                    </div>
                    
                    {/* Item Count Badge */}
                    <div className="absolute top-2 right-2 bg-[#B6B09F] text-white px-2 py-1 rounded-full text-xs font-medium">
                        {count}
                    </div>
                </div>

                {/* Category Name */}
                <h3 className="font-semibold text-center text-black text-lg group-hover:text-[#B6B09F] transition-colors">
                    {name}
                </h3>

                {/* Item Count Text */}
                <p className="text-center text-[#B6B09F] text-sm mt-1">
                    {count} {count === 1 ? 'item' : 'items'}
                </p>
            </CardContent>
        </Card>
    );
}; 
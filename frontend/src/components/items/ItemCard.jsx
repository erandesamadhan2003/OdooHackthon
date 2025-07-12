import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Heart, Star, User } from 'lucide-react';

export const ItemCard = ({ item, onItemClick }) => {
    const {
        _id,
        title,
        description,
        category,
        type,
        size,
        condition,
        images,
        points_value,
        uploaded_by,
        status
    } = item;

    const mainImage = images && images.length > 0 ? images[0] : '/placeholder-item.jpg';

    const getConditionColor = (condition) => {
        switch (condition?.toLowerCase()) {
            case 'excellent':
                return 'text-green-600';
            case 'good':
                return 'text-blue-600';
            case 'fair':
                return 'text-yellow-600';
            case 'poor':
                return 'text-red-600';
            default:
                return 'text-gray-600';
        }
    };

    const getConditionIcon = (condition) => {
        switch (condition?.toLowerCase()) {
            case 'excellent':
                return <Star className="w-4 h-4 text-green-600" />;
            case 'good':
                return <Star className="w-4 h-4 text-blue-600" />;
            case 'fair':
                return <Star className="w-4 h-4 text-yellow-600" />;
            case 'poor':
                return <Star className="w-4 h-4 text-red-600" />;
            default:
                return <Star className="w-4 h-4 text-gray-600" />;
        }
    };

    return (
        <Card 
            className="group cursor-pointer transition-all duration-300 hover:shadow-lg hover:scale-[1.02] border-[#B6B09F]/20 hover:border-[#B6B09F]/40"
            onClick={() => onItemClick && onItemClick(item)}
        >
            <div className="relative">
                {/* Item Image */}
                <div className="aspect-square overflow-hidden rounded-t-lg">
                    <img
                        src={mainImage}
                        alt={title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        onError={(e) => {
                            e.target.src = '/placeholder-item.jpg';
                        }}
                    />
                </div>

                {/* Status Badge */}
                {status !== 'available' && (
                    <div className="absolute top-2 right-2 bg-black/80 text-white px-2 py-1 rounded-full text-xs font-medium">
                        {status}
                    </div>
                )}

                {/* Points Badge */}
                <div className="absolute top-2 left-2 bg-[#B6B09F] text-white px-2 py-1 rounded-full text-xs font-medium flex items-center gap-1">
                    <span>{points_value}</span>
                    <span>pts</span>
                </div>

                {/* Favorite Button */}
                <button className="absolute top-2 right-2 bg-white/90 hover:bg-white p-1.5 rounded-full transition-colors opacity-0 group-hover:opacity-100">
                    <Heart className="w-4 h-4 text-gray-600 hover:text-red-500 transition-colors" />
                </button>
            </div>

            <CardContent className="p-4">
                {/* Item Title */}
                <h3 className="font-semibold text-black text-lg mb-2 line-clamp-2 group-hover:text-[#B6B09F] transition-colors">
                    {title}
                </h3>

                {/* Item Description */}
                {description && (
                    <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                        {description}
                    </p>
                )}

                {/* Item Details */}
                <div className="space-y-2 mb-3">
                    {/* Category and Type */}
                    <div className="flex items-center gap-2 text-sm">
                        <span className="bg-[#EAE4D5] text-[#B6B09F] px-2 py-1 rounded-full text-xs font-medium">
                            {category}
                        </span>
                        {type && (
                            <span className="bg-[#F2F2F2] text-gray-600 px-2 py-1 rounded-full text-xs">
                                {type}
                            </span>
                        )}
                    </div>

                    {/* Size and Condition */}
                    <div className="flex items-center justify-between text-sm">
                        {size && (
                            <span className="text-gray-600">
                                Size: <span className="font-medium">{size}</span>
                            </span>
                        )}
                        {condition && (
                            <div className="flex items-center gap-1">
                                {getConditionIcon(condition)}
                                <span className={`font-medium ${getConditionColor(condition)}`}>
                                    {condition}
                                </span>
                            </div>
                        )}
                    </div>
                </div>

                {/* Uploader Info */}
                {uploaded_by && (
                    <div className="flex items-center gap-2 pt-2 border-t border-gray-100">
                        <div className="w-6 h-6 rounded-full overflow-hidden bg-[#EAE4D5] flex items-center justify-center">
                            {uploaded_by.profile_photo ? (
                                <img
                                    src={uploaded_by.profile_photo}
                                    alt={uploaded_by.username}
                                    className="w-full h-full object-cover"
                                />
                            ) : (
                                <User className="w-3 h-3 text-[#B6B09F]" />
                            )}
                        </div>
                        <span className="text-xs text-gray-600">
                            {uploaded_by.username}
                        </span>
                    </div>
                )}
            </CardContent>
        </Card>
    );
}; 
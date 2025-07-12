import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Camera, 
  Upload, 
  User, 
  Mail, 
  Coins, 
  History, 
  Settings, 
  Edit3,
  Star,
  ArrowUpDown,
  Calendar,
  Check,
  X,
  Plus,
  Eye,
  Heart,
  Package,
  ShoppingCart,
  Clock
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Navbar } from '@/components/layouts/Navbar';

export const Profile = () => {
  const [profileImage, setProfileImage] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [userInfo, setUserInfo] = useState({
    name: 'xyz',
    email: 'xyz@email.com',
    joinDate: 'January 2024',
    totalPoints: 1250,
    itemsSwapped: 23,
    rating: 4.8
  });

  // Mock data for user's listings
  const myListings = [
    { id: 1, name: 'Vintage Denim Jacket', points: 450, image: '/api/placeholder/200/250', status: 'active', views: 23, likes: 5 },
    { id: 2, name: 'Designer Handbag', points: 680, image: '/api/placeholder/200/250', status: 'active', views: 45, likes: 12 },
    { id: 3, name: 'Silk Blouse', points: 320, image: '/api/placeholder/200/250', status: 'sold', views: 18, likes: 8 },
    { id: 4, name: 'Leather Boots', points: 750, image: '/api/placeholder/200/250', status: 'active', views: 31, likes: 9 }
  ];

  // Mock data for user's purchases
  const myPurchases = [
    { id: 5, name: 'Cashmere Sweater', points: 890, image: '/api/placeholder/200/250', purchaseDate: '2 days ago', rating: 4.8 },
    { id: 6, name: 'Wool Coat', points: 1200, image: '/api/placeholder/200/250', purchaseDate: '1 week ago', rating: 4.9 },
    { id: 7, name: 'Summer Dress', points: 420, image: '/api/placeholder/200/250', purchaseDate: '2 weeks ago', rating: 4.7 },
    { id: 8, name: 'Sneakers', points: 350, image: '/api/placeholder/200/250', purchaseDate: '3 weeks ago', rating: 4.5 }
  ];

  // Mock transaction data
  const transactions = [
    {
      id: 1,
      type: 'earned',
      item: 'Vintage Denim Jacket',
      points: 450,
      date: '2025-01-10',
      status: 'completed'
    },
    {
      id: 2,
      type: 'spent',
      item: 'Floral Summer Dress',
      points: 320,
      date: '2025-01-08',
      status: 'completed'
    },
    {
      id: 3,
      type: 'earned',
      item: 'Leather Handbag',
      points: 650,
      date: '2025-01-05',
      status: 'completed'
    },
    {
      id: 4,
      type: 'spent',
      item: 'Wool Winter Coat',
      points: 1200,
      date: '2025-01-03',
      status: 'completed'
    },
    {
      id: 5,
      type: 'earned',
      item: 'Designer Jeans',
      points: 750,
      date: '2024-12-28',
      status: 'pending'
    }
  ];

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setProfileImage(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSaveProfile = () => {
    setIsEditing(false);
    // Here you would typically save to backend
    console.log('Profile saved:', userInfo);
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    // Reset to original values if needed
  };

  return (
    <div className="min-h-screen bg-[#F2F2F2]">
      {/* Header */}
      <Navbar />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Profile Information Card */}
          <div className="lg:col-span-1">
            <Card className="bg-white border-[#B6B09F]/20 shadow-lg">
              <CardHeader className="text-center">
                <div className="relative inline-block">
                  <div className="w-32 h-32 bg-[#EAE4D5] rounded-full flex items-center justify-center mx-auto relative overflow-hidden">
                    {profileImage ? (
                      <img 
                        src={profileImage} 
                        alt="Profile" 
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <User className="w-16 h-16 text-[#B6B09F]" />
                    )}
                  </div>
                  <label className="absolute bottom-0 right-0 bg-black hover:bg-[#B6B09F] text-white rounded-full p-2 cursor-pointer transition-colors">
                    <Camera className="w-4 h-4" />
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="hidden"
                    />
                  </label>
                </div>
                <div className="mt-4">
                  {isEditing ? (
                    <div className="space-y-3">
                      <Input
                        value={userInfo.name}
                        onChange={(e) => setUserInfo({...userInfo, name: e.target.value})}
                        className="text-center border-[#B6B09F]/30 focus:border-[#B6B09F]"
                      />
                      <Input
                        value={userInfo.email}
                        onChange={(e) => setUserInfo({...userInfo, email: e.target.value})}
                        className="text-center border-[#B6B09F]/30 focus:border-[#B6B09F]"
                      />
                      <div className="flex space-x-2">
                        <Button
                          onClick={handleSaveProfile}
                          className="flex-1 bg-black hover:bg-[#B6B09F] text-white"
                        >
                          <Check className="w-4 h-4 mr-2" />
                          Save
                        </Button>
                        <Button
                          onClick={handleCancelEdit}
                          variant="outline"
                          className="flex-1 border-[#B6B09F]/30 text-black hover:bg-[#B6B09F] hover:text-white"
                        >
                          <X className="w-4 h-4 mr-2" />
                          Cancel
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <div>
                      <h2 className="text-2xl font-bold text-black">{userInfo.name}</h2>
                      <p className="text-[#B6B09F] flex items-center justify-center mt-2">
                        <Mail className="w-4 h-4 mr-2" />
                        {userInfo.email}
                      </p>
                      <p className="text-sm text-[#B6B09F] mt-2">
                        <Calendar className="w-4 h-4 inline mr-1" />
                        Member since {userInfo.joinDate}
                      </p>
                      <Button
                        onClick={() => setIsEditing(true)}
                        variant="outline"
                        className="mt-4 border-[#B6B09F]/30 text-black hover:bg-[#B6B09F] hover:text-white"
                      >
                        <Edit3 className="w-4 h-4 mr-2" />
                        Edit Profile
                      </Button>
                    </div>
                  )}
                </div>
              </CardHeader>
            </Card>

            {/* Stats Card */}
            <Card className="bg-white border-[#B6B09F]/20 shadow-lg mt-6">
              <CardHeader>
                <CardTitle className="text-black flex items-center">
                  <Settings className="w-5 h-5 mr-2 text-[#B6B09F]" />
                  Profile Stats
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-[#B6B09F]">Current Points</span>
                  <span className="font-bold text-black flex items-center">
                    <Coins className="w-4 h-4 mr-1 text-yellow-500" />
                    {userInfo.totalPoints}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-[#B6B09F]">Items Swapped</span>
                  <span className="font-bold text-black">{userInfo.itemsSwapped}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-[#B6B09F]">Rating</span>
                  <span className="font-bold text-black flex items-center">
                    <Star className="w-4 h-4 mr-1 fill-yellow-400 text-yellow-400" />
                    {userInfo.rating}
                  </span>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Transaction History */}
          <div className="lg:col-span-2">
            <Card className="bg-white border-[#B6B09F]/20 shadow-lg">
              <CardHeader>
                <CardTitle className="text-black flex items-center">
                  <History className="w-5 h-5 mr-2 text-[#B6B09F]" />
                  Transaction History
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {transactions.map((transaction) => (
                    <div
                      key={transaction.id}
                      className="flex items-center justify-between p-4 bg-[#F2F2F2] rounded-lg border border-[#B6B09F]/10"
                    >
                      <div className="flex items-center space-x-4">
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                          transaction.type === 'earned' 
                            ? 'bg-green-100 text-green-600' 
                            : 'bg-red-100 text-red-600'
                        }`}>
                          {transaction.type === 'earned' ? (
                            <ArrowUpDown className="w-5 h-5 rotate-180" />
                          ) : (
                            <ArrowUpDown className="w-5 h-5" />
                          )}
                        </div>
                        <div>
                          <h4 className="font-semibold text-black">{transaction.item}</h4>
                          <p className="text-sm text-[#B6B09F]">
                            {new Date(transaction.date).toLocaleDateString('en-US', {
                              year: 'numeric',
                              month: 'short',
                              day: 'numeric'
                            })}
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className={`font-bold ${
                          transaction.type === 'earned' ? 'text-green-600' : 'text-red-600'
                        }`}>
                          {transaction.type === 'earned' ? '+' : '-'}{transaction.points} Points
                        </p>
                        <p className={`text-sm ${
                          transaction.status === 'completed' ? 'text-green-600' : 'text-yellow-600'
                        }`}>
                          {transaction.status === 'completed' ? 'Completed' : 'Pending'}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
                
                {/* Load More Button */}
                <div className="text-center mt-6">
                  <Button
                    variant="outline"
                    className="border-[#B6B09F]/30 text-black hover:bg-[#B6B09F] hover:text-white"
                  >
                    Load More Transactions
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Upload New Item Card */}
            <Card className="bg-white border-[#B6B09F]/20 shadow-lg mt-6">
              <CardHeader>
                <CardTitle className="text-black flex items-center">
                  <Upload className="w-5 h-5 mr-2 text-[#B6B09F]" />
                  Quick Actions
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Link to="/list-item">
                    <Button className="w-full bg-black hover:bg-[#B6B09F] text-white">
                      <Upload className="w-4 h-4 mr-2" />
                      Upload New Item
                    </Button>
                  </Link>
                  <Link to="/browse">
                    <Button 
                      variant="outline"
                      className="w-full border-[#B6B09F]/30 text-black hover:bg-[#B6B09F] hover:text-white"
                    >
                      <ArrowUpDown className="w-4 h-4 mr-2" />
                      Browse Swaps
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>

            {/* My Listings Section */}
            <Card className="bg-white border-[#B6B09F]/20 shadow-lg mt-6">
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle className="text-black flex items-center">
                    <Package className="w-5 h-5 mr-2 text-[#B6B09F]" />
                    My Listings
                  </CardTitle>
                  <Link to="/list-item">
                    <Button size="sm" className="bg-black hover:bg-[#B6B09F] text-white">
                      <Plus className="h-4 w-4 mr-2" />
                      Add New
                    </Button>
                  </Link>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {myListings.map((item) => (
                    <Card key={item.id} className="bg-[#F2F2F2] border-[#B6B09F]/20">
                      <CardContent className="p-4">
                        <div className="flex space-x-4">
                          <div className="w-20 h-20 bg-[#EAE4D5] rounded-lg flex items-center justify-center flex-shrink-0">
                            <span className="text-[#B6B09F] text-xs">Image</span>
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-start justify-between">
                              <h3 className="font-semibold text-black text-sm truncate">{item.name}</h3>
                              <div className={`px-2 py-1 rounded-full text-xs font-medium ml-2 ${
                                item.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                              }`}>
                                {item.status}
                              </div>
                            </div>
                            <p className="text-lg font-bold text-black mt-1">{item.points} Points</p>
                            <div className="flex items-center justify-between text-xs text-[#B6B09F] mt-2">
                              <div className="flex items-center space-x-3">
                                <div className="flex items-center space-x-1">
                                  <Eye className="h-3 w-3" />
                                  <span>{item.views}</span>
                                </div>
                                <div className="flex items-center space-x-1">
                                  <Heart className="h-3 w-3" />
                                  <span>{item.likes}</span>
                                </div>
                              </div>
                            </div>
                            <div className="flex space-x-2 mt-2">
                              <Link to={`/item/${item.id}`} className="flex-1">
                                <Button size="sm" className="w-full bg-black hover:bg-[#B6B09F] text-white text-xs">
                                  View
                                </Button>
                              </Link>
                              <Link to={`/product-detail/${item.id}`} className="flex-1">
                                <Button 
                                  variant="outline" 
                                  size="sm"
                                  className="w-full border-[#B6B09F]/30 text-black hover:bg-[#B6B09F] hover:text-white text-xs"
                                >
                                  Edit
                                </Button>
                              </Link>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* My Purchases Section */}
            <Card className="bg-white border-[#B6B09F]/20 shadow-lg mt-6">
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle className="text-black flex items-center">
                    <ShoppingCart className="w-5 h-5 mr-2 text-[#B6B09F]" />
                    My Purchases
                  </CardTitle>
                  <Link to="/browse">
                    <Button size="sm" variant="outline" className="border-[#B6B09F]/30 text-black hover:bg-[#B6B09F] hover:text-white">
                      <ShoppingCart className="h-4 w-4 mr-2" />
                      Browse More
                    </Button>
                  </Link>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {myPurchases.map((item) => (
                    <Card key={item.id} className="bg-[#F2F2F2] border-[#B6B09F]/20">
                      <CardContent className="p-4">
                        <div className="flex space-x-4">
                          <div className="w-20 h-20 bg-[#EAE4D5] rounded-lg flex items-center justify-center flex-shrink-0">
                            <span className="text-[#B6B09F] text-xs">Image</span>
                          </div>
                          <div className="flex-1 min-w-0">
                            <h3 className="font-semibold text-black text-sm truncate">{item.name}</h3>
                            <div className="flex items-center justify-between mt-1">
                              <p className="text-lg font-bold text-black">{item.points} Points</p>
                              <div className="flex items-center space-x-1">
                                <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                                <span className="text-xs text-[#B6B09F]">{item.rating}</span>
                              </div>
                            </div>
                            <div className="flex items-center space-x-1 text-xs text-[#B6B09F] mt-2">
                              <Clock className="h-3 w-3" />
                              <span>Purchased {item.purchaseDate}</span>
                            </div>
                            <div className="flex space-x-2 mt-2">
                              <Link to={`/item/${item.id}`} className="flex-1">
                                <Button size="sm" className="w-full bg-black hover:bg-[#B6B09F] text-white text-xs">
                                  View
                                </Button>
                              </Link>
                              <Button 
                                variant="outline" 
                                size="sm"
                                className="flex-1 border-[#B6B09F]/30 text-black hover:bg-[#B6B09F] hover:text-white text-xs"
                              >
                                Rate
                              </Button>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

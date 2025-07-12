import React, { useState, useEffect } from 'react';
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
import api from '../services/api';

export const Profile = () => {
  const [profileImage, setProfileImage] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [userInfo, setUserInfo] = useState(null);
  const [myListings, setMyListings] = useState([]);
  const [myPurchases, setMyPurchases] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showAllTransactions, setShowAllTransactions] = useState(false);
  const [showAllListings, setShowAllListings] = useState(false);
  const [showAllPurchases, setShowAllPurchases] = useState(false);
  const [editProfileData, setEditProfileData] = useState(null);
  const [savingProfile, setSavingProfile] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        // 1. Fetch user profile
        const profileRes = await api.auth.getProfile();
        const user = profileRes.user;
        setUserInfo({
          id: user._id,
          name: user.username,
          email: user.email,
          joinDate: new Date(user.createdAt).toLocaleString('default', { month: 'long', year: 'numeric' }),
          totalPoints: user.points_balance,
          profile_photo: user.profile_photo,
          location: user.location,
        });
        setProfileImage(user.profile_photo || null);
        setEditProfileData({
          name: user.username,
          email: user.email,
          location: user.location || '',
        });

        // 2. Fetch my listings (items uploaded by user)
        const itemsRes = await api.items.getAllItems({ uploaded_by: user._id });
        setMyListings(itemsRes);

        // 3. Fetch transactions
        const txRes = await api.transactions.getUserTransactions();
        setTransactions(txRes);

        // 4. My Purchases: filter transactions for type 'redeem' or 'swap'
        const purchases = txRes.filter(tx => tx.transaction_type === 'redeem' || tx.transaction_type === 'swap');
        setMyPurchases(purchases);
      } catch (err) {
        setError(err.message || 'Failed to load profile data');
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleImageUpload = async (event) => {
    const file = event.target.files[0];
    if (file) {
      setUploadingImage(true);
      try {
        const formData = new FormData();
        formData.append('profile_picture', file);
        const res = await api.auth.uploadProfilePicture(formData);
        setProfileImage(res.profile_photo || null);
        // Refetch profile to sync all info
        const profileRes = await api.auth.getProfile();
        const user = profileRes.user;
        setUserInfo({
          id: user._id,
          name: user.username,
          email: user.email,
          joinDate: new Date(user.createdAt).toLocaleString('default', { month: 'long', year: 'numeric' }),
          totalPoints: user.points_balance,
          profile_photo: user.profile_photo,
          location: user.location,
        });
        setEditProfileData((prev) => ({ ...prev, profile_photo: null }));
      } catch (err) {
        setError(err.message || 'Failed to upload profile photo');
      } finally {
        setUploadingImage(false);
      }
    }
  };

  const handleSaveProfile = async () => {
    setSavingProfile(true);
    try {
      // Save text fields
      await api.auth.updateProfile({
        username: editProfileData.name,
        email: editProfileData.email,
        location: editProfileData.location,
      });
      // Save profile photo if changed
      if (editProfileData.profile_photo && editProfileData.profile_photo instanceof File) {
        const formData = new FormData();
        formData.append('profile_picture', editProfileData.profile_photo);
        await api.auth.uploadProfilePicture(formData);
      }
      // Refetch profile
      const profileRes = await api.auth.getProfile();
      const user = profileRes.user;
      setUserInfo({
        id: user._id,
        name: user.username,
        email: user.email,
        joinDate: new Date(user.createdAt).toLocaleString('default', { month: 'long', year: 'numeric' }),
        totalPoints: user.points_balance,
        profile_photo: user.profile_photo,
        location: user.location,
      });
      setProfileImage(user.profile_photo || null);
      setEditProfileData({
        name: user.username,
        email: user.email,
        location: user.location || '',
      });
      setIsEditing(false);
    } catch (err) {
      setError(err.message || 'Failed to update profile');
    } finally {
      setSavingProfile(false);
    }
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    // Reset to original values
    setEditProfileData({
      name: userInfo.name,
      email: userInfo.email,
      location: userInfo.location || '',
    });
    setProfileImage(userInfo.profile_photo || null);
  };

  if (loading) return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  if (error) return <div className="min-h-screen flex items-center justify-center text-red-500">{error}</div>;

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
                    {uploadingImage ? (
                      <div className="w-full h-full flex items-center justify-center">Uploading...</div>
                    ) : profileImage ? (
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
                        value={editProfileData.name}
                        onChange={(e) => setEditProfileData({...editProfileData, name: e.target.value})}
                        className="text-center border-[#B6B09F]/30 focus:border-[#B6B09F]"
                        placeholder="Name"
                      />
                      <Input
                        value={editProfileData.email}
                        onChange={(e) => setEditProfileData({...editProfileData, email: e.target.value})}
                        className="text-center border-[#B6B09F]/30 focus:border-[#B6B09F]"
                        placeholder="Email"
                      />
                      <Input
                        value={editProfileData.location}
                        onChange={(e) => setEditProfileData({...editProfileData, location: e.target.value})}
                        className="text-center border-[#B6B09F]/30 focus:border-[#B6B09F]"
                        placeholder="Location"
                      />
                      <div className="flex space-x-2">
                        <Button
                          onClick={handleSaveProfile}
                          className="flex-1 bg-black hover:bg-[#B6B09F] text-white"
                          disabled={savingProfile}
                        >
                          <Check className="w-4 h-4 mr-2" />
                          {savingProfile ? 'Saving...' : 'Save'}
                        </Button>
                        <Button
                          onClick={handleCancelEdit}
                          variant="outline"
                          className="flex-1 border-[#B6B09F]/30 text-black hover:bg-[#B6B09F] hover:text-white"
                          disabled={savingProfile}
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
                  <span className="text-[#B6B09F]">Location</span>
                  <span className="font-bold text-black">{userInfo.location || '-'}</span>
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
                  {(showAllTransactions ? transactions : transactions.slice(0, 5)).map((transaction) => (
                    <div
                      key={transaction._id}
                      className="flex items-center justify-between p-4 bg-[#F2F2F2] rounded-lg border border-[#B6B09F]/10"
                    >
                      <div className="flex items-center space-x-4">
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                          transaction.transaction_type === 'earn' 
                            ? 'bg-green-100 text-green-600' 
                            : 'bg-red-100 text-red-600'
                        }`}>
                          {transaction.transaction_type === 'earn' ? (
                            <ArrowUpDown className="w-5 h-5 rotate-180" />
                          ) : (
                            <ArrowUpDown className="w-5 h-5" />
                          )}
                        </div>
                        <div>
                          <h4 className="font-semibold text-black">{transaction.description}</h4>
                          <p className="text-sm text-[#B6B09F]">
                            {new Date(transaction.createdAt).toLocaleDateString('en-US', {
                              year: 'numeric',
                              month: 'short',
                              day: 'numeric'
                            })}
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className={`font-bold ${
                          transaction.transaction_type === 'earn' ? 'text-green-600' : 'text-red-600'
                        }`}>
                          {transaction.transaction_type === 'earn' ? '+' : '-'}{transaction.points} Points
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
                {transactions.length > 5 && (
                  <div className="text-center mt-6">
                    <Button
                      variant="outline"
                      className="border-[#B6B09F]/30 text-black hover:bg-[#B6B09F] hover:text-white"
                      onClick={() => setShowAllTransactions((prev) => !prev)}
                    >
                      {showAllTransactions ? 'Show Less' : 'Load More Transactions'}
                    </Button>
                  </div>
                )}
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
                {myListings.length === 0 ? (
                  <div className="text-[#B6B09F]">No listings yet.</div>
                ) : (
                  (showAllListings ? myListings : myListings.slice(0, 5)).map((item) => (
                    <Card key={item._id} className="bg-[#F2F2F2] border-[#B6B09F]/20">
                      <CardContent className="p-4">
                        <div className="flex space-x-4">
                          <div className="w-20 h-20 bg-[#EAE4D5] rounded-lg flex items-center justify-center flex-shrink-0">
                            {item.images && item.images.length > 0 ? (
                              <img src={item.images[0]} alt={item.title} className="w-full h-full object-cover rounded-lg" />
                            ) : (
                              <span className="text-[#B6B09F] text-xs">Image</span>
                            )}
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-start justify-between">
                              <h3 className="font-semibold text-black text-sm truncate">{item.title}</h3>
                              <div className={`px-2 py-1 rounded-full text-xs font-medium ml-2 ${
                                item.status === 'available' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                              }`}>
                                {item.status}
                              </div>
                            </div>
                            <p className="text-lg font-bold text-black mt-1">{item.points_value} Points</p>
                            <div className="flex items-center justify-between text-xs text-[#B6B09F] mt-2">
                              <div className="flex items-center space-x-3">
                                <div className="flex items-center space-x-1">
                                  <Eye className="h-3 w-3" />
                                  <span>{item.views || 0}</span>
                                </div>
                                <div className="flex items-center space-x-1">
                                  <Heart className="h-3 w-3" />
                                  <span>{item.likes || 0}</span>
                                </div>
                              </div>
                            </div>
                            <div className="flex space-x-2 mt-2">
                              <Link to={`/item/${item._id}`} className="flex-1">
                                <Button size="sm" className="w-full bg-black hover:bg-[#B6B09F] text-white text-xs">
                                  View
                                </Button>
                              </Link>
                              <Link to={`/product-detail/${item._id}`} className="flex-1">
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
                  ))
                )}
                {myListings.length > 5 && (
                  <div className="text-center mt-6">
                    <Button
                      variant="outline"
                      className="border-[#B6B09F]/30 text-black hover:bg-[#B6B09F] hover:text-white"
                      onClick={() => setShowAllListings((prev) => !prev)}
                    >
                      {showAllListings ? 'Show Less' : 'Load More Listings'}
                    </Button>
                  </div>
                )}
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
                  {myPurchases.length === 0 ? (
                    <div className="text-[#B6B09F]">No purchases yet.</div>
                  ) : (
                    (showAllPurchases ? myPurchases : myPurchases.slice(0, 5)).map((tx) => (
                      <Card key={tx._id} className="bg-[#F2F2F2] border-[#B6B09F]/20">
                        <CardContent className="p-4">
                          <div className="flex space-x-4">
                            <div className="w-20 h-20 bg-[#EAE4D5] rounded-lg flex items-center justify-center flex-shrink-0">
                              {/* Show item image if available */}
                              {tx.item_id && tx.item_id.images && tx.item_id.images.length > 0 ? (
                                <img src={tx.item_id.images[0]} alt={tx.item_id.title} className="w-full h-full object-cover rounded-lg" />
                              ) : (
                                <span className="text-[#B6B09F] text-xs">Image</span>
                              )}
                            </div>
                            <div className="flex-1 min-w-0">
                              <h3 className="font-semibold text-black text-sm truncate">{tx.item_id && tx.item_id.title}</h3>
                              <div className="flex items-center justify-between mt-1">
                                <p className="text-lg font-bold text-black">{tx.points} Points</p>
                                <div className="flex items-center space-x-1">
                                  <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                                  <span className="text-xs text-[#B6B09F]">{tx.rating || '-'}</span>
                                </div>
                              </div>
                              <div className="flex items-center space-x-1 text-xs text-[#B6B09F] mt-2">
                                <Clock className="h-3 w-3" />
                                <span>Purchased {new Date(tx.createdAt).toLocaleDateString()}</span>
                              </div>
                              <div className="flex space-x-2 mt-2">
                                <Link to={`/item/${tx.item_id && tx.item_id._id}`} className="flex-1">
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
                    ))
                  )}
                </div>
                {myPurchases.length > 5 && (
                  <div className="text-center mt-6">
                    <Button
                      variant="outline"
                      className="border-[#B6B09F]/30 text-black hover:bg-[#B6B09F] hover:text-white"
                      onClick={() => setShowAllPurchases((prev) => !prev)}
                    >
                      {showAllPurchases ? 'Show Less' : 'Load More Purchases'}
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

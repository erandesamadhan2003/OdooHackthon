import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { 
  Users, 
  ShoppingBag, 
  Package, 
  Shield, 
  Ban, 
  CheckCircle, 
  XCircle, 
  Trash2,
  Eye,
  Edit,
  AlertCircle,
  TrendingUp,
  Activity
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Navbar } from '@/components/layouts/Navbar';
import { Notification } from '@/components/ui/notification';
import { 
  fetchAllUsers, 
  fetchAllOrders, 
  fetchAllListings,
  banUser,
  unbanUser,
  updateOrderStatus,
  approveListing,
  rejectListing,
  removeListing
} from '@/app/features/admin/adminSlice';

export const AdminDashboard = () => {
  const dispatch = useDispatch();
  const { user, isAuthenticated } = useSelector((state) => state.auth);
  const { 
    users, 
    orders, 
    listings, 
    loading, 
    error, 
    actionLoading, 
    actionError 
  } = useSelector((state) => state.admin);

  const [activeTab, setActiveTab] = useState('overview');
  const [notification, setNotification] = useState({ show: false, type: 'success', message: '' });

  // Check if user is admin
  useEffect(() => {
    if (!isAuthenticated || !user || user.role !== 'admin') {
      setNotification({
        show: true,
        type: 'error',
        message: 'Access denied. Admin privileges required.'
      });
    }
  }, [isAuthenticated, user]);

  // Fetch data on component mount
  useEffect(() => {
    if (user?.role === 'admin') {
      dispatch(fetchAllUsers());
      dispatch(fetchAllOrders());
      dispatch(fetchAllListings());
    }
  }, [dispatch, user]);

  // Handle user ban/unban
  const handleUserAction = async (userId, action) => {
    try {
      if (action === 'ban') {
        await dispatch(banUser(userId)).unwrap();
        setNotification({
          show: true,
          type: 'success',
          message: 'User banned successfully'
        });
      } else if (action === 'unban') {
        await dispatch(unbanUser(userId)).unwrap();
        setNotification({
          show: true,
          type: 'success',
          message: 'User unbanned successfully'
        });
      }
    } catch (error) {
      setNotification({
        show: true,
        type: 'error',
        message: error || 'Action failed'
      });
    }
  };

  // Handle order status update
  const handleOrderStatusUpdate = async (orderId, status) => {
    try {
      await dispatch(updateOrderStatus({ orderId, status })).unwrap();
      setNotification({
        show: true,
        type: 'success',
        message: 'Order status updated successfully'
      });
    } catch (error) {
      setNotification({
        show: true,
        type: 'error',
        message: error || 'Failed to update order status'
      });
    }
  };

  // Handle listing actions
  const handleListingAction = async (listingId, action) => {
    try {
      if (action === 'approve') {
        await dispatch(approveListing(listingId)).unwrap();
        setNotification({
          show: true,
          type: 'success',
          message: 'Listing approved successfully'
        });
      } else if (action === 'reject') {
        await dispatch(rejectListing(listingId)).unwrap();
        setNotification({
          show: true,
          type: 'success',
          message: 'Listing rejected successfully'
        });
      } else if (action === 'remove') {
        await dispatch(removeListing(listingId)).unwrap();
        setNotification({
          show: true,
          type: 'success',
          message: 'Listing removed successfully'
        });
      }
    } catch (error) {
      setNotification({
        show: true,
        type: 'error',
        message: error || 'Action failed'
      });
    }
  };

  // Calculate statistics
  const stats = {
    totalUsers: users.length,
    activeUsers: users.filter(u => u.status === 'active').length,
    bannedUsers: users.filter(u => u.status === 'banned').length,
    totalOrders: orders.length,
    pendingOrders: orders.filter(o => o.status === 'pending').length,
    completedOrders: orders.filter(o => o.status === 'completed').length,
    totalListings: listings.length,
    approvedListings: listings.filter(l => l.status === 'approved').length,
    pendingListings: listings.filter(l => l.status === 'pending').length,
    rejectedListings: listings.filter(l => l.status === 'rejected').length,
  };

  if (!isAuthenticated || !user || user.role !== 'admin') {
    return (
      <div className="min-h-screen bg-[#F2F2F2]">
        <Navbar />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center py-12">
            <Shield className="h-16 w-16 text-red-500 mx-auto mb-4" />
            <h1 className="text-2xl font-bold text-black mb-2">Access Denied</h1>
            <p className="text-[#B6B09F]">You need admin privileges to access this page.</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F2F2F2]">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-black mb-2">Admin Dashboard</h1>
          <p className="text-[#B6B09F]">Manage users, orders, and listings</p>
        </div>

        {/* Navigation Tabs */}
        <div className="flex space-x-1 mb-8 bg-white rounded-lg p-1 shadow-sm">
          {[
            { id: 'overview', label: 'Overview', icon: Activity },
            { id: 'users', label: 'Users', icon: Users },
            { id: 'orders', label: 'Orders', icon: ShoppingBag },
            { id: 'listings', label: 'Listings', icon: Package }
          ].map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-2 px-4 py-2 rounded-md transition-colors ${
                  activeTab === tab.id
                    ? 'bg-black text-white'
                    : 'text-[#B6B09F] hover:bg-gray-100'
                }`}
              >
                <Icon className="h-4 w-4" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Overview Tab */}
        {activeTab === 'overview' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <Card className="bg-white border-[#B6B09F]/20">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-[#B6B09F]">Total Users</CardTitle>
                <Users className="h-4 w-4 text-[#B6B09F]" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-black">{stats.totalUsers}</div>
                <p className="text-xs text-[#B6B09F]">
                  {stats.activeUsers} active, {stats.bannedUsers} banned
                </p>
              </CardContent>
            </Card>

            <Card className="bg-white border-[#B6B09F]/20">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-[#B6B09F]">Total Orders</CardTitle>
                <ShoppingBag className="h-4 w-4 text-[#B6B09F]" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-black">{stats.totalOrders}</div>
                <p className="text-xs text-[#B6B09F]">
                  {stats.pendingOrders} pending, {stats.completedOrders} completed
                </p>
              </CardContent>
            </Card>

            <Card className="bg-white border-[#B6B09F]/20">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-[#B6B09F]">Total Listings</CardTitle>
                <Package className="h-4 w-4 text-[#B6B09F]" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-black">{stats.totalListings}</div>
                <p className="text-xs text-[#B6B09F]">
                  {stats.approvedListings} approved, {stats.pendingListings} pending
                </p>
              </CardContent>
            </Card>

            <Card className="bg-white border-[#B6B09F]/20">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-[#B6B09F]">System Status</CardTitle>
                <TrendingUp className="h-4 w-4 text-[#B6B09F]" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-green-600">Online</div>
                <p className="text-xs text-[#B6B09F]">All systems operational</p>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Users Tab */}
        {activeTab === 'users' && (
          <div className="bg-white rounded-lg shadow-sm border border-[#B6B09F]/20">
            <div className="p-6 border-b border-[#B6B09F]/20">
              <h2 className="text-xl font-semibold text-black">User Management</h2>
              <p className="text-[#B6B09F]">Manage user accounts and permissions</p>
            </div>
            
            {loading.users ? (
              <div className="p-6 text-center">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#B6B09F] mx-auto"></div>
                <p className="text-[#B6B09F] mt-2">Loading users...</p>
              </div>
            ) : error.users ? (
              <div className="p-6 text-center">
                <AlertCircle className="h-8 w-8 text-red-500 mx-auto mb-2" />
                <p className="text-red-600">{error.users}</p>
                <Button onClick={() => dispatch(fetchAllUsers())} className="mt-2">
                  Try Again
                </Button>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-[#B6B09F] uppercase tracking-wider">
                        User
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-[#B6B09F] uppercase tracking-wider">
                        Email
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-[#B6B09F] uppercase tracking-wider">
                        Role
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-[#B6B09F] uppercase tracking-wider">
                        Status
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-[#B6B09F] uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {users.map((user) => (
                      <tr key={user._id}>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="h-10 w-10 rounded-full bg-[#EAE4D5] flex items-center justify-center">
                              <span className="text-sm font-medium text-[#B6B09F]">
                                {user.username?.charAt(0).toUpperCase()}
                              </span>
                            </div>
                            <div className="ml-4">
                              <div className="text-sm font-medium text-black">{user.username}</div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-[#B6B09F]">
                          {user.email}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                            user.role === 'admin' 
                              ? 'bg-purple-100 text-purple-800' 
                              : 'bg-gray-100 text-gray-800'
                          }`}>
                            {user.role}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                            user.status === 'active' 
                              ? 'bg-green-100 text-green-800' 
                              : 'bg-red-100 text-red-800'
                          }`}>
                            {user.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          {user.status === 'active' ? (
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => handleUserAction(user._id, 'ban')}
                              disabled={actionLoading.banUser}
                              className="text-red-600 border-red-300 hover:bg-red-50"
                            >
                              <Ban className="h-4 w-4 mr-1" />
                              Ban
                            </Button>
                          ) : (
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => handleUserAction(user._id, 'unban')}
                              disabled={actionLoading.unbanUser}
                              className="text-green-600 border-green-300 hover:bg-green-50"
                            >
                              <CheckCircle className="h-4 w-4 mr-1" />
                              Unban
                            </Button>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

        {/* Orders Tab */}
        {activeTab === 'orders' && (
          <div className="bg-white rounded-lg shadow-sm border border-[#B6B09F]/20">
            <div className="p-6 border-b border-[#B6B09F]/20">
              <h2 className="text-xl font-semibold text-black">Order Management</h2>
              <p className="text-[#B6B09F]">Manage transactions and order status</p>
            </div>
            
            {loading.orders ? (
              <div className="p-6 text-center">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#B6B09F] mx-auto"></div>
                <p className="text-[#B6B09F] mt-2">Loading orders...</p>
              </div>
            ) : error.orders ? (
              <div className="p-6 text-center">
                <AlertCircle className="h-8 w-8 text-red-500 mx-auto mb-2" />
                <p className="text-red-600">{error.orders}</p>
                <Button onClick={() => dispatch(fetchAllOrders())} className="mt-2">
                  Try Again
                </Button>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-[#B6B09F] uppercase tracking-wider">
                        Order ID
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-[#B6B09F] uppercase tracking-wider">
                        User
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-[#B6B09F] uppercase tracking-wider">
                        Item
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-[#B6B09F] uppercase tracking-wider">
                        Amount
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-[#B6B09F] uppercase tracking-wider">
                        Status
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-[#B6B09F] uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {orders.map((order) => (
                      <tr key={order._id}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-[#B6B09F]">
                          {order._id}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-black">{order.user_id?.username || 'Unknown'}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-black">{order.item_id?.title || 'Unknown Item'}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-[#B6B09F]">
                          {order.amount || 0} Points
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                            order.status === 'completed' 
                              ? 'bg-green-100 text-green-800'
                              : order.status === 'pending'
                              ? 'bg-yellow-100 text-yellow-800'
                              : 'bg-gray-100 text-gray-800'
                          }`}>
                            {order.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <select
                            value={order.status}
                            onChange={(e) => handleOrderStatusUpdate(order._id, e.target.value)}
                            disabled={actionLoading.updateOrder}
                            className="text-sm border border-gray-300 rounded px-2 py-1"
                          >
                            <option value="pending">Pending</option>
                            <option value="completed">Completed</option>
                            <option value="cancelled">Cancelled</option>
                          </select>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

        {/* Listings Tab */}
        {activeTab === 'listings' && (
          <div className="bg-white rounded-lg shadow-sm border border-[#B6B09F]/20">
            <div className="p-6 border-b border-[#B6B09F]/20">
              <h2 className="text-xl font-semibold text-black">Listing Management</h2>
              <p className="text-[#B6B09F]">Approve, reject, or remove item listings</p>
            </div>
            
            {loading.listings ? (
              <div className="p-6 text-center">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#B6B09F] mx-auto"></div>
                <p className="text-[#B6B09F] mt-2">Loading listings...</p>
              </div>
            ) : error.listings ? (
              <div className="p-6 text-center">
                <AlertCircle className="h-8 w-8 text-red-500 mx-auto mb-2" />
                <p className="text-red-600">{error.listings}</p>
                <Button onClick={() => dispatch(fetchAllListings())} className="mt-2">
                  Try Again
                </Button>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-[#B6B09F] uppercase tracking-wider">
                        Item
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-[#B6B09F] uppercase tracking-wider">
                        Owner
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-[#B6B09F] uppercase tracking-wider">
                        Category
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-[#B6B09F] uppercase tracking-wider">
                        Points
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-[#B6B09F] uppercase tracking-wider">
                        Status
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-[#B6B09F] uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {listings.map((listing) => (
                      <tr key={listing._id}>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="h-10 w-10 rounded-lg bg-[#EAE4D5] flex items-center justify-center">
                              {listing.images && listing.images.length > 0 ? (
                                <img 
                                  src={listing.images[0]} 
                                  alt={listing.title}
                                  className="h-10 w-10 object-cover rounded-lg"
                                />
                              ) : (
                                <Package className="h-5 w-5 text-[#B6B09F]" />
                              )}
                            </div>
                            <div className="ml-4">
                              <div className="text-sm font-medium text-black">{listing.title}</div>
                              <div className="text-sm text-[#B6B09F]">{listing.description}</div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-[#B6B09F]">
                          {listing.uploaded_by?.username || 'Unknown'}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-[#EAE4D5] text-[#B6B09F]">
                            {listing.category}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-[#B6B09F]">
                          {listing.points_value} Points
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                            listing.status === 'approved' 
                              ? 'bg-green-100 text-green-800'
                              : listing.status === 'pending'
                              ? 'bg-yellow-100 text-yellow-800'
                              : listing.status === 'rejected'
                              ? 'bg-red-100 text-red-800'
                              : 'bg-gray-100 text-gray-800'
                          }`}>
                            {listing.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <div className="flex space-x-2">
                            {listing.status === 'pending' && (
                              <>
                                <Button
                                  size="sm"
                                  variant="outline"
                                  onClick={() => handleListingAction(listing._id, 'approve')}
                                  disabled={actionLoading.approveListing}
                                  className="text-green-600 border-green-300 hover:bg-green-50"
                                >
                                  <CheckCircle className="h-4 w-4" />
                                </Button>
                                <Button
                                  size="sm"
                                  variant="outline"
                                  onClick={() => handleListingAction(listing._id, 'reject')}
                                  disabled={actionLoading.rejectListing}
                                  className="text-red-600 border-red-300 hover:bg-red-50"
                                >
                                  <XCircle className="h-4 w-4" />
                                </Button>
                              </>
                            )}
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => handleListingAction(listing._id, 'remove')}
                              disabled={actionLoading.removeListing}
                              className="text-gray-600 border-gray-300 hover:bg-gray-50"
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Notification */}
      <Notification
        type={notification.type}
        message={notification.message}
        isVisible={notification.show}
        onClose={() => setNotification({ show: false, type: 'success', message: '' })}
      />
    </div>
  );
}; 
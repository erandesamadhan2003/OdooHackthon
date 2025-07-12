import React, { useEffect, useState } from 'react';
import { Navbar } from '@/components/layouts/Navbar';

const TABS = [
  { key: 'users', label: 'Manage Users' },
  { key: 'orders', label: 'Manage Orders' },
  { key: 'listings', label: 'Manage Listings' },
];

const Admin = () => {
  const [tab, setTab] = useState('users');
  const [users, setUsers] = useState([]);
  const [orders, setOrders] = useState([]);
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch data for each tab
  useEffect(() => {
    setError(null);
    setLoading(true);
    let url = '';
    if (tab === 'users') url = '/api/admin/users';
    if (tab === 'orders') url = '/api/admin/orders';
    if (tab === 'listings') url = '/api/admin/listings';
    fetch(url, { credentials: 'include' })
      .then(res => res.json())
      .then(data => {
        if (tab === 'users') setUsers(data);
        if (tab === 'orders') setOrders(data);
        if (tab === 'listings') setListings(data);
        setLoading(false);
      })
      .catch(err => {
        setError('Failed to fetch data');
        setLoading(false);
      });
  }, [tab]);

  // User actions
  const handleBanUser = async (id) => {
    await fetch(`/api/admin/users/${id}/ban`, { method: 'PATCH', credentials: 'include' });
    setUsers(users => users.map(u => u._id === id ? { ...u, status: 'banned' } : u));
  };
  const handleUnbanUser = async (id) => {
    await fetch(`/api/admin/users/${id}/unban`, { method: 'PATCH', credentials: 'include' });
    setUsers(users => users.map(u => u._id === id ? { ...u, status: 'active' } : u));
  };

  // Listing actions
  const handleApproveListing = async (id) => {
    await fetch(`/api/admin/listings/${id}/approve`, { method: 'PATCH', credentials: 'include' });
    setListings(listings => listings.map(l => l._id === id ? { ...l, status: 'approved' } : l));
  };
  const handleRejectListing = async (id) => {
    await fetch(`/api/admin/listings/${id}/reject`, { method: 'PATCH', credentials: 'include' });
    setListings(listings => listings.map(l => l._id === id ? { ...l, status: 'rejected' } : l));
  };
  const handleRemoveListing = async (id) => {
    await fetch(`/api/admin/listings/${id}/remove`, { method: 'PATCH', credentials: 'include' });
    setListings(listings => listings.map(l => l._id === id ? { ...l, status: 'removed' } : l));
  };

  // Skeleton loader
  const Skeleton = ({ height = 24, width = '100%' }) => (
    <div style={{ height, width }} className="bg-gray-200 animate-pulse rounded mb-2"></div>
  );

  // Defensive: always use arrays for rendering
  const safeUsers = Array.isArray(users) ? users : [];
  const safeOrders = Array.isArray(orders) ? orders : [];
  const safeListings = Array.isArray(listings) ? listings : [];

  return (
    <div className="min-h-screen bg-[#F2F2F2]">
      <Navbar />
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-3xl font-bold mb-2">Admin Panel</h1>
        <p className="mb-6 text-gray-500">Manage users, orders, and listings</p>
        <div className="flex space-x-4 mb-8">
          {TABS.map(t => (
            <button
              key={t.key}
              className={`px-4 py-2 rounded font-semibold shadow-sm transition-colors duration-150 ${tab === t.key ? 'bg-black text-white' : 'bg-[#EAE4D5] text-black hover:bg-[#B6B09F]/20'}`}
              onClick={() => setTab(t.key)}
            >
              {t.label}
            </button>
          ))}
        </div>
        {loading && (
          <div className="space-y-4">
            <Skeleton height={40} />
            <Skeleton height={40} />
            <Skeleton height={40} />
          </div>
        )}
        {error && <div className="text-red-500 font-semibold mb-4">{error}</div>}
        {/* USERS TAB */}
        {tab === 'users' && !loading && !error && (
          <div>
            <h2 className="text-xl font-semibold mb-2">Manage Users</h2>
            <p className="mb-4 text-gray-500">View, ban, or unban users.</p>
            {safeUsers.length === 0 ? (
              <div className="text-gray-400 text-center py-8">No users found.</div>
            ) : safeUsers.map(user => (
              <div key={user._id} className="flex items-center bg-white rounded-lg shadow p-4 mb-4">
                <div className="w-16 h-16 rounded-full bg-gray-200 flex items-center justify-center mr-4">
                  {user.profile_photo ? (
                    <img src={user.profile_photo} alt={user.username} className="w-full h-full object-cover rounded-full" />
                  ) : (
                    <span className="text-2xl text-gray-400">👤</span>
                  )}
                </div>
                <div className="flex-1">
                  <div className="font-bold text-lg">{user.username}</div>
                  <div className="text-gray-500">{user.email}</div>
                  <div className="text-gray-400">{user.location || '-'}</div>
                  <div className="text-sm text-gray-400">Joined: {user.createdAt ? new Date(user.createdAt).toLocaleDateString() : '-'}</div>
                  <div className="text-sm mt-1">Points: {user.points_balance || 0}</div>
                  <div className="text-sm mt-1">Status: <span className={`px-2 py-1 rounded text-xs ${user.status === 'banned' ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'}`}>{user.status || 'active'}</span></div>
                </div>
                <div className="flex flex-col space-y-2">
                  <button className="px-4 py-1 bg-black text-white rounded" onClick={() => alert(JSON.stringify(user, null, 2))}>View</button>
                  {user.status === 'banned' ? (
                    <button className="px-4 py-1 bg-green-600 text-white rounded" onClick={() => handleUnbanUser(user._id)}>Unban</button>
                  ) : (
                    <button className="px-4 py-1 bg-red-600 text-white rounded" onClick={() => handleBanUser(user._id)}>Ban</button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
        {/* ORDERS TAB */}
        {tab === 'orders' && !loading && !error && (
          <div>
            <h2 className="text-xl font-semibold mb-2">Manage Orders</h2>
            <p className="mb-4 text-gray-500">View all orders and their statuses.</p>
            {safeOrders.length === 0 ? (
              <div className="text-gray-400 text-center py-8">No orders found.</div>
            ) : safeOrders.map(order => (
              <div key={order._id} className="flex items-center bg-white rounded-lg shadow p-4 mb-4">
                <div className="flex-1">
                  <div className="font-bold">Order ID: {order._id}</div>
                  <div>User: {order.user_id?.username || '-'}</div>
                  <div>Item: {order.item_id?.title || '-'}</div>
                  <div>Type: {order.transaction_type}</div>
                  <div>Points: {order.points}</div>
                  <div>Date: {order.createdAt ? new Date(order.createdAt).toLocaleDateString() : '-'}</div>
                  <div>Status: <span className="px-2 py-1 rounded text-xs bg-green-100 text-green-700">{order.status || 'completed'}</span></div>
                </div>
              </div>
            ))}
          </div>
        )}
        {/* LISTINGS TAB */}
        {tab === 'listings' && !loading && !error && (
          <div>
            <h2 className="text-xl font-semibold mb-2">Manage Listings</h2>
            <p className="mb-4 text-gray-500">Approve, reject, or remove item listings.</p>
            {safeListings.length === 0 ? (
              <div className="text-gray-400 text-center py-8">No listings found.</div>
            ) : safeListings.map(listing => (
              <div key={listing._id} className="flex items-center bg-white rounded-lg shadow p-4 mb-4">
                <div className="w-16 h-16 rounded bg-gray-200 flex items-center justify-center mr-4">
                  {listing.images && listing.images.length > 0 ? (
                    <img src={listing.images[0]} alt={listing.title} className="w-full h-full object-cover rounded" />
                  ) : (
                    <span className="text-2xl text-gray-400">📦</span>
                  )}
                </div>
                <div className="flex-1">
                  <div className="font-bold text-lg">{listing.title}</div>
                  <div className="text-gray-500">{listing.category} | {listing.type}</div>
                  <div className="text-gray-400">Uploaded by: {listing.uploaded_by?.username || '-'}</div>
                  <div className="text-sm mt-1">Status: <span className={`px-2 py-1 rounded text-xs ${listing.status === 'pending' ? 'bg-yellow-100 text-yellow-700' : listing.status === 'approved' ? 'bg-green-100 text-green-700' : listing.status === 'rejected' ? 'bg-red-100 text-red-700' : 'bg-gray-100 text-gray-700'}`}>{listing.status}</span></div>
                </div>
                <div className="flex flex-col space-y-2">
                  <button className="px-4 py-1 bg-green-600 text-white rounded" onClick={() => handleApproveListing(listing._id)}>Approve</button>
                  <button className="px-4 py-1 bg-red-600 text-white rounded" onClick={() => handleRejectListing(listing._id)}>Reject</button>
                  <button className="px-4 py-1 bg-gray-600 text-white rounded" onClick={() => handleRemoveListing(listing._id)}>Remove</button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Admin; 
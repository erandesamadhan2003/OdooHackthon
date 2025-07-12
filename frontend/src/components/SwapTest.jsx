import React from 'react';
import { useSelector } from 'react-redux';

export const SwapTest = () => {
  const items = useSelector((state) => state.items.items);
  const user = useSelector((state) => state.auth.user);

  // Helper function to get item name
  const getItemName = (item) => {
    return item?.title || item?.name || 'Unnamed Item';
  };

  // Helper function to get item points
  const getItemPoints = (item) => {
    const points = item?.points_value || item?.points || item?.price || 0;
    return typeof points === 'number' ? points : 0;
  };

  // Helper function to check if user owns the item
  const isUserOwner = (item) => {
    if (!user || !item) return false;
    const uploadedBy = item.uploaded_by || item.owner || item.user;
    
    // Handle both object and string ID cases
    if (typeof uploadedBy === 'object' && uploadedBy !== null) {
      return user._id === uploadedBy._id;
    }
    return user._id === uploadedBy;
  };

  return (
    <div className="p-4 bg-white rounded-lg shadow">
      <h3 className="text-lg font-bold mb-4">Swap Debug Info</h3>
      
      <div className="mb-4">
        <h4 className="font-semibold">Current User:</h4>
        <pre className="bg-gray-100 p-2 rounded text-sm overflow-x-auto">
          {JSON.stringify(user, null, 2)}
        </pre>
      </div>

      <div className="mb-4">
        <h4 className="font-semibold">Items ({items.length}):</h4>
        {items.length === 0 ? (
          <p className="text-gray-500">No items found</p>
        ) : (
          items.map((item, index) => (
            <div key={item._id || index} className="mb-2 p-2 border rounded">
                             <div><strong>Name:</strong> {getItemName(item)}</div>
               <div><strong>Points:</strong> {getItemPoints(item)}</div>
               <div><strong>ID:</strong> {item._id || 'No ID'}</div>
               <div><strong>Description:</strong> {item.description || 'No description'}</div>
               <div><strong>Category:</strong> {item.category || 'Uncategorized'}</div>
              <div><strong>Created:</strong> {item.createdAt ? new Date(item.createdAt).toLocaleDateString() : 'Unknown'}</div>
              <div><strong>Images:</strong> {item.images ? item.images.length : 0} image(s)</div>
              <div><strong>Uploaded by:</strong> {JSON.stringify(item.uploaded_by || item.owner || item.user || 'Unknown')}</div>
              <div><strong>Is Owner:</strong> {isUserOwner(item) ? 'YES' : 'NO'}</div>
              <div><strong>Raw Item:</strong> 
                <pre className="bg-gray-50 p-1 rounded text-xs mt-1 overflow-x-auto">
                  {JSON.stringify(item, null, 2)}
                </pre>
              </div>
            </div>
          ))
        )}
      </div>

      <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded">
        <h4 className="font-semibold text-blue-800">Debugging Tips:</h4>
        <ul className="text-sm text-blue-700 mt-2">
          <li>• Check if items have 'name' or 'title' property</li>
          <li>• Check if items have 'points' or 'price' property</li>
          <li>• Verify 'uploaded_by' structure (object vs string)</li>
          <li>• Ensure user authentication is working</li>
        </ul>
      </div>
    </div>
  );
};
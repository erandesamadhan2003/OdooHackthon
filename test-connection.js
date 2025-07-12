// Test script to verify frontend-backend connectivity
const API_BASE_URL = 'http://localhost:8004/api';

async function testConnection() {
    console.log('🧪 Testing Frontend-Backend Connectivity...\n');

    // Test 1: Server Health Check
    try {
        const response = await fetch('http://localhost:8004/');
        const data = await response.json();
        console.log('✅ Server Health Check:', data.message);
    } catch (error) {
        console.log('❌ Server Health Check Failed:', error.message);
        return;
    }

    // Test 2: Items API
    try {
        const response = await fetch(`${API_BASE_URL}/items`);
        const data = await response.json();
        console.log('✅ Items API:', `Found ${data.length} items`);
    } catch (error) {
        console.log('❌ Items API Failed:', error.message);
    }

    // Test 3: User Registration (without actual registration)
    try {
        const response = await fetch(`${API_BASE_URL}/user/register`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                username: 'testuser',
                email: 'test@example.com',
                password: 'password123',
                role: 'customer'
            })
        });
        const data = await response.json();
        console.log('✅ User Registration API:', data.status);
    } catch (error) {
        console.log('❌ User Registration API Failed:', error.message);
    }

    // Test 4: Points API (should fail without auth)
    try {
        const response = await fetch(`${API_BASE_URL}/points/balance`);
        const data = await response.json();
        console.log('✅ Points API (Unauthorized):', data.error);
    } catch (error) {
        console.log('❌ Points API Failed:', error.message);
    }

    // Test 5: Swaps API (should fail without auth)
    try {
        const response = await fetch(`${API_BASE_URL}/swaps`);
        const data = await response.json();
        console.log('✅ Swaps API (Unauthorized):', data.error);
    } catch (error) {
        console.log('❌ Swaps API Failed:', error.message);
    }

    console.log('\n🎉 Connectivity Test Complete!');
    console.log('\n📋 Summary:');
    console.log('- Backend server should be running on port 8004');
    console.log('- Frontend should be running on port 5173');
    console.log('- CORS should be configured for localhost:5173');
    console.log('- All API endpoints should be accessible');
}

// Run the test
testConnection().catch(console.error); 
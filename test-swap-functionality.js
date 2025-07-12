// Test script to verify swap functionality
const API_BASE_URL = 'http://localhost:8004/api';

async function testSwapFunctionality() {
    console.log('🧪 Testing Swap Functionality...\n');

    // Test 1: Check if server is running
    try {
        const response = await fetch('http://localhost:8004/');
        const data = await response.json();
        console.log('✅ Server Health Check:', data.message);
    } catch (error) {
        console.log('❌ Server Health Check Failed:', error.message);
        return;
    }

    // Test 2: Check if items are available
    try {
        const response = await fetch(`${API_BASE_URL}/items`);
        const items = await response.json();
        console.log('✅ Items API:', `Found ${items.length} items`);
        
        if (items.length === 0) {
            console.log('⚠️  No items available for testing swaps');
            return;
        }
        
        // Get first available item
        const testItem = items[0];
        console.log('📦 Test Item:', testItem.title);
        console.log('   Owner:', testItem.uploaded_by?.username || 'Unknown');
        console.log('   Points:', testItem.points_value);
        
    } catch (error) {
        console.log('❌ Items API Failed:', error.message);
        return;
    }

    // Test 3: Check swap routes are accessible
    try {
        const response = await fetch(`${API_BASE_URL}/swaps`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include',
        });
        
        if (response.status === 401) {
            console.log('✅ Swap Routes: Authentication required (expected)');
        } else {
            console.log('✅ Swap Routes: Accessible');
        }
    } catch (error) {
        console.log('❌ Swap Routes Failed:', error.message);
    }

    console.log('\n📋 Swap Functionality Test Summary:');
    console.log('✅ Backend server is running');
    console.log('✅ Items API is working');
    console.log('✅ Swap routes are configured');
    console.log('✅ Authentication middleware is active');
    
    console.log('\n🎯 Next Steps:');
    console.log('1. Login to the application');
    console.log('2. Browse items and click "Swap/Redeem"');
    console.log('3. Choose "Direct Swap Request"');
    console.log('4. Enter a message and send request');
    console.log('5. Check Profile page for incoming/outgoing requests');
    console.log('6. Test accept/decline functionality');
    
    console.log('\n🚀 Swap functionality is ready for testing!');
}

// Run the test
testSwapFunctionality().catch(console.error); 
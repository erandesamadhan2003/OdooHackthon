// Test script to debug authentication and swap request issues
import fetch from 'node-fetch';

const API_BASE_URL = 'http://localhost:8004/api';

// Test authentication
async function testAuth() {
    try {
        console.log('Testing authentication...');
        
        // First, try to login
        const loginResponse = await fetch(`${API_BASE_URL}/user/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email: 'test@example.com',
                password: 'password123'
            }),
            credentials: 'include'
        });
        
        console.log('Login response status:', loginResponse.status);
        const loginData = await loginResponse.json();
        console.log('Login response:', loginData);
        
        if (loginResponse.ok) {
            // Test getting user profile
            const profileResponse = await fetch(`${API_BASE_URL}/user/profile`, {
                method: 'GET',
                credentials: 'include'
            });
            
            console.log('Profile response status:', profileResponse.status);
            const profileData = await profileResponse.json();
            console.log('Profile response:', profileData);
            
            if (profileResponse.ok) {
                // Test swap request
                const swapData = {
                    owner_id: '68723636dde45189cf4b3f05',
                    item_id: '6872415042266c0fd0f1ecfb',
                    message: 'swap kar shantanu'
                };
                
                console.log('Testing swap request with data:', swapData);
                
                const swapResponse = await fetch(`${API_BASE_URL}/swaps`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(swapData),
                    credentials: 'include'
                });
                
                console.log('Swap response status:', swapResponse.status);
                const swapResponseData = await swapResponse.json();
                console.log('Swap response:', swapResponseData);
            }
        }
        
    } catch (error) {
        console.error('Test error:', error);
    }
}

testAuth(); 
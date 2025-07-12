import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useSignUp } from '@clerk/clerk-react'
import { Eye, EyeOff, User, Mail, Lock, UserPlus } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent } from '@/components/ui/card'

export const Signup = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  })
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const navigate = useNavigate()
  const { signUp } = useSignUp()

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
    if (error) setError('')
  }

  const validateForm = () => {
    if (!formData.username || !formData.email || !formData.password || !formData.confirmPassword) {
      setError('All fields are required')
      return false
    }
    
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match')
      return false
    }
    
    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters long')
      return false
    }
    
    return true
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setSuccess('')
    
    if (!validateForm()) return
    
    setLoading(true)
    
    try {
      const response = await fetch('http://localhost:8004/api/user/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          username: formData.username,
          email: formData.email,
          password: formData.password
        })
      })

      const data = await response.json()

      if (response.ok) {
        setSuccess('Account created successfully! Redirecting to login...')
        setTimeout(() => {
          navigate('/login')
        }, 2000)
      } else {
        setError(data.error || 'Registration failed')
      }
    } catch (err) {
      setError('Network error. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const handleSocialLogin = async (provider) => {
    try {
      await signUp.authenticateWithRedirect({
        strategy: `oauth_${provider}`,
        redirectUrl: '/',
        redirectUrlComplete: '/'
      })
    } catch (err) {
      setError(`${provider} signup failed. Please try again.`)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-purple-50 p-4">
      <div className="w-full max-w-md">
        <Card className="bg-white/90 border-gray-200 backdrop-blur-sm shadow-2xl">
          <CardContent className="p-8">
            {/* Avatar Circle */}
            <div className="flex justify-center mb-8">
              <div className="w-20 h-20 bg-purple-100 rounded-full flex items-center justify-center border-2 border-purple-200 shadow-lg">
                <UserPlus className="w-10 h-10 text-purple-600" />
              </div>
            </div>

            {/* Welcome Text */}
            <div className="text-center mb-8">
              <h1 className="text-2xl font-bold text-gray-900 mb-2">Create Account</h1>
              <p className="text-gray-600">Join us and start your journey today</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              {error && (
                <div className="p-3 text-sm text-red-700 bg-red-50 border border-red-200 rounded-lg">
                  {error}
                </div>
              )}
              
              {success && (
                <div className="p-3 text-sm text-green-700 bg-green-50 border border-green-200 rounded-lg">
                  {success}
                </div>
              )}
              
              {/* Clerk CAPTCHA container */}
              <div id="clerk-captcha"></div>
              
              {/* Field 1 - Username */}
              <div>
                <Input
                  name="username"
                  type="text"
                  placeholder="Username"
                  value={formData.username}
                  onChange={handleInputChange}
                  autoComplete="username"
                  className="h-12 bg-white border-gray-300 text-gray-900 placeholder-gray-500 rounded-lg focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 shadow-sm"
                  required
                />
              </div>

              {/* Field 2 - Email */}
              <div>
                <Input
                  name="email"
                  type="email"
                  placeholder="Email Address"
                  value={formData.email}
                  onChange={handleInputChange}
                  autoComplete="email"
                  className="h-12 bg-white border-gray-300 text-gray-900 placeholder-gray-500 rounded-lg focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 shadow-sm"
                  required
                />
              </div>

              {/* Field 3 - Password */}
              <div className="relative">
                <Input
                  name="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  value={formData.password}
                  onChange={handleInputChange}
                  autoComplete="new-password"
                  className="h-12 bg-white border-gray-300 text-gray-900 placeholder-gray-500 rounded-lg focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 shadow-sm pr-10"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>

              {/* Field 4 - Confirm Password */}
              <div className="relative">
                <Input
                  name="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="Confirm Password"
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  autoComplete="new-password"
                  className="h-12 bg-white border-gray-300 text-gray-900 placeholder-gray-500 rounded-lg focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 shadow-sm pr-10"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                >
                  {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>

              {/* Register Button */}
              <Button
                type="submit"
                disabled={loading}
                className="w-full h-12 bg-purple-600 hover:bg-purple-700 text-white font-medium rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl mt-6"
              >
                {loading ? (
                  <div className="flex items-center justify-center">
                    <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent mr-2"></div>
                    Creating Account...
                  </div>
                ) : (
                  'Create Account'
                )}
              </Button>
            </form>

            {/* Social Login Divider */}
            <div className="relative my-8">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-3 bg-white text-gray-500 font-medium">Or continue with</span>
              </div>
            </div>

            {/* Social Login Buttons */}
            <div className="space-y-3">
              {/* Google Login */}
              <Button
                type="button"
                variant="outline"
                className="w-full h-12 bg-white hover:bg-gray-50 text-gray-700 border-gray-300 rounded-lg flex items-center justify-center shadow-sm hover:shadow-md transition-all duration-200"
                onClick={() => handleSocialLogin('google')}
              >
                <svg className="w-5 h-5 mr-3" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                </svg>
                Continue with Google
              </Button>

              {/* Facebook Login */}
              <Button
                type="button"
                variant="outline"
                className="w-full h-12 bg-[#1877F2] hover:bg-[#166FE5] text-white border-[#1877F2] rounded-lg flex items-center justify-center shadow-sm hover:shadow-md transition-all duration-200"
                onClick={() => handleSocialLogin('facebook')}
              >
                <svg className="w-5 h-5 mr-3" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
                Continue with Facebook
              </Button>

              {/* Twitter Login */}
              <Button
                type="button"
                variant="outline"
                className="w-full h-12 bg-gray-900 hover:bg-gray-800 text-white border-gray-900 rounded-lg flex items-center justify-center shadow-sm hover:shadow-md transition-all duration-200"
                onClick={() => handleSocialLogin('twitter')}
              >
                <svg className="w-5 h-5 mr-3" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                </svg>
                Continue with X
              </Button>
            </div>

            {/* Link to Login */}
            <div className="text-center mt-8">
              <p className="text-gray-600 text-sm">
                Already have an account?{' '}
                <Link to="/login" className="text-purple-600 hover:text-purple-700 font-medium underline">
                  Sign in here
                </Link>
              </p>
            </div>
          </CardContent>
        </Card>

       
      
      </div>
    </div>
  )
}
import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { LogIn, UserPlus, Home as HomeIcon, Users, Shield, Zap } from 'lucide-react'

export const Home = () => {
  return (
    <div className="min-h-screen bg-blue-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <HomeIcon className="h-8 w-8 text-blue-600" />
              <span className="ml-2 text-xl font-bold text-gray-900">ReWear</span>
            </div>
            <div className="flex items-center space-x-4">
              <Link to="/login">
                <Button variant="outline" className="flex items-center">
                  <LogIn className="h-4 w-4 mr-2" />
                  Login
                </Button>
              </Link>
              <Link to="/signup">
                <Button className="flex items-center bg-blue-600 hover:bg-blue-700">
                  <UserPlus className="h-4 w-4 mr-2" />
                  Sign Up
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="px-4 sm:px-6 lg:px-8 py-16">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            Welcome to 
            <span className="text-blue-600"> ReWear</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Discover sustainable fashion and give your clothes a second life. Buy, sell, and swap pre-loved clothing with our community.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/signup">
              <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 text-lg">
                <UserPlus className="h-5 w-5 mr-2" />
                Get Started
              </Button>
            </Link>
            <Link to="/login">
              <Button size="lg" variant="outline" className="px-8 py-3 text-lg">
                <LogIn className="h-5 w-5 mr-2" />
                Sign In
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="px-4 sm:px-6 lg:px-8 py-16 bg-white/50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Why Choose ReWear?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="text-center border-0 shadow-lg bg-white/80 backdrop-blur-sm">
              <CardHeader>
                <div className="mx-auto w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                  <Users className="h-8 w-8 text-blue-600" />
                </div>
                <CardTitle className="text-xl font-semibold text-gray-900">
                  Sustainable Fashion
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-gray-600">
                  Join our community committed to sustainable fashion. Reduce waste by giving clothes a second life through buying and selling.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="text-center border-0 shadow-lg bg-white/80 backdrop-blur-sm">
              <CardHeader>
                <div className="mx-auto w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mb-4">
                  <Shield className="h-8 w-8 text-purple-600" />
                </div>
                <CardTitle className="text-xl font-semibold text-gray-900">
                  Secure Shopping
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-gray-600">
                  Shop with confidence. Our secure platform ensures safe transactions and protects both buyers and sellers.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="text-center border-0 shadow-lg bg-white/80 backdrop-blur-sm">
              <CardHeader>
                <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
                  <Zap className="h-8 w-8 text-green-600" />
                </div>
                <CardTitle className="text-xl font-semibold text-gray-900">
                  Easy Trading
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-gray-600">
                  Simple and intuitive platform to buy, sell, or swap your clothes. List items quickly and discover unique pieces.
                </CardDescription>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="px-4 sm:px-6 lg:px-8 py-16">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">
            Ready to Get Started?
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            Join thousands of fashion lovers who are already trading clothes sustainably with ReWear.
          </p>
          <Link to="/signup">              <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 text-lg">
                Start Trading
              </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="flex items-center justify-center mb-4">
              <HomeIcon className="h-6 w-6 mr-2" />
              <span className="text-lg font-semibold">ReWear</span>
            </div>
            <p className="text-gray-400">
              © 2025 ReWear. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}
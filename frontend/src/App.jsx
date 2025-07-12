import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './App.css'
import { Home } from './pages/Home'
import { Login } from './pages/auth/Login'
import { Signup } from './pages/auth/Signup'
import { Profile } from './pages/Profile'
import { Browse } from './pages/Browse'
import { ItemListing } from './pages/ItemListing'
import { ItemDetail } from './pages/ItemDetail'
import { ProductDetailPage } from './pages/ProductDetailPage'
import { AdminDashboard } from './pages/AdminDashboard';
import { AdminRoute } from './components/auth/AdminRoute';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />
  },  {
    path: '/login',
    element: <Login />
  },
  {
    path: '/signup',
    element: <Signup />
  },
  {
    path: '/profile',
    element: <Profile />
  },
  {
    path: '/browse',
    element: <Browse />
  },
  {
    path: '/list-item',
    element: <ItemListing />
  },
  {
    path: '/item/:id',
    element: <ItemDetail />
  },
  {
    path: '/product-detail/:id',
    element: <ProductDetailPage />
  },
  {
    path: '/admin',
    element: <AdminRoute><AdminDashboard /></AdminRoute>
  },
])

const App = () => {
  return (
    <RouterProvider router={router}></RouterProvider>
  )
}

export default App

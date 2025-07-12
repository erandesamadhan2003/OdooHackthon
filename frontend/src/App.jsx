import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './App.css'
import { Home } from './pages/Home'
import { Login } from './pages/auth/Login'
import { Signup } from './pages/auth/Signup'

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
])

const App = () => {

  return (
    <>
      <RouterProvider router={router}></RouterProvider>
    
    </>
  )
}

export default App

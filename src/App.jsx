import { Route, Routes } from 'react-router-dom'
import './App.css'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import NotFound from './pages/NotFound'
import ApartmentDetails from './pages/ApartmentDetails'
import ApartmentForm from './pages/ApartmentForm'
import Register from './pages/Register'
import Login from './pages/Login'
import ProtectedRoute from './components/ProtectedRoute'
import Profile from './pages/Profile'

function App() {
  return (
    <>
      <Navbar />

      <div className="container mt-5">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/profile" element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          } />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />

          <Route path="/apartments/add" element={<ApartmentForm />} />
          <Route path="/apartments/edit/:id" element={<ApartmentForm />} />
          <Route path="/apartments/:id" element={<ApartmentDetails />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>


    </>
  )
}

export default App


import { Route, Routes } from 'react-router-dom'
import './App.css'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import NotFound from './pages/NotFound'
import FilmsDetails from "./pages/FilmsDetails"
import TrailerPage from "./pages/TrailerPage"
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
          <Route path="/details/:id" element={
            <ProtectedRoute>
              <FilmsDetails/>
            </ProtectedRoute>
          }/>
          <Route path='/movie/:id/trailer' element={<TrailerPage/>}/>
          <Route path="/profile" element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          } />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>


    </>
  )
}

export default App


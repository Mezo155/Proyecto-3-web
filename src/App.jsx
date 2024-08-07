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
import Comment from './pages/Comment'
import EditProfile from './pages/EditProfile'
import DiscoverMoviesComponent from './pages/FindFilms'
import MovieSearch from './components/MovieSearch'

function App() {
  return (
    <>
      <Navbar />

      <div className="container mt-5">
        <Routes>
          <Route path='/movie/discover' element={<DiscoverMoviesComponent/>}/>
          <Route path="/comments/:filmId" element={<Comment/>}/>
          <Route path="/" element={<Home />} />
          <Route path="/search" element={< MovieSearch/>} />
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
          <Route path="/profile/edit" element={<EditProfile />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>


    </>
  )
}

export default App


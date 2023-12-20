import { BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import { useState } from 'react'
import 'react-toastify/dist/ReactToastify.css'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import PrivateRoute from './components/PrivateRoute'
import Home from './pages/Home'
import Movies from './pages/Movies'
import MovieDetails from './pages/MovieDetails'
import ShowDetails from './pages/ShowDetails'
import Shows from './pages/Shows'
import Search from './pages/Search'
import Profile from './pages/Profile'
import SignIn from './pages/SignIn'
import SignUp from './pages/SignUp'
import ForgotPassword from './pages/ForgotPassword'
import Discover from './pages/Discover'
import DiscoverModal from './components/DiscoverModal'
import Swiper from 'swiper'
import { TMDBProvider } from './context/TMDBContext/TMDBContext'



function App() {
  const [isModalOpen, setModalOpen] = useState(false);

  const handleOpenModal = () => setModalOpen(true);
  const handleCloseModal = () => setModalOpen(false);


  return (
    <>
      <TMDBProvider>
      <Router>
      <Navbar onDiscoverClick={handleOpenModal} />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/search' element={<Search />} />
          <Route path='/movies' element={<Movies />} />
          <Route path='/movie-details' element={<MovieDetails />} />
          <Route path='/shows' element={<Shows />} />
          <Route path='/tv-details' element={<ShowDetails />} />

          <Route path='/profile' element={<PrivateRoute />}>
            <Route path='/profile' element={<Profile />} />
          </Route>

          <Route path='/sign-in' element={<SignIn />} />
          <Route path='/sign-up' element={<SignUp />} />
          <Route path='/forgot-password' element={<ForgotPassword />} />
        </Routes>

        <DiscoverModal isOpen={isModalOpen} onClose={handleCloseModal} /> 
      </Router>

      <ToastContainer theme="dark" />
      </TMDBProvider>
    </>
  );
}

export default App;

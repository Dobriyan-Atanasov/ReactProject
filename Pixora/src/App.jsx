import { Route, Routes } from 'react-router'
import { usePageEffects } from './usePageEffects'
import Header from './components/Header'
import Hero from './components/Hero'
import Portfolio from './components/Portfolio'
import About from './components/About'
import Services from './components/Services'
import Contact from './components/Contact'
import Footer from './components/Footer'
import Login from './components/Login'
import Profile from './components/Profile'
import Register from './components/Register'
import PhotoDetails from './components/PhotoDetails'
import PhotoCreate from './components/PhotoCreate'
import PhotoEdit from './components/PhotoEdit'

function App() {
  usePageEffects()

  return (
    <>
      <Header />

      <Routes>
        <Route path="/" element={<Hero />} />
        <Route path="/portfolio" element={<Portfolio />} />
        <Route path="/about" element={<About />} />
        <Route path="/services" element={<Services />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/login" element={<Login />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/register" element={<Register />} />
        <Route path="/photos/create" element={<PhotoCreate />} />
        <Route path="/photos/:id/edit" element={<PhotoEdit />} />
        <Route
          path="/photos/:id"
          element={
            <>
              <Portfolio key="photo-details" />
              <PhotoDetails />
            </>
          }
        />
      </Routes>

      <Footer />
    </>
  )
}

export default App
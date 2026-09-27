import { Route, Routes } from 'react-router'
import { usePageEffects } from "./usePageEffects"
import Header from "./components/Header"
import Hero from "./components/Hero"
import Portfolio from "./components/Portfolio"
import About from "./components/About"
import Services from "./components/Services"
import Contact from "./components/Contact"
import Footer from "./components/Footer"


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
      </Routes>

      <Footer />
    </>
  )
}

export default App

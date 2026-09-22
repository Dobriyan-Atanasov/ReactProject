import { useEffect } from "react"
import { initTemplate } from "./template"
import Header from "./components/Header"
import Hero from "./components/Hero"
import Portfolio from "./components/Portfolio"
import About from "./components/About"
import Services from "./components/Services"
import Contact from "./components/Contact"
import Footer from "./components/Footer"

function App() {
  useEffect(() => initTemplate(), [])

  return (
    <>
      <Header />
      <Hero />
      <Portfolio />
      <About />
      <Services />
      <Contact />
      <Footer />
    </>
  )
}

export default App

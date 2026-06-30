import { Routes, Route } from 'react-router-dom'
import Navbar from './components/layout/Navbar'
import Footer from './components/layout/Footer'
import Home from './pages/Home'
import LiveDetection from './pages/LiveDetection'
import UploadImage from './pages/UploadImage'
import UploadVideo from './pages/UploadVideo'
import Dashboard from './pages/Dashboard'
import Features from './pages/Features'
import About from './pages/About'
import Contact from './pages/Contact'
import AnimatedBackground from './components/ui/AnimatedBackground'

function App() {
  return (
    <div className="flex flex-col min-h-screen">
      <AnimatedBackground />
      <Navbar />
      <main className="flex-grow pt-20 relative z-10">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/live" element={<LiveDetection />} />
          <Route path="/image" element={<UploadImage />} />
          <Route path="/video" element={<UploadVideo />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/features" element={<Features />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </main>
      <Footer />
    </div>
  )
}

export default App

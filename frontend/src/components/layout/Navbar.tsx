import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { FiMenu, FiX, FiCamera } from 'react-icons/fi'

const navLinks = [
  { name: 'Home', path: '/' },
  { name: 'Live Detection', path: '/live' },
  { name: 'Upload Image', path: '/image' },
  { name: 'Upload Video', path: '/video' },
  { name: 'Dashboard', path: '/dashboard' },
  { name: 'Features', path: '/features' },
  { name: 'About', path: '/about' },
  { name: 'Contact', path: '/contact' },
]

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const location = useLocation()

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <nav className={`fixed w-full z-50 transition-all duration-500 ${scrolled ? 'glass py-3 backdrop-blur-xl' : 'bg-transparent py-5'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          <Link to="/" className="flex items-center gap-3 group">
            <motion.div 
              whileHover={{ rotate: 15, scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="p-2.5 bg-gradient-to-br from-primary/30 to-secondary/30 rounded-xl group-hover:from-primary/40 group-hover:to-secondary/40 transition-colors shadow-inner shadow-white/10"
            >
              <FiCamera className="text-white text-xl" />
            </motion.div>
            <span className="font-heading font-extrabold text-2xl tracking-tight text-white group-hover:text-primary transition-colors">Focus<span className="text-primary group-hover:text-white transition-colors">AI</span></span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-1">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className="relative px-4 py-2 rounded-lg text-sm font-medium transition-colors group"
              >
                <span className={`relative z-10 ${location.pathname === link.path ? 'text-white' : 'text-gray-400 group-hover:text-white'}`}>
                  {link.name}
                </span>
                {location.pathname === link.path && (
                  <motion.div 
                    layoutId="navbar-indicator"
                    className="absolute inset-0 bg-white/10 border border-white/10 rounded-lg -z-0"
                    initial={false}
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
                {location.pathname !== link.path && (
                  <div className="absolute inset-0 bg-white/5 border border-white/5 rounded-lg -z-0 opacity-0 group-hover:opacity-100 transition-opacity" />
                )}
              </Link>
            ))}
            <Link to="/live">
              <motion.button 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="ml-6 px-6 py-2 bg-white text-black rounded-full font-bold transition-all shadow-[0_0_20px_rgba(255,255,255,0.3)] hover:shadow-[0_0_30px_rgba(255,255,255,0.5)]"
              >
                Get Started
              </motion.button>
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-300 hover:text-white focus:outline-none p-2 bg-white/5 rounded-lg border border-white/10"
            >
              {isOpen ? <FiX size={24} /> : <FiMenu size={24} />}
            </motion.button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0, y: -20 }}
            animate={{ opacity: 1, height: 'auto', y: 0 }}
            exit={{ opacity: 0, height: 0, y: -20 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="md:hidden glass border-t border-white/5 mt-3 overflow-hidden origin-top"
          >
            <div className="px-4 pt-4 pb-6 space-y-2">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  onClick={() => setIsOpen(false)}
                  className={`block px-4 py-3 rounded-xl text-base font-medium transition-all ${
                    location.pathname === link.path 
                      ? 'text-white bg-white/10 border border-white/10' 
                      : 'text-gray-400 hover:text-white hover:bg-white/5'
                  }`}
                >
                  {link.name}
                </Link>
              ))}
              <Link 
                to="/live" 
                onClick={() => setIsOpen(false)}
                className="block w-full text-center mt-6 px-5 py-4 bg-white text-black rounded-xl font-bold shadow-lg"
              >
                Get Started
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  )
}

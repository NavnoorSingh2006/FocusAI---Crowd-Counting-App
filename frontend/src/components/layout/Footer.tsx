import { Link } from 'react-router-dom'
import { FiCamera, FiTwitter, FiGithub, FiLinkedin } from 'react-icons/fi'

export default function Footer() {
  return (
    <footer className="border-t border-white/5 bg-background mt-20 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-8">
          <div className="col-span-1 md:col-span-2">
            <Link to="/" className="flex items-center gap-2 group mb-4">
              <div className="p-2 bg-primary/20 rounded-lg">
                <FiCamera className="text-primary text-xl" />
              </div>
              <span className="font-heading font-bold text-xl tracking-tight">Focus<span className="text-primary">AI</span></span>
            </Link>
            <p className="text-gray-400 max-w-sm mb-6">
              Advanced real-time face detection and crowd counting powered by cutting-edge Computer Vision and Artificial Intelligence.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-primary transition-colors p-2 hover:bg-white/5 rounded-full"><FiTwitter size={20} /></a>
              <a href="#" className="text-gray-400 hover:text-primary transition-colors p-2 hover:bg-white/5 rounded-full"><FiGithub size={20} /></a>
              <a href="#" className="text-gray-400 hover:text-primary transition-colors p-2 hover:bg-white/5 rounded-full"><FiLinkedin size={20} /></a>
            </div>
          </div>
          
          <div>
            <h3 className="font-heading font-semibold text-white mb-4">Product</h3>
            <ul className="space-y-3">
              <li><Link to="/live" className="text-gray-400 hover:text-white transition-colors">Live Detection</Link></li>
              <li><Link to="/image" className="text-gray-400 hover:text-white transition-colors">Image Upload</Link></li>
              <li><Link to="/video" className="text-gray-400 hover:text-white transition-colors">Video Processing</Link></li>
              <li><Link to="/dashboard" className="text-gray-400 hover:text-white transition-colors">Analytics Dashboard</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-heading font-semibold text-white mb-4">Company</h3>
            <ul className="space-y-3">
              <li><Link to="/about" className="text-gray-400 hover:text-white transition-colors">About Us</Link></li>
              <li><Link to="/features" className="text-gray-400 hover:text-white transition-colors">Features</Link></li>
              <li><Link to="/contact" className="text-gray-400 hover:text-white transition-colors">Contact</Link></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Privacy Policy</a></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-white/5 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-500 text-sm">
            &copy; {new Date().getFullYear()} FocusAI. All rights reserved.
          </p>
          <div className="flex gap-4 text-sm text-gray-500">
            <span>Powered by FastAPI & React</span>
          </div>
        </div>
      </div>
    </footer>
  )
}

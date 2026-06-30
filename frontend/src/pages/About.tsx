import { motion } from 'framer-motion'
import { FiCheckCircle } from 'react-icons/fi'

export default function About() {
  return (
    <div className="w-full pt-10 pb-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center mb-16">
          <motion.h1 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="font-heading text-4xl md:text-5xl font-bold mb-4"
          >
            About <span className="text-primary">FocusAI</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1 }}
            className="text-gray-400 text-lg"
          >
            Building the next generation of computer vision analytics.
          </motion.p>
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="glass p-8 md:p-12 rounded-3xl"
        >
          <div className="prose prose-invert max-w-none">
            <h2 className="text-2xl font-heading font-semibold text-white mb-4">Purpose of Project</h2>
            <p className="text-gray-400 mb-8 leading-relaxed">
              FocusAI was created to provide a seamless, high-performance web interface for real-time face detection and crowd counting. Traditional computer vision applications often require complex local setups, powerful hardware, and native software. Our goal is to bring enterprise-grade machine learning directly to the browser, making crowd analytics accessible, fast, and beautifully designed.
            </p>

            <h2 className="text-2xl font-heading font-semibold text-white mb-4">Technology Stack</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div className="bg-white/5 border border-white/10 rounded-xl p-6">
                <h3 className="text-primary font-semibold mb-3">Frontend</h3>
                <ul className="space-y-2 text-gray-400">
                  <li className="flex items-center gap-2"><FiCheckCircle className="text-success" /> React.js (Vite)</li>
                  <li className="flex items-center gap-2"><FiCheckCircle className="text-success" /> TypeScript</li>
                  <li className="flex items-center gap-2"><FiCheckCircle className="text-success" /> Tailwind CSS</li>
                  <li className="flex items-center gap-2"><FiCheckCircle className="text-success" /> Framer Motion</li>
                </ul>
              </div>
              <div className="bg-white/5 border border-white/10 rounded-xl p-6">
                <h3 className="text-secondary font-semibold mb-3">Backend</h3>
                <ul className="space-y-2 text-gray-400">
                  <li className="flex items-center gap-2"><FiCheckCircle className="text-success" /> Python & FastAPI</li>
                  <li className="flex items-center gap-2"><FiCheckCircle className="text-success" /> OpenCV</li>
                  <li className="flex items-center gap-2"><FiCheckCircle className="text-success" /> MediaPipe ML</li>
                  <li className="flex items-center gap-2"><FiCheckCircle className="text-success" /> SQLite</li>
                </ul>
              </div>
            </div>

            <h2 className="text-2xl font-heading font-semibold text-white mb-4">Architecture & Workflow</h2>
            <p className="text-gray-400 mb-8 leading-relaxed">
              The application uses a decoupled architecture. The React frontend handles UI rendering and captures webcam frames or media files. For live detection, it establishes a WebSocket connection with the FastAPI backend, streaming base64 encoded frames. The backend utilizes MediaPipe's highly optimized neural networks to perform inference, calculates bounding boxes, and streams the coordinates back to the client in real-time. This ensures zero-latency rendering while offloading heavy ML processing.
            </p>

            <h2 className="text-2xl font-heading font-semibold text-white mb-4">Future Scope</h2>
            <ul className="space-y-3 text-gray-400 mb-8">
              <li className="flex items-start gap-3">
                <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2"></span>
                <span><strong>Emotion Recognition:</strong> Expanding the ML models to detect sentiment (happy, sad, neutral) of the crowd.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2"></span>
                <span><strong>Demographic Analysis:</strong> Estimating age ranges and gender distribution within large crowds.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2"></span>
                <span><strong>Edge Computing:</strong> Moving the MediaPipe models directly to the browser via WebAssembly for 100% offline usage.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2"></span>
                <span><strong>Multi-Camera Grids:</strong> Supporting simultaneous monitoring of multiple RTSP IP camera streams on a single dashboard.</span>
              </li>
            </ul>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

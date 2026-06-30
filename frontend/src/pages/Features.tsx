import { motion } from 'framer-motion'
import { FiCpu, FiCamera, FiVideo, FiZap, FiBarChart2, FiShield, FiCode, FiLayers, FiActivity, FiMonitor } from 'react-icons/fi'

export default function Features() {
  const features = [
    {
      icon: FiZap,
      title: "Real-Time Detection",
      description: "Process live webcam feeds instantly using WebSockets and MediaPipe. Experience zero latency face detection running continuously in the browser.",
    },
    {
      icon: FiCamera,
      title: "Image Detection",
      description: "Upload static images in various formats (JPG, PNG, WebP) and instantly receive processed images with bounding boxes and confidence scores.",
    },
    {
      icon: FiVideo,
      title: "Video Detection",
      description: "Process recorded videos frame by frame to track and count faces over time. See a progress bar and timeline of detections.",
    },
    {
      icon: FiCode,
      title: "Fast API Backend",
      description: "High-performance Python backend built with FastAPI, providing concurrent processing and blazing fast API responses.",
    },
    {
      icon: FiLayers,
      title: "OpenCV Processing",
      description: "Advanced image manipulation, format conversion, and drawing utilizing the industry standard OpenCV library.",
    },
    {
      icon: FiCpu,
      title: "Machine Learning",
      description: "State-of-the-art neural network face detection models. Accurate in various lighting conditions and capable of detecting partially occluded faces.",
    },
    {
      icon: FiBarChart2,
      title: "Analytics Dashboard",
      description: "Track all your processing statistics in real-time. View historical data, face counts, and system performance metrics.",
    },
    {
      icon: FiMonitor,
      title: "Screenshot Capture",
      description: "Take high-quality snapshots of your live detections at any moment. Save the processed frames directly to your device.",
    },
    {
      icon: FiActivity,
      title: "Video Recording",
      description: "Record your live processing sessions and save them as video files. Perfect for documenting crowd analytics over time.",
    },
    {
      icon: FiShield,
      title: "Responsive Design",
      description: "A flawless, pixel-perfect user interface that works beautifully on any device, from massive desktop monitors to mobile phones.",
    }
  ]

  return (
    <div className="w-full pt-10 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center mb-16">
          <motion.h1 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="font-heading text-4xl md:text-5xl font-bold mb-4"
          >
            Powerful <span className="text-primary">Features</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1 }}
            className="text-gray-400 max-w-2xl mx-auto text-lg"
          >
            Everything you need for advanced computer vision and crowd analytics, built into a single platform.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className="glass-card p-8 group hover:border-primary/50 transition-all hover:-translate-y-1"
            >
              <div className="w-14 h-14 bg-primary/10 rounded-2xl flex items-center justify-center mb-6 text-primary group-hover:scale-110 group-hover:bg-primary group-hover:text-white transition-all shadow-lg">
                <feature.icon size={28} />
              </div>
              <h3 className="font-heading font-semibold text-xl mb-3 text-white">{feature.title}</h3>
              <p className="text-gray-400 text-sm leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>

      </div>
    </div>
  )
}

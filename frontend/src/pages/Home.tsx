import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { FiCamera, FiUploadCloud, FiVideo, FiBarChart2, FiCpu, FiShield, FiZap } from 'react-icons/fi'
import SpotlightCard from '../components/ui/SpotlightCard'

export default function Home() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.15 } }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 40, scale: 0.95 },
    visible: { opacity: 1, y: 0, scale: 1, transition: { type: 'spring', stiffness: 100, damping: 20 } }
  }

  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="relative pt-20 pb-32 overflow-hidden">
        {/* Abstract background elements */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/20 rounded-full blur-[120px] -z-10 animate-blob"></div>
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-secondary/10 rounded-full blur-[100px] -z-10 animate-blob animation-delay-2000"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="max-w-3xl mx-auto"
          >
            <motion.div 
              whileHover={{ scale: 1.05 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-sm text-primary mb-8 cursor-pointer shadow-lg backdrop-blur-md"
            >
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
              v2.0 Model Now Live
            </motion.div>
            
            <h1 className="font-heading text-6xl md:text-8xl font-bold tracking-tighter mb-8 leading-tight">
              AI Face Detection & <br />
              <span className="text-gradient drop-shadow-2xl">Crowd Counter</span>
            </h1>
            
            <p className="text-lg md:text-2xl text-gray-300 mb-12 max-w-2xl mx-auto font-light leading-relaxed">
              Real-time face detection powered by Computer Vision and Artificial Intelligence. 
              Process webcam feeds, images, and videos with zero latency.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
              <Link to="/live" className="w-full sm:w-auto">
                <motion.div 
                  whileHover={{ scale: 1.05, boxShadow: "0px 0px 40px rgba(59, 130, 246, 0.8)" }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-4 bg-primary text-white rounded-xl font-bold transition-all flex items-center justify-center gap-3 text-lg"
                >
                  <motion.div animate={{ rotate: [0, 10, -10, 0] }} transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}>
                    <FiCamera size={24} />
                  </motion.div>
                  Start Live Detection
                </motion.div>
              </Link>
              
              <Link to="/image" className="w-full sm:w-auto">
                <motion.div 
                  whileHover={{ scale: 1.05, backgroundColor: "rgba(255,255,255,0.15)" }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-4 bg-white/5 border border-white/10 text-white rounded-xl font-semibold transition-all backdrop-blur-md flex items-center justify-center gap-3 text-lg hover:shadow-[0_0_20px_rgba(255,255,255,0.1)]"
                >
                  <FiUploadCloud size={24} className="text-gray-300" />
                  Upload Image
                </motion.div>
              </Link>
              
              <Link to="/video" className="w-full sm:w-auto">
                <motion.div 
                  whileHover={{ scale: 1.05, backgroundColor: "rgba(255,255,255,0.15)" }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-4 bg-white/5 border border-white/10 text-white rounded-xl font-semibold transition-all backdrop-blur-md flex items-center justify-center gap-3 text-lg hover:shadow-[0_0_20px_rgba(255,255,255,0.1)]"
                >
                  <FiVideo size={24} className="text-gray-300" />
                  Upload Video
                </motion.div>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 border-y border-white/5 bg-black/20 backdrop-blur-3xl relative z-10 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-transparent to-secondary/5 pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-20">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={containerVariants}
            className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center"
          >
            {[
              { label: 'Detection Accuracy', value: '99.8%' },
              { label: 'Processing Speed', value: '< 20ms' },
              { label: 'Max Faces/Frame', value: '100+' },
              { label: 'Uptime', value: '99.99%' },
            ].map((stat, i) => (
              <motion.div key={i} variants={itemVariants} className="p-4 rounded-2xl hover:bg-white/5 transition-colors cursor-default">
                <motion.div 
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  transition={{ type: "spring", delay: 0.2 + (i * 0.1) }}
                  className="font-heading text-4xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-br from-white to-gray-500 mb-2 drop-shadow-md"
                >
                  {stat.value}
                </motion.div>
                <div className="text-sm md:text-base text-gray-400 font-medium tracking-wide uppercase">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-32 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-20"
          >
            <h2 className="font-heading text-4xl md:text-6xl font-bold mb-6 tracking-tight">Enterprise-Grade Architecture</h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto font-light">Built with modern web technologies for maximum performance, striking visuals, and absolute reliability.</p>
          </motion.div>

          <motion.div 
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {[
              { icon: FiZap, title: 'Real-Time Processing', desc: 'Zero-latency WebSocket streaming for instant webcam detection.' },
              { icon: FiCpu, title: 'AI Powered', desc: 'Utilizing advanced MediaPipe ML models for highly accurate facial mapping.' },
              { icon: FiBarChart2, title: 'Live Analytics', desc: 'Comprehensive dashboard for monitoring total detections and history.' },
              { icon: FiShield, title: 'Privacy First', desc: 'All processing can be done entirely on device without saving streams.' },
              { icon: FiCamera, title: 'Multi-Source', desc: 'Support for webcams, images, and pre-recorded video files.' },
              { icon: FiUploadCloud, title: 'FastAPI Backend', desc: 'High-performance Python backend serving concurrent analytical requests.' },
            ].map((feature, i) => (
              <motion.div key={i} variants={itemVariants}>
                <SpotlightCard className="p-8 h-full border border-white/10 group">
                  <motion.div 
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    className="w-16 h-16 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-2xl flex items-center justify-center mb-6 text-primary shadow-inner shadow-primary/20 border border-primary/20"
                  >
                    <feature.icon size={32} />
                  </motion.div>
                  <h3 className="font-heading font-bold text-2xl mb-3 text-white group-hover:text-primary transition-colors">{feature.title}</h3>
                  <p className="text-gray-400 text-base leading-relaxed">{feature.desc}</p>
                </SpotlightCard>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
    </div>
  )
}

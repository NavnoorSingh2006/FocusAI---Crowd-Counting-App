import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { FiUsers, FiImage, FiVideo, FiCamera } from 'react-icons/fi'
import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer,
  PieChart, Pie, Cell
} from 'recharts'
import axios from 'axios'
import SpotlightCard from '../components/ui/SpotlightCard'

const API_URL = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1' 
  ? 'http://localhost:8000/api' 
  : 'https://antigrav-backend-55.loca.lt/api'

export default function Dashboard() {
  const [stats, setStats] = useState({
    totalImages: 0,
    totalVideos: 0,
    totalWebcamSessions: 0,
    totalFaces: 0
  })

  // Mock data for charts since we don't have historical timeseries in the simple SQLite yet
  const historyData = [
    { name: 'Mon', faces: 120 },
    { name: 'Tue', faces: 180 },
    { name: 'Wed', faces: 250 },
    { name: 'Thu', faces: 190 },
    { name: 'Fri', faces: 320 },
    { name: 'Sat', faces: 450 },
    { name: 'Sun', faces: 280 },
  ]

  const sourceData = [
    { name: 'Images', value: stats.totalImages, color: '#3B82F6' },
    { name: 'Videos', value: stats.totalVideos, color: '#8B5CF6' },
    { name: 'Webcam', value: stats.totalWebcamSessions, color: '#22C55E' },
  ].filter(item => item.value > 0)

  // Default if all 0
  const renderSourceData = sourceData.length > 0 ? sourceData : [{ name: 'No Data', value: 1, color: '#4B5563' }]

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await axios.get(`${API_URL}/stats`)
        setStats(response.data)
      } catch (error) {
        console.error("Failed to fetch stats", error)
      }
    }
    fetchStats()
    const interval = setInterval(fetchStats, 5000)
    return () => clearInterval(interval)
  }, [])

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 100 } }
  }

  return (
    <div className="w-full pt-10 pb-20 relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12"
        >
          <h1 className="font-heading text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-400 mb-3 drop-shadow-lg">Analytics Dashboard</h1>
          <p className="text-gray-400 text-lg font-light">Real-time overview of your detection system.</p>
        </motion.div>

        {/* Stats Cards */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12"
        >
          <motion.div variants={itemVariants} className="h-full">
            <SpotlightCard className="p-6 h-full">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <p className="text-gray-400 text-sm font-medium mb-1 uppercase tracking-wider">Total Faces Detected</p>
                  <h3 className="text-4xl font-heading font-extrabold text-white">{stats.totalFaces.toLocaleString()}</h3>
                </div>
                <motion.div whileHover={{ scale: 1.1, rotate: 10 }} className="p-3 bg-primary/20 text-primary rounded-2xl shadow-inner shadow-primary/20"><FiUsers size={24} /></motion.div>
              </div>
              <div className="text-xs text-success flex items-center gap-1 font-semibold">+12% from last week</div>
            </SpotlightCard>
          </motion.div>

          <motion.div variants={itemVariants} className="h-full">
            <SpotlightCard className="p-6 h-full">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <p className="text-gray-400 text-sm font-medium mb-1 uppercase tracking-wider">Images Processed</p>
                  <h3 className="text-4xl font-heading font-extrabold text-white">{stats.totalImages.toLocaleString()}</h3>
                </div>
                <motion.div whileHover={{ scale: 1.1, rotate: 10 }} className="p-3 bg-secondary/20 text-secondary rounded-2xl shadow-inner shadow-secondary/20"><FiImage size={24} /></motion.div>
              </div>
              <div className="text-xs text-gray-500 font-medium">Total API calls</div>
            </SpotlightCard>
          </motion.div>

          <motion.div variants={itemVariants} className="h-full">
            <SpotlightCard className="p-6 h-full">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <p className="text-gray-400 text-sm font-medium mb-1 uppercase tracking-wider">Videos Processed</p>
                  <h3 className="text-4xl font-heading font-extrabold text-white">{stats.totalVideos.toLocaleString()}</h3>
                </div>
                <motion.div whileHover={{ scale: 1.1, rotate: 10 }} className="p-3 bg-warning/20 text-warning rounded-2xl shadow-inner shadow-warning/20"><FiVideo size={24} /></motion.div>
              </div>
              <div className="text-xs text-gray-500 font-medium">Total API calls</div>
            </SpotlightCard>
          </motion.div>

          <motion.div variants={itemVariants} className="h-full">
            <SpotlightCard className="p-6 h-full">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <p className="text-gray-400 text-sm font-medium mb-1 uppercase tracking-wider">Webcam Sessions</p>
                  <h3 className="text-4xl font-heading font-extrabold text-white">{stats.totalWebcamSessions.toLocaleString()}</h3>
                </div>
                <motion.div whileHover={{ scale: 1.1, rotate: 10 }} className="p-3 bg-success/20 text-success rounded-2xl shadow-inner shadow-success/20"><FiCamera size={24} /></motion.div>
              </div>
              <div className="text-xs text-gray-500 font-medium">Total sessions recorded</div>
            </SpotlightCard>
          </motion.div>
        </motion.div>

        {/* Charts */}
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="grid grid-cols-1 lg:grid-cols-3 gap-8"
        >
          
          <SpotlightCard className="lg:col-span-2 p-8 h-[450px]">
            <h3 className="font-heading font-bold text-xl text-white mb-8 border-b border-white/10 pb-4">Detection History (7 Days)</h3>
            <ResponsiveContainer width="100%" height="80%">
              <AreaChart data={historyData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorFaces" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#3B82F6" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#ffffff08" vertical={false} />
                <XAxis dataKey="name" stroke="#6B7280" tick={{ fill: '#6B7280' }} axisLine={false} tickLine={false} dy={10} />
                <YAxis stroke="#6B7280" tick={{ fill: '#6B7280' }} axisLine={false} tickLine={false} dx={-10} />
                <RechartsTooltip 
                  contentStyle={{ backgroundColor: 'rgba(24, 24, 27, 0.9)', backdropFilter: 'blur(10px)', borderColor: '#333', borderRadius: '12px', color: '#fff', boxShadow: '0 10px 25px rgba(0,0,0,0.5)' }}
                  itemStyle={{ color: '#3B82F6', fontWeight: 'bold' }}
                />
                <Area type="monotone" dataKey="faces" stroke="#3B82F6" strokeWidth={4} fillOpacity={1} fill="url(#colorFaces)" />
              </AreaChart>
            </ResponsiveContainer>
          </SpotlightCard>

          <SpotlightCard className="lg:col-span-1 p-8 h-[450px]">
            <h3 className="font-heading font-bold text-xl text-white mb-8 border-b border-white/10 pb-4">Usage by Source</h3>
            <ResponsiveContainer width="100%" height="70%">
              <PieChart>
                <Pie
                  data={renderSourceData}
                  cx="50%"
                  cy="50%"
                  innerRadius={70}
                  outerRadius={110}
                  paddingAngle={5}
                  dataKey="value"
                  stroke="none"
                >
                  {renderSourceData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <RechartsTooltip 
                  contentStyle={{ backgroundColor: 'rgba(24, 24, 27, 0.9)', backdropFilter: 'blur(10px)', borderColor: '#333', borderRadius: '12px', color: '#fff', boxShadow: '0 10px 25px rgba(0,0,0,0.5)' }}
                />
              </PieChart>
            </ResponsiveContainer>
            <div className="flex justify-center gap-6 mt-6">
              {renderSourceData.map((entry, i) => (
                <motion.div whileHover={{ scale: 1.1 }} key={i} className="flex items-center gap-2 text-sm text-gray-300 font-medium cursor-default">
                  <span className="w-3 h-3 rounded-full shadow-[0_0_10px_currentColor]" style={{ backgroundColor: entry.color, color: entry.color }}></span>
                  {entry.name}
                </motion.div>
              ))}
            </div>
          </SpotlightCard>

        </motion.div>

      </div>
    </div>
  )
}

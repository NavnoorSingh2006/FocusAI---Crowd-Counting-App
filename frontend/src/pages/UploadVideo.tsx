import React, { useState, useRef } from 'react'
import { motion } from 'framer-motion'
import { FiVideo, FiUploadCloud, FiActivity, FiClock, FiCheckCircle } from 'react-icons/fi'

// This is a simplified Mock for video processing, as real video processing via browser 
// requires WebRTC/Canvas looping or sending the entire video file to backend which takes a long time.
// We will build a UI that demonstrates the flow.
export default function UploadVideo() {
  const [selectedVideo, setSelectedVideo] = useState<File | null>(null)
  const [videoUrl, setVideoUrl] = useState<string | null>(null)
  const [isProcessing, setIsProcessing] = useState(false)
  const [progress, setProgress] = useState(0)
  const [faceCount, setFaceCount] = useState<number | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)

  const handleVideoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0]
      setSelectedVideo(file)
      setVideoUrl(URL.createObjectURL(file))
      setFaceCount(null)
      setProgress(0)
    }
  }

  const processVideo = () => {
    if (!selectedVideo) return
    setIsProcessing(true)
    setProgress(0)
    
    // Simulate Video Processing
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval)
          setIsProcessing(false)
          setFaceCount(Math.floor(Math.random() * 20) + 5) // Mock result
          return 100
        }
        return prev + 5
      })
    }, 200)
  }

  return (
    <div className="w-full pt-10 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center mb-12">
          <h1 className="font-heading text-3xl md:text-4xl font-bold text-white mb-2">Video Detection</h1>
          <p className="text-gray-400">Upload a video file to detect faces across frames.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Controls */}
          <div className="lg:col-span-1 space-y-6">
            <div className="glass-card p-6">
              <h3 className="font-heading font-semibold text-lg text-white mb-4">Upload Video</h3>
              
              <input 
                type="file" 
                ref={fileInputRef} 
                onChange={handleVideoChange} 
                accept="video/mp4,video/webm" 
                className="hidden" 
              />
              
              <button 
                onClick={() => fileInputRef.current?.click()}
                className="w-full h-32 border-2 border-dashed border-white/20 hover:border-primary/50 rounded-xl flex flex-col items-center justify-center gap-2 text-gray-400 hover:text-white hover:bg-white/5 transition-all mb-4"
              >
                <FiUploadCloud size={32} />
                <span className="font-medium">Click to select video</span>
              </button>

              {selectedVideo && (
                <div className="flex items-center gap-3 p-3 bg-white/5 rounded-lg mb-6 text-sm text-gray-300">
                  <FiVideo className="text-primary shrink-0" size={20} />
                  <span className="truncate">{selectedVideo.name}</span>
                </div>
              )}

              <button
                onClick={processVideo}
                disabled={!selectedVideo || isProcessing}
                className={`w-full py-4 rounded-xl font-semibold flex items-center justify-center gap-2 transition-all ${
                  !selectedVideo || isProcessing
                    ? 'bg-white/10 text-gray-500 cursor-not-allowed'
                    : 'bg-primary hover:bg-primary/90 text-white shadow-[0_0_20px_rgba(59,130,246,0.3)]'
                }`}
              >
                {isProcessing ? (
                  <><span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></span> Analyzing Frames...</>
                ) : (
                  <><FiActivity size={18} /> Start Processing</>
                )}
              </button>
            </div>

            {/* Results Data */}
            {faceCount !== null && !isProcessing && (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="glass-card p-6 space-y-4">
                <h3 className="font-heading font-semibold text-lg text-white border-b border-white/10 pb-2">Analysis Complete</h3>
                
                <div className="flex justify-between items-center">
                  <span className="text-gray-400 flex items-center gap-2"><FiCheckCircle className="text-success" /> Avg Faces/Frame</span>
                  <span className="font-bold text-xl text-white">{faceCount}</span>
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="text-gray-400 flex items-center gap-2"><FiClock className="text-warning" /> Duration Processed</span>
                  <span className="font-bold text-white">4.2s</span>
                </div>
              </motion.div>
            )}
          </div>

          {/* Video View */}
          <div className="lg:col-span-2">
            <div className="glass-card rounded-2xl overflow-hidden aspect-video flex flex-col bg-black/50 border border-white/10 relative">
              
              {!videoUrl && (
                <div className="flex-1 flex flex-col items-center justify-center text-gray-500">
                  <FiVideo size={48} className="mx-auto mb-4 opacity-50" />
                  <p>No video selected</p>
                </div>
              )}

              {videoUrl && (
                <video 
                  ref={videoRef}
                  src={videoUrl} 
                  controls={!isProcessing}
                  className="w-full h-full object-contain"
                />
              )}

              {isProcessing && (
                <div className="absolute inset-0 bg-black/80 backdrop-blur-sm flex flex-col items-center justify-center p-8 z-10">
                  <div className="w-full max-w-md">
                    <div className="flex justify-between text-sm text-gray-300 mb-2 font-medium">
                      <span>Processing frames...</span>
                      <span>{progress}%</span>
                    </div>
                    <div className="w-full h-3 bg-white/10 rounded-full overflow-hidden">
                      <motion.div 
                        className="h-full bg-gradient-to-r from-primary to-secondary"
                        initial={{ width: 0 }}
                        animate={{ width: `${progress}%` }}
                      />
                    </div>
                    <p className="text-center text-xs text-gray-500 mt-4">Detecting faces frame by frame using AI model</p>
                  </div>
                </div>
              )}
            </div>
          </div>

        </div>

      </div>
    </div>
  )
}

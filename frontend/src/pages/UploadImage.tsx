import React, { useState, useRef } from 'react'
import { motion } from 'framer-motion'
import { FiUploadCloud, FiImage, FiDownload, FiActivity, FiClock, FiCheckCircle } from 'react-icons/fi'
import axios from 'axios'

const API_URL = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1' 
  ? 'http://localhost:8000/api' 
  : 'https://antigrav-backend-55.loca.lt/api'

export default function UploadImage() {
  const [selectedImage, setSelectedImage] = useState<File | null>(null)
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)
  const [processedUrl, setProcessedUrl] = useState<string | null>(null)
  const [isProcessing, setIsProcessing] = useState(false)
  const [faceCount, setFaceCount] = useState<number | null>(null)
  const [processTime, setProcessTime] = useState<number | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0]
      setSelectedImage(file)
      setPreviewUrl(URL.createObjectURL(file))
      setProcessedUrl(null)
      setFaceCount(null)
      setProcessTime(null)
    }
  }

  const handleUploadClick = () => {
    fileInputRef.current?.click()
  }

  const processImage = async () => {
    if (!selectedImage) return

    setIsProcessing(true)
    const startTime = performance.now()
    
    const formData = new FormData()
    formData.append('file', selectedImage)

    try {
      const response = await axios.post(`${API_URL}/upload/image`, formData, {
        responseType: 'blob'
      })
      
      const count = response.headers['x-face-count']
      setFaceCount(parseInt(count, 10))
      
      const blobUrl = URL.createObjectURL(response.data)
      setProcessedUrl(blobUrl)
      
      const endTime = performance.now()
      setProcessTime(Math.round(endTime - startTime))
    } catch (error) {
      console.error("Error processing image", error)
      alert("Failed to process image. Make sure the backend is running.")
    } finally {
      setIsProcessing(false)
    }
  }

  return (
    <div className="w-full pt-10 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center mb-12">
          <h1 className="font-heading text-3xl md:text-4xl font-bold text-white mb-2">Image Detection</h1>
          <p className="text-gray-400">Upload an image to detect and count faces.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Controls */}
          <div className="lg:col-span-1 space-y-6">
            <div className="glass-card p-6">
              <h3 className="font-heading font-semibold text-lg text-white mb-4">Upload File</h3>
              
              <input 
                type="file" 
                ref={fileInputRef} 
                onChange={handleImageChange} 
                accept="image/*" 
                className="hidden" 
              />
              
              <button 
                onClick={handleUploadClick}
                className="w-full h-32 border-2 border-dashed border-white/20 hover:border-primary/50 rounded-xl flex flex-col items-center justify-center gap-2 text-gray-400 hover:text-white hover:bg-white/5 transition-all mb-4"
              >
                <FiUploadCloud size={32} />
                <span className="font-medium">Click to select image</span>
              </button>

              {selectedImage && (
                <div className="flex items-center gap-3 p-3 bg-white/5 rounded-lg mb-6 text-sm text-gray-300">
                  <FiImage className="text-primary shrink-0" size={20} />
                  <span className="truncate">{selectedImage.name}</span>
                </div>
              )}

              <button
                onClick={processImage}
                disabled={!selectedImage || isProcessing}
                className={`w-full py-4 rounded-xl font-semibold flex items-center justify-center gap-2 transition-all ${
                  !selectedImage || isProcessing
                    ? 'bg-white/10 text-gray-500 cursor-not-allowed'
                    : 'bg-primary hover:bg-primary/90 text-white shadow-[0_0_20px_rgba(59,130,246,0.3)]'
                }`}
              >
                {isProcessing ? (
                  <><span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></span> Processing...</>
                ) : (
                  <><FiActivity size={18} /> Run Detection</>
                )}
              </button>
            </div>

            {/* Results Data */}
            {faceCount !== null && (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="glass-card p-6 space-y-4">
                <h3 className="font-heading font-semibold text-lg text-white border-b border-white/10 pb-2">Results</h3>
                
                <div className="flex justify-between items-center">
                  <span className="text-gray-400 flex items-center gap-2"><FiCheckCircle className="text-success" /> Faces Found</span>
                  <span className="font-bold text-xl text-white">{faceCount}</span>
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="text-gray-400 flex items-center gap-2"><FiClock className="text-warning" /> Processing Time</span>
                  <span className="font-bold text-white">{processTime} ms</span>
                </div>

                {processedUrl && (
                  <a 
                    href={processedUrl} 
                    download={`processed_${selectedImage?.name || 'image.jpg'}`}
                    className="w-full mt-4 py-3 bg-white/10 hover:bg-white/20 text-white rounded-lg font-medium flex items-center justify-center gap-2 transition-colors border border-white/5"
                  >
                    <FiDownload size={18} /> Download Image
                  </a>
                )}
              </motion.div>
            )}
          </div>

          {/* Image View */}
          <div className="lg:col-span-2">
            <div className="glass-card rounded-2xl overflow-hidden min-h-[500px] flex items-center justify-center bg-black/50 border border-white/10 relative">
              
              {!previewUrl && (
                <div className="text-center text-gray-500">
                  <FiImage size={48} className="mx-auto mb-4 opacity-50" />
                  <p>No image selected</p>
                </div>
              )}

              {previewUrl && !processedUrl && (
                <img src={previewUrl} alt="Preview" className="max-w-full max-h-[700px] object-contain" />
              )}

              {processedUrl && (
                <img src={processedUrl} alt="Processed" className="max-w-full max-h-[700px] object-contain" />
              )}

              {isProcessing && (
                <div className="absolute inset-0 bg-black/60 backdrop-blur-sm flex flex-col items-center justify-center text-white z-10">
                  <div className="w-12 h-12 border-4 border-primary/30 border-t-primary rounded-full animate-spin mb-4"></div>
                  <p className="font-heading font-semibold animate-pulse">Running Neural Network...</p>
                </div>
              )}
            </div>
          </div>

        </div>

      </div>
    </div>
  )
}

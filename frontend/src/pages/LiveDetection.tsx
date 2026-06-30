import { useState, useRef, useEffect, useCallback } from 'react'
import Webcam from 'react-webcam'

import { FiCamera, FiVideoOff, FiMaximize, FiRefreshCcw, FiActivity, FiUsers, FiClock } from 'react-icons/fi'

const WS_URL = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1' 
  ? 'ws://localhost:8000/ws/detect' 
  : 'wss://antigrav-backend-55.loca.lt/ws/detect'

export default function LiveDetection() {
  const [isCameraActive, setIsCameraActive] = useState(false)
  const [isDetecting, setIsDetecting] = useState(false)
  const [facingMode, setFacingMode] = useState<"user" | "environment">("user")
  const [facesCount, setFacesCount] = useState(0)
  const [fps, setFps] = useState(0)
  const [cameraError, setCameraError] = useState<string | null>(null)
  
  const webcamRef = useRef<Webcam>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const wsRef = useRef<WebSocket | null>(null)
  
  const requestRef = useRef<number>()
  const lastFrameTime = useRef<number>(0)
  const frameCount = useRef<number>(0)
  
  // Connect WebSocket
  useEffect(() => {
    return () => {
      stopDetection()
      if (wsRef.current) {
        wsRef.current.close()
      }
    }
  }, [])

  const startDetection = () => {
    if (!wsRef.current || wsRef.current.readyState !== WebSocket.OPEN) {
      wsRef.current = new WebSocket(WS_URL)
      wsRef.current.onmessage = (event) => {
        const data = JSON.parse(event.data)
        if (data.faces) {
          drawBoundingBoxes(data.faces)
          setFacesCount(data.count)
        }
      }
      wsRef.current.onerror = () => {
        setIsDetecting(false)
        console.error("WebSocket Error")
      }
    }
    
    setIsDetecting(true)
    lastFrameTime.current = performance.now()
    requestRef.current = requestAnimationFrame(processFrame)
  }

  const stopDetection = () => {
    setIsDetecting(false)
    if (requestRef.current) {
      cancelAnimationFrame(requestRef.current)
    }
    const canvas = canvasRef.current
    if (canvas) {
      const ctx = canvas.getContext('2d')
      ctx?.clearRect(0, 0, canvas.width, canvas.height)
    }
    setFacesCount(0)
  }

  const processFrame = useCallback(() => {
    if (!isDetecting || !webcamRef.current || !wsRef.current) return

    // Calculate FPS
    const now = performance.now()
    frameCount.current += 1
    if (now - lastFrameTime.current >= 1000) {
      setFps(frameCount.current)
      frameCount.current = 0
      lastFrameTime.current = now
    }

    const imageSrc = webcamRef.current.getScreenshot()
    if (imageSrc && wsRef.current.readyState === WebSocket.OPEN) {
      wsRef.current.send(imageSrc)
    }

    requestRef.current = requestAnimationFrame(processFrame)
  }, [isDetecting])

  useEffect(() => {
    if (isDetecting) {
      requestRef.current = requestAnimationFrame(processFrame)
    }
    return () => {
      if (requestRef.current) cancelAnimationFrame(requestRef.current)
    }
  }, [isDetecting, processFrame])

  const drawBoundingBoxes = (faces: any[]) => {
    const canvas = canvasRef.current
    const video = webcamRef.current?.video
    if (!canvas || !video) return

    canvas.width = video.videoWidth
    canvas.height = video.videoHeight
    
    const ctx = canvas.getContext('2d')
    if (!ctx) return
    
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    faces.forEach((face) => {
      const [x, y, w, h] = face.box
      
      // Draw Box
      ctx.strokeStyle = '#22C55E' // Success Green
      ctx.lineWidth = 3
      ctx.strokeRect(x, y, w, h)
      
      // Draw Label Background
      const text = `Face ${face.id} ${face.confidence}%`
      ctx.fillStyle = '#22C55E'
      ctx.font = '16px Inter, sans-serif'
      const textWidth = ctx.measureText(text).width
      ctx.fillRect(x, y - 25, textWidth + 10, 25)
      
      // Draw Text
      ctx.fillStyle = '#000000'
      ctx.fillText(text, x + 5, y - 7)
    })
  }

  const captureScreenshot = () => {
    if (!webcamRef.current || !canvasRef.current) return
    
    // Create an offscreen canvas to combine video and bounding boxes
    const video = webcamRef.current.video
    const canvas = canvasRef.current
    if (!video) return

    const offscreen = document.createElement('canvas')
    offscreen.width = video.videoWidth
    offscreen.height = video.videoHeight
    const ctx = offscreen.getContext('2d')
    if (!ctx) return

    // Draw video
    ctx.drawImage(video, 0, 0, offscreen.width, offscreen.height)
    // Draw bounding boxes on top
    ctx.drawImage(canvas, 0, 0)

    const link = document.createElement('a')
    link.href = offscreen.toDataURL('image/jpeg')
    link.download = `detection_${new Date().getTime()}.jpg`
    link.click()
  }

  const toggleCamera = () => {
    if (isCameraActive) {
      stopDetection()
      setIsCameraActive(false)
    } else {
      setCameraError(null)
      setIsCameraActive(true)
    }
  }

  return (
    <div className="w-full pt-6 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Dashboard */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div>
            <h1 className="font-heading text-3xl font-bold text-white mb-1">Live Camera Feed</h1>
            <p className="text-gray-400 text-sm">Real-time object mapping and crowd analytics.</p>
          </div>

          <div className="flex gap-4">
            <div className="glass-card px-4 py-2 flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-success/20 text-success flex items-center justify-center">
                <FiUsers size={16} />
              </div>
              <div>
                <p className="text-xs text-gray-500 uppercase font-semibold">Total Faces</p>
                <p className="font-bold text-white leading-none">{facesCount}</p>
              </div>
            </div>
            
            <div className="glass-card px-4 py-2 flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-primary/20 text-primary flex items-center justify-center">
                <FiActivity size={16} />
              </div>
              <div>
                <p className="text-xs text-gray-500 uppercase font-semibold">Live FPS</p>
                <p className="font-bold text-white leading-none">{fps}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          
          {/* Main Video View */}
          <div className="lg:col-span-3">
            <div className="glass-card rounded-2xl overflow-hidden aspect-video relative flex items-center justify-center bg-black/80 border border-white/10 group shadow-2xl">
              
              {!isCameraActive ? (
                <div className="text-center text-gray-500 z-10 flex flex-col items-center">
                  <FiVideoOff size={48} className="mb-4 opacity-50" />
                  <p className="font-medium text-lg text-white mb-2">Camera is Offline</p>
                  <p className="text-sm">Click 'Start Camera' to begin detection session.</p>
                  {cameraError && <p className="text-danger text-sm mt-4">{cameraError}</p>}
                </div>
              ) : (
                <>
                  <Webcam
                    ref={webcamRef}
                    audio={false}
                    screenshotFormat="image/jpeg"
                    videoConstraints={{ facingMode, width: 1280, height: 720 }}
                    onUserMediaError={(e) => {
                      console.error("Camera error:", e);
                      setCameraError("Camera access denied or device not found.");
                      setIsCameraActive(false);
                    }}
                    className={`absolute inset-0 w-full h-full object-cover ${facingMode === 'user' ? 'scale-x-[-1]' : ''}`}
                  />
                  <canvas 
                    ref={canvasRef} 
                    className={`absolute inset-0 w-full h-full object-cover pointer-events-none ${facingMode === 'user' ? 'scale-x-[-1]' : ''}`} 
                  />
                  
                  {/* Status Overlay */}
                  <div className="absolute top-4 right-4 bg-black/60 backdrop-blur-md px-3 py-1.5 rounded-lg border border-white/10 flex items-center gap-2">
                    <span className={`w-2.5 h-2.5 rounded-full ${isDetecting ? 'bg-success animate-pulse' : 'bg-gray-500'}`}></span>
                    <span className="text-xs font-semibold uppercase tracking-wider text-white">
                      {isDetecting ? 'AI Active' : 'AI Inactive'}
                    </span>
                  </div>
                </>
              )}
            </div>
          </div>

          {/* Controls Sidebar */}
          <div className="lg:col-span-1 space-y-4">
            <div className="glass-card p-5 space-y-4">
              <h3 className="font-heading font-semibold text-white border-b border-white/10 pb-3 mb-4">Camera Controls</h3>
              
              <button 
                onClick={toggleCamera}
                className={`w-full py-3 rounded-xl font-semibold flex items-center justify-center gap-2 transition-all ${
                  isCameraActive 
                    ? 'bg-danger/20 text-danger hover:bg-danger/30' 
                    : 'bg-primary hover:bg-primary/90 text-white shadow-[0_0_15px_rgba(59,130,246,0.4)]'
                }`}
              >
                <FiCamera size={18} />
                {isCameraActive ? 'Stop Camera' : 'Start Camera'}
              </button>

              <button 
                onClick={() => setFacingMode(prev => prev === 'user' ? 'environment' : 'user')}
                disabled={!isCameraActive}
                className="w-full py-3 bg-white/5 hover:bg-white/10 text-white rounded-xl font-medium flex items-center justify-center gap-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed border border-white/10"
              >
                <FiRefreshCcw size={18} /> Switch Camera
              </button>

              <button 
                onClick={captureScreenshot}
                disabled={!isCameraActive}
                className="w-full py-3 bg-white/5 hover:bg-white/10 text-white rounded-xl font-medium flex items-center justify-center gap-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed border border-white/10"
              >
                <FiMaximize size={18} /> Capture Screenshot
              </button>
            </div>

            <div className="glass-card p-5">
              <h3 className="font-heading font-semibold text-white border-b border-white/10 pb-3 mb-4">AI Processing</h3>
              
              <button 
                onClick={isDetecting ? stopDetection : startDetection}
                disabled={!isCameraActive}
                className={`w-full py-4 rounded-xl font-semibold flex items-center justify-center gap-2 transition-all ${
                  !isCameraActive 
                    ? 'bg-white/5 text-gray-600 border border-white/5' 
                    : isDetecting
                      ? 'bg-warning hover:bg-warning/90 text-white shadow-[0_0_15px_rgba(245,158,11,0.4)]'
                      : 'bg-success hover:bg-success/90 text-white shadow-[0_0_15px_rgba(34,197,94,0.4)]'
                }`}
              >
                <FiActivity size={18} />
                {isDetecting ? 'Pause Detection' : 'Run Detection'}
              </button>
              
              <div className="mt-4 p-3 bg-white/5 rounded-lg border border-white/5 flex items-start gap-3">
                <FiClock className="text-primary shrink-0 mt-0.5" />
                <p className="text-xs text-gray-400">
                  Frames are sent securely over WebSocket to the FastAPI backend and never stored permanently.
                </p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}

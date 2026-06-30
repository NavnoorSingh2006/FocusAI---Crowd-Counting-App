# AI Face Detection & Crowd Counter

A modern, high-performance web application for real-time face detection and crowd counting. Built with React (Vite), Tailwind CSS, FastAPI, OpenCV, and MediaPipe.

## Architecture

* **Frontend**: React.js with TypeScript, styled using Tailwind CSS and animated with Framer Motion.
* **Backend**: Python FastAPI with SQLite for history tracking.
* **Computer Vision**: Google's MediaPipe neural networks for blazing-fast inference via OpenCV.
* **Real-Time Stream**: Frame streaming over WebSockets for zero-latency webcam processing.

## Features
- Real-time webcam face detection via WebSockets.
- Image upload and processing REST API.
- Video playback simulation (client-side mock for demonstration).
- Premium Dashboard with real-time Recharts analytics.
- Fully responsive dark mode UI with glassmorphism effects.

## Local Installation

### Prerequisites
- Python 3.9+
- Node.js 18+

### Backend Setup
1. Open a terminal and navigate to the backend directory:
   ```bash
   cd backend
   ```
2. Create a virtual environment and activate it:
   ```bash
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   ```
3. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```
4. Run the FastAPI server:
   ```bash
   uvicorn main:app --reload --host 0.0.0.0 --port 8000
   ```

### Frontend Setup
1. Open a new terminal and navigate to the frontend directory:
   ```bash
   cd frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Run the development server:
   ```bash
   npm run dev
   ```
4. Open http://localhost:5173 in your browser.

## Docker Setup (Optional)
If you prefer running everything in containers, you can use Docker Compose.
From the root directory, run:
```bash
docker-compose up --build
```
This will start both the backend and frontend on their respective ports.

## License
MIT License

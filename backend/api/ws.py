from fastapi import APIRouter, WebSocket, WebSocketDisconnect, Depends
from sqlalchemy.orm import Session
from db.database import get_db
from db.models import DetectionHistory
from core.detector import FaceDetector
import cv2
import numpy as np
import base64
import json

router = APIRouter()
detector = FaceDetector()

@router.websocket("/ws/detect")
async def websocket_endpoint(websocket: WebSocket, db: Session = Depends(get_db)):
    await websocket.accept()
    
    session_faces = 0
    try:
        while True:
            data = await websocket.receive_text()
            
            try:
                # Expecting base64 image string from frontend
                # Format: "data:image/jpeg;base64,/9j/4AAQSk..."
                if "," in data:
                    base64_data = data.split(",")[1]
                else:
                    base64_data = data
                    
                img_data = base64.b64decode(base64_data)
                nparr = np.frombuffer(img_data, np.uint8)
                image = cv2.imdecode(nparr, cv2.IMREAD_COLOR)
                
                if image is not None:
                    # We just need the faces data, not necessarily to send the image back 
                    # since the frontend can draw the boxes over its own video element.
                    _, faces = detector.detect(image)
                    
                    if len(faces) > session_faces:
                        session_faces = len(faces)
                        
                    await websocket.send_text(json.dumps({
                        "faces": faces,
                        "count": len(faces)
                    }))
                else:
                    await websocket.send_text(json.dumps({"error": "Failed to decode image"}))
                    
            except Exception as e:
                await websocket.send_text(json.dumps({"error": str(e)}))
                
    except WebSocketDisconnect:
        # Save session stats when disconnected
        if session_faces > 0:
            history = DetectionHistory(source_type="webcam", face_count=session_faces)
            db.add(history)
            db.commit()

from fastapi import APIRouter, UploadFile, File, Depends, HTTPException
from fastapi.responses import Response
from sqlalchemy.orm import Session
from sqlalchemy import func
from db.database import get_db
from db.models import DetectionHistory
from core.detector import FaceDetector
import cv2
import numpy as np

router = APIRouter()
detector = FaceDetector()

@router.post("/upload/image")
async def upload_image(file: UploadFile = File(...), db: Session = Depends(get_db)):
    if not file.content_type.startswith("image/"):
        raise HTTPException(status_code=400, detail="File must be an image.")
    
    contents = await file.read()
    nparr = np.frombuffer(contents, np.uint8)
    image = cv2.imdecode(nparr, cv2.IMREAD_COLOR)
    
    if image is None:
        raise HTTPException(status_code=400, detail="Invalid image file.")
        
    annotated_img, faces = detector.detect(image)
    
    # Save to db
    history = DetectionHistory(source_type="image", face_count=len(faces))
    db.add(history)
    db.commit()
    
    # Return annotated image
    _, encoded_img = cv2.imencode('.jpg', annotated_img)
    
    return Response(content=encoded_img.tobytes(), media_type="image/jpeg", headers={
        "X-Face-Count": str(len(faces))
    })

@router.get("/stats")
def get_stats(db: Session = Depends(get_db)):
    # Total processed
    total_images = db.query(DetectionHistory).filter(DetectionHistory.source_type == "image").count()
    total_videos = db.query(DetectionHistory).filter(DetectionHistory.source_type == "video").count()
    total_webcam = db.query(DetectionHistory).filter(DetectionHistory.source_type == "webcam").count()
    
    # Total faces
    total_faces_res = db.query(func.sum(DetectionHistory.face_count)).scalar()
    total_faces = total_faces_res if total_faces_res else 0
    
    return {
        "totalImages": total_images,
        "totalVideos": total_videos,
        "totalWebcamSessions": total_webcam,
        "totalFaces": total_faces
    }

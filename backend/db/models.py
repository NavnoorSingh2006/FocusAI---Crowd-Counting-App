from sqlalchemy import Column, Integer, String, DateTime
from db.database import Base
import datetime

class DetectionHistory(Base):
    __tablename__ = "detection_history"

    id = Column(Integer, primary_key=True, index=True)
    source_type = Column(String, index=True) # "image", "video", "webcam"
    face_count = Column(Integer)
    timestamp = Column(DateTime, default=datetime.datetime.utcnow)

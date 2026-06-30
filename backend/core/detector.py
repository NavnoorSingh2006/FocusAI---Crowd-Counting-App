import cv2
import mediapipe as mp
from mediapipe.tasks import python
from mediapipe.tasks.python import vision
import numpy as np
import os
import urllib.request

class FaceDetector:
    def __init__(self):
        model_path = os.path.join(os.path.dirname(__file__), 'blaze_face_short_range.tflite')
        if not os.path.exists(model_path):
            url = "https://storage.googleapis.com/mediapipe-models/face_detector/blaze_face_short_range/float16/1/blaze_face_short_range.tflite"
            urllib.request.urlretrieve(url, model_path)

        base_options = python.BaseOptions(model_asset_path=model_path)
        options = vision.FaceDetectorOptions(base_options=base_options, min_detection_confidence=0.5)
        self.detector = vision.FaceDetector.create_from_options(options)

    def detect(self, image: np.ndarray):
        """
        Detects faces in an image (BGR).
        Returns the annotated image and face count.
        """
        # Convert the BGR image to RGB
        image_rgb = cv2.cvtColor(image, cv2.COLOR_BGR2RGB)
        
        # Create MediaPipe Image
        mp_image = mp.Image(image_format=mp.ImageFormat.SRGB, data=image_rgb)
        
        # Process the image and find faces
        detection_result = self.detector.detect(mp_image)
        
        faces = []
        if detection_result.detections:
            for i, detection in enumerate(detection_result.detections):
                bbox = detection.bounding_box
                x, y, bw, bh = bbox.origin_x, bbox.origin_y, bbox.width, bbox.height
                
                # Confidence score
                confidence = int(detection.categories[0].score * 100)
                
                faces.append({
                    "id": i + 1,
                    "box": [x, y, bw, bh],
                    "confidence": confidence
                })
                
                # Draw bounding box and info
                cv2.rectangle(image, (x, y), (x + bw, y + bh), (0, 255, 0), 2)
                text = f"Face {i+1}: {confidence}%"
                
                # Add background for text
                (text_w, text_h), _ = cv2.getTextSize(text, cv2.FONT_HERSHEY_SIMPLEX, 0.5, 1)
                cv2.rectangle(image, (x, y - 20), (x + text_w, y), (0, 255, 0), -1)
                cv2.putText(image, text, (x, y - 5), cv2.FONT_HERSHEY_SIMPLEX, 0.5, (0, 0, 0), 1)

        return image, faces

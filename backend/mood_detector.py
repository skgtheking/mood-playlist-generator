import cv2
import numpy as np
from fer import FER

detector = FER(mtcnn=True)

def predict_mood_from_image(file_bytes: bytes) -> str:

    nparrr = np.frombuffer(file_bytes, np.uint8)
    img = cv2.imdecode(nparrr, cv2.IMREAD_COLOR)

    result = detector.detect_emotions(img)
    if not result:
        return "relaxed"
    
    emotion_label, score = result
    mapping = {
        "happy": "happy",
        "sad": "sad",
        "angry": "energetic",
        "surprise": "energetic",
        "neutral": "relaxed",
        "disgust": "sad",
        "fear": "sad"
    }

    return mapping.get(emotion_label, "relaxed")
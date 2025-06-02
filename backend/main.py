from fastapi import FastAPI, HTTPException, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from spotify import get_spotify_token
from mood_detector import predict_mood_from_image
import requests

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/health")
def health_check():
    return {"status": "ok"}

@app.get("/test-token")
def test_token():
    token = get_spotify_token()
    return {"access_token": token[:20] + "..."}

@app.get("/playlists/{mood}")
def get_playlists(mood: str):
    token = get_spotify_token()
    mood_queries = {
        "happy": "happy hits",
        "sad": "sad emotional",
        "energetic": "workout hits",
        "relaxed": "chill vibes",
    }

    if mood not in mood_queries:
        raise HTTPException(status_code=400, detail="Invalid mood")
    
    query = mood_queries[mood]
    search_url = f"https://api.spotify.com/v1/search?q={query}&type=playlist&limit=5"
    resp = requests.get(search_url, headers={"Authorization": f"Bearer {token}"})
    resp.raise_for_status()
    return resp.json()

@app.post("/detect-mood")
async def detect_mood(file: UploadFile = File(...)):
    contents = await file.read()
    try:
        mood = predict_mood_from_image(contents)
        return JSONResponse(content={"mood": mood})
    except Exception:
        raise HTTPException(status_code=500, detail="Mood detection failed")


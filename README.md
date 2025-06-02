# 🎧 Mood-Based Spotify Playlist Generator

This project analyzes your facial expressions from a short video clip to detect your current mood and then generates a personalized Spotify playlist that matches that mood.

## 🚀 Features

- 😄 Real-time mood detection using facial expressions  
- 🧠 Deep learning powered by FER (Facial Expression Recognition)  
- 🎵 Dynamic Spotify playlist generation via Spotify Web API  
- 🎥 Upload a video or record from webcam  
- ⚡ Full-stack app with FastAPI (backend) + React (frontend)  

## 🧰 Tech Stack

- **Frontend**: React.js, HTML/CSS  
- **Backend**: FastAPI, Python  
- **AI/ML**: `fer`, `tensorflow`, `facenet-pytorch`  
- **Video Processing**: `moviepy`  
- **Authentication**: Spotify OAuth  
- **Other**: Uvicorn, Axios, dotenv  

## 📸 How it works

1. Upload a video clip of your face (2–5 seconds).  
2. The backend extracts frames and analyzes them for emotions using FER.  
3. Based on the dominant emotion (e.g., happy, sad, angry), a playlist is generated using Spotify API.  
4. The playlist is displayed in the UI, ready to play!  

## 🛠️ Setup Instructions

### 1. Clone the Repo

```bash
git clone https://github.com/skgtheking/mood-playlist-generator.git
cd mood-playlist-generator
```

### 2. Backend Setup

```bash
cd backend
python -m venv venv
venv\Scripts\activate  # or source venv/bin/activate (Linux/macOS)
pip install -r requirements.txt
uvicorn main:app --reload
```

### 3. Frontend Setup

```bash
cd ../frontend
npm install
npm start
```

Make sure `.env` files for both backend and frontend include your **Spotify API credentials**.

## 📦 Environment Variables

### Backend (`backend/.env`)

```
SPOTIFY_CLIENT_ID=your_spotify_client_id
SPOTIFY_CLIENT_SECRET=your_spotify_client_secret
REDIRECT_URI=http://localhost:3000/callback
```

### Frontend (`frontend/.env`)

```
REACT_APP_SPOTIFY_CLIENT_ID=your_spotify_client_id
```

## 🧪 Example Moods Supported

- Happy  
- Sad  
- Angry  
- Surprise  
- Neutral  
- Disgust  
- Fear  

Each mood maps to a curated Spotify playlist.

## 📝 License

MIT License. Feel free to fork and remix!

---

Made with ❤️ by [@skgtheking](https://github.com/skgtheking)

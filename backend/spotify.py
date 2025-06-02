import os
import base64
import requests
from dotenv import load_dotenv

load_dotenv()

CLIENT_ID = os.getenv('SPOTIFY_CLIENT_ID')
CLIENT_SECRET = os.getenv('SPOTIFY_CLIENT_SECRET')

def get_spotify_token():
    auth_header = base64.b64encode(f"{CLIENT_ID}:{CLIENT_SECRET}".encode()).decode()
    response = requests.post(
        "https://accounts.spotify.com/api/token",
        headers={"Authorization": f"Basic {auth_header}"},
        data={"grant_type": "client_credentials"}
    )

    response.raise_for_status()
    data = response.json()
    return data['access_token']
import React, { useRef, useState } from "react";
import Webcam from "react-webcam";
import axios from "axios";
import {
  Button,
  Container,
  Typography,
  CircularProgress,
  Snackbar,
  Alert,
  List,
  ListItem,
  ListItemText,
  Link,
} from "@mui/material";

const API_BASE = process.env.REACT_APP_API_BASE_URL;

const App: React.FC = () => {
  const webcamRef = useRef<Webcam>(null);
  const [mood, setMood] = useState<string | null>(null);
  const [playlists, setPlaylists] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const captureAndDetectMood = async () => {
    if (!webcamRef.current) return;
    setLoading(true);
    setError(null);

    try {
      // 1. Capture a JPEG screenshot from the webcam
      const screenshot = webcamRef.current.getScreenshot({
        width: 320,
        height: 240,
      });
      if (!screenshot) {
        throw new Error("Webcam not ready");
      }

      // 2. Convert data URL → Blob
      const blob = await (await fetch(screenshot)).blob();

      // 3. Send image to /detect-mood
      const formData = new FormData();
      formData.append("file", blob, "snapshot.jpg");
      const detectResp = await axios.post(
        `${API_BASE}/detect-mood`,
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );
      const detectedMood: string = detectResp.data.mood;
      setMood(detectedMood);

      // 4. Send detected mood → /playlists/:mood
      const playlistsResp = await axios.get(
        `${API_BASE}/playlists/${detectedMood}`
      );
      const items = playlistsResp.data.playlists.items as any[];
      setPlaylists(items);
    } catch (err: any) {
      console.error(err);
      setError("Failed to detect mood or fetch playlists.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container
      maxWidth="sm"
      sx={{ textAlign: "center", mt: 4, mb: 4 }}
    >
      <Typography variant="h4" gutterBottom>
        AI‐Powered Mood‐Based Playlist Generator
      </Typography>

      <Webcam
        audio={false}
        height={240}
        ref={webcamRef}
        screenshotFormat="image/jpeg"
        width={320}
        videoConstraints={{ facingMode: "user" }}
      />

      <Button
        variant="contained"
        size="large"
        onClick={captureAndDetectMood}
        disabled={loading}
        sx={{ mt: 2 }}
      >
        {loading ? <CircularProgress size={24} /> : "Detect Mood & Load Playlists"}
      </Button>

      {mood && (
        <Typography variant="h6" sx={{ mt: 2 }}>
          Detected Mood: <strong>{mood}</strong>
        </Typography>
      )}

      {playlists.length > 0 && (
        <>
          <Typography variant="subtitle1" sx={{ mt: 3 }}>
            Recommended Playlists:
          </Typography>
          <List>
            {playlists.map((pl: any) => (
              <ListItem key={pl.id}>
                <Link
                  href={pl.external_urls.spotify}
                  target="_blank"
                  rel="noopener noreferrer"
                  underline="hover"
                >
                  <ListItemText primary={pl.name} />
                </Link>
              </ListItem>
            ))}
          </List>
        </>
      )}

      <Snackbar
        open={!!error}
        autoHideDuration={4000}
        onClose={() => setError(null)}
      >
        <Alert severity="error" onClose={() => setError(null)}>
          {error}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default App;

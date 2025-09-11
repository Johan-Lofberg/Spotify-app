import { Box } from '@mui/material';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

import Login from './pages/Login';
import Dashboard from './components/Dashboard/Dashboard.jsx';
import SpotifyCallback from './pages/SpotifyCallback.jsx';
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute.jsx';
import Home from './pages/Home';

// ✅ Dessa ska du använda (finns i components, inte pages)
import Playlist from './components/Playlist/Playlist.jsx';
import Library from './components/Library/Library.jsx';

import { getAccessToken } from './utils/getAccessToken.js';
import { getAccessTokenFromStorage } from './utils/getAccessTokenFromStorage.js';

function App({ spotifyApi }) {
  const [token, setToken] = useState(getAccessTokenFromStorage());

  useEffect(() => {
    // setting the accessToken to token from session storage or from the url
    const accessToken = getAccessTokenFromStorage() || getAccessToken();

    if (accessToken) {
      setToken(accessToken);
      sessionStorage.setItem('spotifyToken', accessToken);
      window.location.hash = '';
    }
  }, []);

  return (
    <Box className="App">
      <Routes>
        {/* 🟢 Skyddad route för Dashboard – ligger först */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute token={token}>
              <Dashboard spotifyApi={spotifyApi} />
            </ProtectedRoute>
          }
        >
          {/* ✅ Nested under /dashboard */}
          <Route path="" element={<Home />} />
          <Route path="playlist/:id" element={<Playlist spotifyApi={spotifyApi} />} />
          <Route path="library" element={<Library spotifyApi={spotifyApi} />} />
        </Route>

        {/* 🟡 Login & callback */}
        <Route path="/login" element={<Login />} />
        <Route path="/callback" element={<SpotifyCallback />} />

        {/* 🔴 Redirect unknown routes */}
        <Route path="*" element={<Navigate to="/dashboard" />} />
      </Routes>
    </Box>
  );
}

export default App;

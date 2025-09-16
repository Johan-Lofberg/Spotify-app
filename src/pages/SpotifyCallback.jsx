// pages/SpotifyCallback.jsx
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getToken } from '../utils/pkce';

const SpotifyCallback = () => {
  const navigate = useNavigate();

  useEffect(() => {
    let handled = false; // 👈 spärr mot dubbelkörning

    const runCallback = async () => {
      if (handled) return;
      handled = true;

      const code = new URLSearchParams(window.location.search).get('code');
      const codeVerifier = localStorage.getItem('code_verifier');

      if (!code || !codeVerifier) {
        console.warn('⚠️ Missing code or code_verifier');
        return;
      }

      try {
        // Hämta tokens från Spotify
        const data = await getToken(code);

        // ✅ Spara tokens i localStorage + sessionStorage
        if (data.access_token) {
          localStorage.setItem('access_token', data.access_token);
          sessionStorage.setItem('spotifyToken', data.access_token); // 👈 Lagt till
        }
        if (data.refresh_token) {
          localStorage.setItem('refresh_token', data.refresh_token);
        }

        // ✅ Navigera till Dashboard
        navigate('/dashboard');
      } catch (error) {
        console.error('❌ Error handling Spotify callback:', error);
      }
    };

    runCallback();
  }, [navigate]);

  return <p>⏳ Logging you in with Spotify...</p>;
};

export default SpotifyCallback;

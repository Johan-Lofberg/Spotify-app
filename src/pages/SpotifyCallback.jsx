// pages/SpotifyCallback.jsx
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getToken } from '../utils/pkce';

const SpotifyCallback = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const runCallback = async (code) => {
      try {
        await getToken(code); // ✅ skicka bara code
        navigate('/dashboard'); // redirect till dashboard
      } catch (error) {
        console.error('Error handling Spotify callback:', error);
      }
    };

    const code = new URLSearchParams(window.location.search).get('code');
    const codeVerifier = localStorage.getItem('code_verifier');

    if (!code || !codeVerifier) {
      console.warn('Missing code or code_verifier');
      return;
    }

    runCallback(code);
  }, [navigate]);

  return <p>⏳ Logging you in with Spotify...</p>;
};

export default SpotifyCallback;

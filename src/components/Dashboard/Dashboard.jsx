import { useState, useEffect } from 'react';
import { Box } from '@mui/material';
import { Routes, Route } from 'react-router-dom';
import Home from '../../pages/Home';
import SideNav from '../SideNav/SideNav';
import { getAccessTokenFromStorage } from '../../utils/getAccessTokenFromStorage';
import Playlist from '../../pages/Playlist';
import Player from '../Player/Player';
import MobileNav from '../MobileNav/MobileNav';
import Library from '../../pages/Library';


const Dashboard = ({ spotifyApi }) => {
  const [token] = useState(getAccessTokenFromStorage()); // ✅ rätt destructuring

  useEffect(() => {
    const onMount = async () => {
      if (token) {
        await spotifyApi.setAccessToken(token); // ✅ nu är token en sträng
      }
    };

    onMount();
  }, [token, spotifyApi]);

  return (
    <Box
      sx={{
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column'
      }}
    >
      <Box sx={{ flex: 1, overflowY: 'auto', display: 'flex' }}>
        <SideNav spotifyApi={spotifyApi} token={token} />
        <Routes>
          <Route path="/playlist/:id" element={<Playlist token={token} spotifyApi={spotifyApi} />} />
          <Route path="/library" element={<Library token={token} spotifyApi={spotifyApi}/>} />
          <Route path="/" element={<Home />} />
        </Routes>
      </Box>
      {token && <Player spotifyApi={spotifyApi} token={token} />}
      <MobileNav />
    </Box>
  );
};

export default Dashboard;

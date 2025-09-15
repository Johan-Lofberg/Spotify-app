import { Avatar, Box, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const Playlist = ({ spotifyApi }) => {
  const { id } = useParams(); // ✅ hämta playlist-id från URL
  const [playlistInfo, setPlaylistInfo] = useState(null);

  useEffect(() => {
    const fetchPlaylist = async () => {
      if (!id || !spotifyApi) return;

      try {
        const data = await spotifyApi.getPlaylist(id);
        console.log("✅ Playlist data:", data.body);

        // Spotify API returnerar bilder i `images` (array)
        setPlaylistInfo({
          name: data.body.name,
          image: data.body.images?.[0]?.url,
        });
      } catch (err) {
        console.error("❌ Failed to load playlist:", err);
      }
    };

    fetchPlaylist();
  }, [id, spotifyApi]);

  return (
    <Box
      id="Playlist__page"
      sx={{ bgcolor: 'background.paper', flex: 1, overflowY: 'auto' }}
    >
      <Box
        p={{ xs: 3, md: 4 }}
        sx={{
          width: '100%',
          background: 'linear-gradient(0deg, #121212 0%, #1bd76060 100%)',
          display: 'flex',
          justifyContent: 'flex-start',
          alignItems: { xs: 'flex-start', md: 'flex-end', xl: 'center' },
          gap: 3,
          boxSizing: 'border-box',
          flexDirection: { xs: 'column', md: 'row' },
        }}
      >
        <Avatar
          src={playlistInfo?.image}
          variant="square"
          alt={playlistInfo?.name || "Playlist cover"}
          sx={{
            boxShadow: 15,
            width: { xs: '100%', md: 235 },
            height: { xs: '100%', md: 235 },
          }}
        />
        <Box>
          <Typography
            sx={{ fontSize: 12, fontWeight: 'bold', color: 'text.primary' }}
          >
            Playlist
          </Typography>
          <Typography
            sx={{
              fontSize: { xs: 42, md: 72 },
              fontWeight: 'bold',
              color: 'text.primary',
            }}
          >
            {playlistInfo?.name || "Loading..."}
          </Typography>
        </Box>
      </Box>
      {/* Du kan lägga in SongTable här sen */}
    </Box>
  );
};

export default Playlist;

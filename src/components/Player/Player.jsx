import React, { useEffect, useState } from 'react';
import { Box, Grid, Typography, Avatar } from '@mui/material';
import PlayerControls from '../PlayerControls/PlayerControls';
import PlayerVolume from '../PlayerVolume/PlayerVolume';
import PlayerOverlay from '../PlayerOverlay/PlayerOverlay';

const Player = ({ spotifyApi, token }) => {
  const [localPlayer, setLocalPlayer] = useState();
  const [is_paused, setIsPaused] = useState(false);
  const [current_track, setCurrentTrack] = useState();
  const [device, setDevice] = useState();
  const [duration, setDuration] = useState(0);
  const [progress, setProgress] = useState(0);
  const [active, setActive] = useState();
  const [playerOverlayIsOpen, setPlayerOverlayIsOpen] = useState(false);

  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://sdk.scdn.co/spotify-player.js';
    script.async = true;
    document.body.appendChild(script);

    window.onSpotifyWebPlaybackSDKReady = () => {
      const player = new window.Spotify.Player({
        name: 'Techover Player 1',
        getOAuthToken: (cb) => cb(token),
        volume: 0.5,
      });

      player.addListener('ready', ({ device_id }) => {
        console.log('Ready with Device ID', device_id);
        setDevice(device_id);
        setLocalPlayer(player);
      });

      player.addListener('not_ready', ({ device_id }) => {
        console.log('Device ID has gone offline', device_id);
      });

      player.addListener('player_state_changed', (state) => {
        if (!state || !state.track_window.current_track) return;

        console.log(state);
        setDuration(state.track_window.current_track.duration_ms); // ✅ ms
        setProgress(state.position); // ✅ ms
        setIsPaused(state.paused);
        setCurrentTrack(state.track_window.current_track);
      
	 	player.getCurrentState().then( state => { 
        (!state)? setActive(false) : setActive(true) 
    	});

	});

      player.connect();
    };
    // End of useEffect callback
  }, [token]);

  useEffect(() => {
    if (!localPlayer) return;
    async function connect() {
      await localPlayer.connect();
    }
    connect();
    return () => localPlayer.disconnect();
  }, [localPlayer]);

 // useEffect(() => {
 //   const transferPlayback = async () => {
 //     if (device) {
 //       const res = await spotifyApi.getMyDevices();
 //       console.log(res);
 //       await spotifyApi.transferMyPlayback([device], false);
 //     }
 //   };
 //   transferPlayback();
 // }, [device, spotifyApi]);
  return (
    <Box>
      <Grid
      onClick={() => setPlayerOverlayIsOpen((prevState) => !prevState)}
        container
        px={3}
        sx={{
          bgcolor: 'background.paper', // ✅ rätt key
          height: 100,
          cursor: { xs: 'pointer', md: 'auto' },
          width: '100%',
          borderTop: '1px solid #292929',
        }}
      >
        {/* 🎵 Album & Artist */}
        <Grid
          item
          xs={12}
          md={3}
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-start',
          }}
        >
          <Avatar
            src={current_track?.album?.images?.[0]?.url}
            alt={current_track?.album?.name}
            variant="square"
            sx={{ width: 56, height: 56, marginRight: 2 }}
          />
          <Box>
            <Typography sx={{ color: 'text.primary', fontSize: 14 }}>
              {current_track?.name}
            </Typography>
            <Typography sx={{ color: 'text.secondary', fontSize: 12 }}>
              {current_track?.artists?.[0]?.name}
            </Typography>
          </Box>
        </Grid>

        <Grid
          item
          sx={{
            display: { xs: 'none', md: 'flex' },
            flex: 1,
            justifyContent: { xs: 'flex-end', md: 'center' },
            alignItems: 'center',
          }}
        >
          {active ? (
            <PlayerControls
              progress={progress}
              is_paused={is_paused}
              duration={duration}
              player={localPlayer}
            />
          ) : (
            <Box>Please transfer Playback</Box>
          )}
        </Grid>
        <Grid xs={6} md={4} item sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }}>
          <PlayerVolume player={localPlayer}/>
        </Grid>
      </Grid>
      <PlayerOverlay 
        playerOverlayIsOpen={playerOverlayIsOpen} 
        closeOverlay={() => setPlayerOverlayIsOpen(false)}
        progress={progress}
        is_paused={is_paused}
        duration={duration}
        player={localPlayer}
        current_track={current_track}
        active={active}
      />
    </Box>
  );
};

export default Player;

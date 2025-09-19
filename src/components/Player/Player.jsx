import React from 'react';
import { Box, Grid, Typography, Avatar } from '@mui/material';
import { useEffect, useState } from 'react';

const Player = ({  spotifyApi, token }) => {
  const [localPlayer, setLocalPlayer] = useState();
  const [is_paused, setIsPaused] = useState(false);
  const [current_track, setCurrentTrack] = useState();
  const [device, setDevice] = useState();
  const [duration, setDuration] = useState();
  const [progress, setProgress] = useState();
useEffect(() => {
	const script = document.createElement('script');
	script.src = 'https://sdk.scdn.co/spotify-player.js';
	script.async = true;

	document.body.appendChild(script);

	window.onSpotifyWebPlaybackSDKReady = () => {
		const player = new window.Spotify.Player({
			name: 'Techover Player 2',
			getOAuthToken: (cb) => {
				cb(token);
			},
			volume: 0.5
		});

		player.addListener('ready', ({ device_id }) => {
			console.log('Ready with Device ID', device_id);
      setDevice(device_id);
      setLocalPlayer(player);
		});

		player.addListener('not_ready', ({ device_id }) => {
			console.log('Device ID has gone offline', device_id);
		});

	player.addListener('player_state_changed', (state => {
	  
	  if (!state || !state.track_window.current_track) {
		return;
	  }
	  console.log(state);

    const duration= state.track_window.current_track.duration_ms / 1000;
    const progress = state.position / 1000;
    setDuration(duration);
    setProgress(progress);
    setIsPaused(state.paused);
    setCurrentTrack(state.track_window.current_track);
	}));

		player.connect();
	};
}, []);

useEffect(() => {
  if (!localPlayer) return;
  async function connect() {
    await localPlayer.connect();
  }

  connect();
  return () => {
    localPlayer.disconnect();
  };

}, [localPlayer]);


	return (
		<Box>
			<Grid
				container
				px={3}
				sx={{
					bgcolor: 'Background.paper',
					height: 100,
					cursor: { xs: 'pointer', md: 'auto' },
					width: '100%',
					borderTop: '1px solid #292929'
				}}
			>
				<Grid
					item
					xs={12}
					md={3}
					sx={{
						display: 'flex',
						alignItems: 'center',
						justifyContent: 'flex-start'
					}}
				>
					<Avatar
						src={current_track?.album.images[0].url}
						alt={current_track?.album.name}
						variant="square"
						sx={{ width: 56, height: 56, marginRight: 2 }}
					/>
					<Box>
						<Typography sx={{ color: 'text.primary', fontSize: 14 }}>{current_track?.name}</Typography>
						<Typography sx={{ color: 'text.secondary', fontSize: 12 }}>{current_track?.artists[0].name}</Typography>
					</Box>
				</Grid>
				<Grid
					item
					sx={{
						display: { xs: 'none', md: 'flex' },
						flex: 1,
						justifyContent: { xs: 'flex-end', md: 'center' },
						alignItems: 'center'
					}}
				>
					Player controller
				</Grid>
			</Grid>
		</Box>
	);
};

export default Player;

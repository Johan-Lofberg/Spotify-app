import React, { useEffect, useState } from 'react';
import { Box, Divider } from '@mui/material';

import HomeIcon from '@mui/icons-material/Home';
import NavItem from '../NavItem/NavItem';
import NavPlaylist from '../NavPlaylist/NavPlaylist';

const SideNav = ({ spotifyApi, token }) => {
	const [playlists, setPlaylists] = useState([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		async function getPlaylists() {
			if (!spotifyApi) return;

			const data = await spotifyApi.getUserPlaylists();

			setLoading(false);
			setPlaylists(data.body.items);
		}
		getPlaylists();
	}, [spotifyApi, token]);

  const renderPlaylist = () => {
		if (loading) {
			return [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((_, id) => {
				return <NavPlaylist key={id} loading={loading} />;
			});
		}
	console.log({ playlists });
	return playlists.map((playlist, id) => (
	  <NavPlaylist key={playlist.id} id={playlist.id} loading={loading} name={playlist.name} />
	));
	};

	return (
		<Box
			sx={{
				bgcolor: 'default',
				width: 230,
				height: '100%',
				display: { xs: 'none', md: 'flex' },
				flexDirection: 'column'
			}}
		>
			<Box p={3}>
				<img src="/Spotify_Logo.png" width={'75%'} alt="Spotify" />
			</Box>
      <NavItem name="Home" Icon={HomeIcon} target= "/" />
			<Box px={3} py={1}>
				<Divider sx={{ backgroundColor: '#ffffff40' }} />
			</Box>
			<NavPlaylist loading={false} name="Pop" id={123} />
      <Box sx={{ overflowY: 'auto', flex: 1 }}>{renderPlaylist()}</Box>
		</Box>
	);
};

export default SideNav;
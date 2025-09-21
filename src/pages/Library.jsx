import { useEffect, useState } from 'react';
import { Box, List, Typography } from '@mui/material';
import PlaylistItem from '../components/PlaylistItem/PlaylistItem';
import { render } from 'react-dom';

const Library = ({ spotifyApi, token }) => {
	const [albumList, setAlbumList] = useState(null);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		async function getPlaylists() {
			if (!spotifyApi) return;

			const data = await spotifyApi.getUserPlaylists();

			setLoading(false);
			setAlbumList(data.body.items);
			console.log(data.body.items);
		}
		getPlaylists();
	}, [spotifyApi, token]);

    const renderPlaylistItems = () => {
        if (loading) {
            return [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((e, i) => <PlaylistItem loading={loading} key={i} />);
        }

        return albumList?.map((playlist, i) => (<PlaylistItem key={i} loading={loading} {...playlist} />));
    };
	return (
		<Box
			id="Library"
			px={3}
			sx={{
				display: { xs: 'flex', md: 'flex' },
				bgcolor: '#000000',
				flex: 1,
				flexDirection: 'column',
				overflowY: 'auto'
			}}
		>
			<Typography py={3} variant="h2" fontWeight="bold" sx={{ color: 'text.primary', fontSize: 30 }}>
				Ditt bibliotek
			</Typography>
			<List>
                {renderPlaylistItems()}
            </List>
		</Box>
	);
};

export default Library;
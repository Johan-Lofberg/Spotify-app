import { Avatar, Box, Typography, Skeleton } from '@mui/material';
import { useEffect, useState, useCallback } from 'react';
import { useParams } from 'react-router-dom';

const Playlist = ({ spotifyApi, token }) => {
	const [playlistInfo, setPlaylistInfo] = useState();
	const [songs, setSongs] = useState([]);
	const [status, setStatus] = useState({ isLoading: false, isError: null });
	const { id } = useParams();

	const formatSongData = useCallback(
		(songs) => {
			return songs.map((song, i) => {
				console.log({ song, i });
				const { track } = song;
				track.contextUri = `spotify:playlist:${id}`;
				track.position = i;
				return track;
			});
		},
		[id]
	);

	useEffect(() => {
		const getData = async () => {
			setStatus((prev) => ({ ...prev, isLoading: true }));
			try {
				const playlistDetail = await spotifyApi.getPlaylist(id);
				setPlaylistInfo({
					image: playlistDetail.body.images[0].url,
					name: playlistDetail.body.name
				});

				const { tracks } = playlistDetail.body;
				const formattedSongs = formatSongData(tracks.items);
				setSongs(formattedSongs);
			} catch (error) {
				setStatus((prev) => ({ ...prev, isError: error }));
			}
		};

		getData().finally(() => {
			setStatus((prev) => ({ ...prev, isLoading: false }));
		});
	}, [formatSongData, id, spotifyApi, token]);

	return (
		<Box id="Playlist__page" sx={{ bgcolor: '#121212', flex: 1, overflowY: 'auto' }}>
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
					flexDirection: { xs: 'column', md: 'row' }
				}}
			>
				{status.isLoading ? (
					<Skeleton
            variant="square"
						sx={{
							width: { xs: '100%', md: 235 },
							height: { xs: '100%', md: 235 }
						}}
					/>
				) : (
					<Avatar
						src={playlistInfo?.image}
						variant="square"
						alt={playlistInfo?.name || 'Playlist cover'}
						sx={{
							boxShadow: 15,
							width: { xs: '100%', md: 235 },
							height: { xs: '100%', md: 235 }
						}}
					/>
				)}
				<Box>
					<Typography sx={{ fontSize: 12, fontWeight: 'bold', color: 'text.primary' }}>Playlist</Typography>
					{status.isLoading ? (
            <Skeleton 
            variant='text'
            sx={{
							fontSize: { xs: 42, md: 72 }, width: 200 }} 
            />
          ) : (
			        <Typography
						    sx={{
							  fontSize: { xs: 42, md: 72 },
							  fontWeight: 'bold',
							  color: 'text.primary' }}
					>
						{playlistInfo?.name || 'Loading...'}
					</Typography>
		  )}
				</Box>
			</Box>
			{/* <SongTable songs={songs} loading={status.isLoading} spotifyApi={spotifyApi} /> */}
		</Box>
	);
};

export default Playlist;

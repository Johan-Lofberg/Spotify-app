import { PlayArrow, SkipNext, SkipPrevious, Pause } from '@mui/icons-material';
import { IconButton, Stack, Typography, Slider, Box } from '@mui/material';
import { formatTime } from '../../utils/formatTime';
import { useState } from 'react';

const PlayerControls = ({ player, is_paused, duration, progress }) => {
	const skipStyle = { width: 28, height: 28 };
	const [currentProgress, setCurrentProgress] = useState(progress);

useEffect(() => {
		const interval = setInterval(() => {
			if (!is_paused && player) {
				setCurrentProgress((c) => c + 1);
			}
		}, 1000);
		return () => clearInterval(interval);
	}, [is_paused, player]);

	useEffect(() => {
		setCurrentProgress(progress);
	}, [progress]);

	console.log(player);
	if (!player) return <Box>Transfer playback</Box>;

	return (
		<Stack direction="column" spacing={2} justify="center" alignItems="center" sx={{ width: '100%' }}>
			<Stack spacing={1} direction="row" justifyContent={'center'} alignItems="center" sx={{ width: '100%' }}>
				<IconButton size="small" sx={{ color: 'text.primary' }}>
					<SkipPrevious
						sx={skipStyle}
						onClick={() => {
							setCurrentProgress(0);
							player.previousTrack();
						}}
					/>
				</IconButton>
				<IconButton
					size="small"
					sx={{ color: 'text.primary' }}
					onClick={() => {
						player.togglePlay();
					}}
				>
					{is_paused ? (
						<PlayArrow sx={{ width: 38, height: 38 }} />
					) : (
						<Pause sx={{ width: 38, height: 38 }} />
					)}
				</IconButton>
				<IconButton
					size="small"
					sx={{ color: 'text.primary' }}
					onClick={() => {
						setCurrentProgress(0);
						player.nextTrack();
					}}
				>
					<SkipNext sx={skipStyle} />
				</IconButton>
			</Stack>
			<Stack spacing={2} direction="row" justifyContent={'center'} alignItems="center" sx={{ width: '75%' }}>
				<Typography variant="body1" sx={{ color: 'text.secondary', fontSize: 12 }}>
					{formatTime(currentProgress) /* ✅ visar progress i realtid */}
				</Typography>
				<Slider
					max={duration}
					value={currentProgress}
					min={0}
					size="medium"
					onChange={(event, value) => {
						console.log('Changed', value);
                        setCurrentProgress(value);
					}}

                    onChangeCommitted={(event, value) => {
                        player.seek(value * 1000); // ✅ s → ms
                    }}
				/>
				<Typography variant="body1" sx={{ color: 'text.secondary', fontSize: 12 }}>
					{formatTime(duration)}
				</Typography>
			</Stack>
		</Stack>
	);
};

export default PlayerControls;

import { Box, Skeleton } from '@mui/material';
import { NavLink } from 'react-router-dom';
import './NavPlaylist.css';

const NavPlaylist = ({ name, id, loading }) => {
	return (
		<NavLink className="playlist__navlink" to={loading ? '' : `/dashboard/playlist/${id}`} style={{ textDecoration: 'none' }}>
			<Box
				px={3}
				py={1}
				sx={{
					color: '#b3b3b3',
					cursor: 'pointer',
					'&:hover': { color: 'white' },
					fontSize: 10,

				}}
			>
				{loading ? <Skeleton variant={'text'} sx={{ fontSize:10 }} /> : name}
			</Box>
		</NavLink>
	);
};

export default NavPlaylist;
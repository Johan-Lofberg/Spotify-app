import { Box, List, ListItem, ListItemText } from '@mui/material';
import { Link } from 'react-router-dom';

const SideNav = ({ spotifyApi, token }) => {
  return (
    <Box
      sx={{
        width: 200,
        height: '100%',
        borderRight: '1px solid #333',
        bgcolor: '#111',
        color: '#fff',
        p: 2
      }}
    >
      <List>
        <ListItem button component={Link} to="/dashboard">
          <ListItemText primary="🏠 Home" />
        </ListItem>
        <ListItem button component={Link} to="/dashboard/library">
          <ListItemText primary="📚 Library" />
        </ListItem>
      </List>
    </Box>
  );
};

export default SideNav;

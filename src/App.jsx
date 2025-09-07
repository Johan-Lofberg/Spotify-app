import './App.css';
import { Box } from '@mui/material';
import Home from './pages/Home.jsx';
import Login from './pages/Login.jsx';	

function App({ spotifyApi }) {
	return (
		<Box className="App">
			<Home />
		</Box>
	);
}

export default App;

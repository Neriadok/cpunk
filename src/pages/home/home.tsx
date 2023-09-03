import { useState } from 'react';
import logo from '../../images/logo.png';
import './home.css';
import { Box, Container, IconButton, Stack } from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCirclePlus } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';

function Home() {
    const navigate = useNavigate();
    const [characters, setCharacters] = useState<CharacterData[]>([])
    return (
        <Container style={{ textAlign: 'center' }}>
            <img src={logo} className="logo" alt="logo" />
            <Box>
                <Stack>
                    <IconButton size='large' color='primary' onClick={() => navigate('/new-character')}>
                        <FontAwesomeIcon fontSize="inherit" icon={faCirclePlus} />
                    </IconButton>
                </Stack>
            </Box>
        </Container>
    );
}

export default Home;

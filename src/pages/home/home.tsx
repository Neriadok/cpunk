import { useState } from 'react';
import logo from '../../images/logo.png';
import './home.css';
import { Box, Card, Container, IconButton, Stack } from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCirclePlus } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import React from 'react';
import { Subject, takeUntil } from 'rxjs';
import { charactersSubject } from '../../lib/db';
import { Character } from '../../interfaces/character.interface';
import CharacterInfo from '../../components/character-info/character-info';

function Home() {
    const navigate = useNavigate();
    const [characters, setCharacters] = useState<Character[]>([]);
    const unsuscribe: Subject<any> = new Subject();

    React.useEffect(() => {
        charactersSubject.pipe(takeUntil(unsuscribe)).subscribe((c) => setCharacters(c));
        return () => { unsuscribe.next(true); unsuscribe.complete(); }
    }, [])
    return (
        <Container style={{ textAlign: 'center' }}>
            <img src={logo} className="logo" alt="logo" />
            <Box>
                <Stack spacing={1}>
                    {characters.map((character) => <Card sx={{p:1}}> <CharacterInfo character={character}></CharacterInfo></Card>)}
                    <IconButton size='large' color='primary' onClick={() => navigate('/new-character')}>
                        <FontAwesomeIcon fontSize="inherit" icon={faCirclePlus} />
                    </IconButton>
                </Stack>
            </Box>
        </Container>
    );
}

export default Home;

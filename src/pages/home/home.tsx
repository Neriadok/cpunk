import { useState } from 'react';
import logo from '../../images/logo.png';
import './home.css';
import { Box, Card, Container, Fab, IconButton, Stack } from '@mui/material';
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
                    {characters.map((character) => <Card sx={{ p: 1 }} onClick={() => navigate('character/' + character.uid)}>
                        <CharacterInfo character={character}></CharacterInfo>
                    </Card>)}
                </Stack>
            </Box>
            <Fab color='primary' sx={{position: 'sticky', bottom: '10px', m: 2, left: 'calc(50% - 25px)'}}  onClick={() => navigate('/new-character')}>
                <FontAwesomeIcon size='2xl' icon={faCirclePlus} />
            </Fab>
        </Container>
    );
}

export default Home;

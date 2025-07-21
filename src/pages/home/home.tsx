import { useState } from 'react';
import logo from '../../images/logo.png';
import './home.css';
import { Box, Card, Container, Fab, Stack } from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCirclePlus, faGun } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import React from 'react';
import { Subject, takeUntil } from 'rxjs';
import { charactersSubject } from '../../lib/db';
import { Character } from '../../interfaces/character.interface';
import CharacterInfo from '../../components/molecules/character-info/character-info';

function Home() {
  const navigate = useNavigate();
  const [characters, setCharacters] = useState<Character[]>([]);
  const unsuscribe: Subject<any> = new Subject();

  React.useEffect(() => {
    charactersSubject
      .pipe(takeUntil(unsuscribe))
      .subscribe((c) => setCharacters(c));
    return () => {
      unsuscribe.next(true);
      unsuscribe.complete();
    };
  }, []);
  return (
    <Container style={{ textAlign: 'center' }}>
      <img src={logo} className="logo" alt="logo" />
      <Box>
        <Stack spacing={1}>
          {characters.map((character) => (
            <Card
              key={character.uid}
              sx={{ p: 1 }}
              onClick={() => navigate('character/' + character.uid)}
            >
              <CharacterInfo character={character}></CharacterInfo>
            </Card>
          ))}
        </Stack>
      </Box>
      <Box
        sx={{
          position: 'sticky',
          bottom: '10px',
          width: '100%',
          height: '75px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'baseline',
        }}
      >
        <Fab
          color="primary"
          sx={{ m: 2 }}
          size="small"
          onClick={() => navigate('/new-character')}
        >
          <FontAwesomeIcon size="xl" icon={faGun} />
        </Fab>
        <Fab
          color="primary"
          sx={{ m: 2 }}
          onClick={() => navigate('/new-character')}
        >
          <FontAwesomeIcon size="2xl" icon={faCirclePlus} />
        </Fab>
      </Box>
    </Container>
  );
}

export default Home;

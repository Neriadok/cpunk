import { Container } from '@mui/material';
import { useState } from 'react';
import { getRandomCharacter } from '../../lib/character';
import CharacterCard from '../../components/character-card/character-card';

function NewCharacter() {
    const [character, setCharacter] = useState(getRandomCharacter());
    console.log(character);

    return (
        <Container>
            <CharacterCard character={character}></CharacterCard>
        </Container>
    );
}

export default NewCharacter;

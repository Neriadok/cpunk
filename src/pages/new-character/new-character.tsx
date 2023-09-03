import { Card, Container, Divider, Paper, Step, StepButton, StepContent, Stepper } from '@mui/material';
import { useState } from 'react';
import { getRandomCharacter } from '../../lib/character';
import CharacterInfo from '../../components/character-info/character-info';
import { BehaviorSubject, Subject, takeUntil } from 'rxjs';
import { Character } from '../../interfaces/character.interface';
import { t } from 'i18next';
import CharacterStats from '../../components/character-stats/character-stats';
import React from 'react';

function NewCharacter() {
    const [character, setCharacter] = useState(getRandomCharacter());
    const [subject] = useState(new BehaviorSubject<Character>(character));
    const [activeStep, setActiveStep] = useState(0);
    const unsuscribe: Subject<any> = new Subject();

    React.useEffect(() => {
        subject.pipe(takeUntil(unsuscribe)).subscribe((c) => setCharacter(c));
        return () => { unsuscribe.next(true); unsuscribe.complete(); }
    }, [])


    return (
        <Container>
            <Paper sx={{ p: 1 }}>
                <CharacterInfo character={character}></CharacterInfo>
                <Divider sx={{mt:1, mb: 1}} />
                <CharacterStats character={character} subject={subject}></CharacterStats>
            </Paper>
        </Container>
    );
}

export default NewCharacter;

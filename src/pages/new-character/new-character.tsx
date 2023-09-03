import { Card, Container, Divider, Paper, Step, StepButton, StepContent, Stepper } from '@mui/material';
import { useState } from 'react';
import { getRandomCharacter } from '../../lib/character';
import CharacterInfo from '../../components/character-info/character-info';
import { BehaviorSubject, Subject, takeUntil } from 'rxjs';
import { Character } from '../../interfaces/character.interface';
import { t } from 'i18next';
import CharacterStats from '../../components/character-stats/character-stats';
import React from 'react';
import CharacterInfoInput from '../../components/character-info-input/character-info-input';

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
                <CharacterInfoInput  character={character} subject={subject}></CharacterInfoInput>
                <Divider sx={{mt:1, mb: 1}} />
                <CharacterStats character={character} subject={subject}></CharacterStats>
                <Divider sx={{mt:1, mb: 1}} />
            </Paper>
        </Container>
    );
}

export default NewCharacter;

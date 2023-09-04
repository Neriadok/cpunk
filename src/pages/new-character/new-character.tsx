import { Container, Divider, Fab, Paper } from '@mui/material';
import { useState } from 'react';
import { getRandomCharacter } from '../../lib/character';
import { BehaviorSubject, Subject, takeUntil } from 'rxjs';
import { Character } from '../../interfaces/character.interface';
import CharacterStats from '../../components/character-stats/character-stats';
import React from 'react';
import CharacterInfoInput from '../../components/character-info-input/character-info-input';
import CharacterSkills from '../../components/character-skills/character-skills';
import CharacterRoleSkills from '../../components/character-role-skills/character-role-skills';
import CharacterStory from '../../components/character-story/character-story';
import { getElectionSkillPoints, getElectionSkills, sumOfRoleSkills, sumOfSkills } from '../../lib/skills';
import { maxRoleSkillPoints } from '../../interfaces/skills.interface';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSave } from '@fortawesome/free-solid-svg-icons';
import { saveCharacter } from '../../lib/db';
import { useNavigate } from 'react-router-dom';

function NewCharacter() {
    const navigate = useNavigate();
    const [character, setCharacter] = useState(getRandomCharacter());
    const [subject] = useState(new BehaviorSubject<Character>(character));
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
                <CharacterStory character={character} subject={subject}></CharacterStory>
                <Divider sx={{mt:1, mb: 1}} />
                <CharacterStats character={character} subject={subject}></CharacterStats>
                <Divider sx={{mt:1, mb: 1}} />
                <CharacterRoleSkills character={character} subject={subject}></CharacterRoleSkills>
                <Divider sx={{mt:1, mb: 1}} />
                <CharacterSkills character={character} subject={subject}></CharacterSkills>
            </Paper>
            <Fab color='primary' sx={{position: 'sticky', bottom: '10px', left: 'calc(50% - 25px)'}} disabled={!isValidCharacter()} onClick={() => save()}>
                <FontAwesomeIcon icon={faSave}/>
            </Fab>
        </Container>
    );

    function isValidCharacter(){
        const electionSkills = getElectionSkills(character)
        const electionSkillPoints = sumOfSkills(character, electionSkills.map(({ skill }) => skill));
        const maxSkillPoints = getElectionSkillPoints(character)
        return character.name && sumOfRoleSkills(character) === maxRoleSkillPoints && maxSkillPoints === electionSkillPoints;
    }

    async function save(){
        if(!isValidCharacter()) return;
        console.log(character);
        await saveCharacter(character);
        navigate('/');
    }
}

export default NewCharacter;

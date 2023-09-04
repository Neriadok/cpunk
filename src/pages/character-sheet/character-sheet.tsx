import { Accordion, AccordionDetails, AccordionSummary, Box, Card, Container, Divider, Fab, FormControl, InputAdornment, InputLabel, LinearProgress, MenuItem, Paper, Select, Stack, TextField, Typography } from '@mui/material';
import { useState } from 'react';
import { getRandomCharacter } from '../../lib/character';
import { BehaviorSubject, Subject, takeUntil } from 'rxjs';
import { Character } from '../../interfaces/character.interface';
import CharacterStats from '../../components/character-stats/character-stats';
import React from 'react';
import CharacterStory from '../../components/character-story/character-story';
import { getActionSkills, getElectionSkillPoints, getElectionSkills, getSkillValue, getSpecialSkillMoney, sumOfRoleSkills, sumOfSkills } from '../../lib/skills';
import { Skill, SkillFamily, maxRoleSkillPoints } from '../../interfaces/skills.interface';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBitcoinSign, faChevronDown, faCoins, faDiceD20, faSave } from '@fortawesome/free-solid-svg-icons';
import { charactersSubject, saveCharacter } from '../../lib/db';
import { useNavigate, useParams } from 'react-router-dom';
import CharacterInfo from '../../components/character-info/character-info';
import { t } from 'i18next';

function CharacterSheet() {
    const navigate = useNavigate();
    const params = useParams();
    const skills: SkillFamily[] = getActionSkills();
    const [character] = useState(charactersSubject.value.find(({ uid }) => uid === params.uid));
    const [activeSkill, setActiveSkill] = useState<Skill>(skills[0].skill);
    const [actionPoints, setActionPoints] = useState<number | undefined>(undefined);

    if (!character) {
        setTimeout(() => navigate('/'), 500);
    }

    return (
        !character ? <LinearProgress /> :
            <Container sx={{pb: 2}}>
                <Stack spacing={2}>
                    <Card>
                        <Accordion>
                            <AccordionSummary
                                aria-controls="panel1a-content"
                                id="panel1a-header"
                            >
                                <Stack>
                                    <CharacterInfo character={character}></CharacterInfo>
                                    <Box sx={{ position: 'relative', top: 3, textAlign: 'center' }}>
                                        <FontAwesomeIcon size='xs' icon={faChevronDown}></FontAwesomeIcon>
                                    </Box>
                                </Stack>
                            </AccordionSummary>
                            <AccordionDetails>
                                <Stack spacing={2}>
                                    <FormControl fullWidth>
                                        <TextField
                                            label={t('sheet.money')}
                                            InputProps={{
                                                endAdornment: <InputAdornment position="start">
                                                    <FontAwesomeIcon icon={faBitcoinSign}></FontAwesomeIcon>
                                                </InputAdornment>,
                                            }}
                                            defaultValue={getSpecialSkillMoney(character)}
                                        />
                                    </FormControl>
                                    <FormControl fullWidth>
                                        <TextField
                                            multiline
                                            rows={4}
                                            label={t('sheet.notes')}
                                        />
                                    </FormControl>
                                    <CharacterStory character={character} readonly={true}></CharacterStory>

                                </Stack>
                            </AccordionDetails>
                        </Accordion>
                    </Card>
                    <Card sx={{ p: 2 }}>
                        <CharacterStats character={character} readonly={true}></CharacterStats>
                        <Stack sx={{ mt: 2 }} direction='row' spacing={1}>
                            <FormControl fullWidth >
                                <InputLabel id="skill-label">{t('sheet.skill')}</InputLabel>
                                <Select
                                    labelId="skill-label"
                                    value={activeSkill}
                                    label="skill"
                                    onChange={(e: any) => changeSkill(e)}>
                                    {skills.map(({ skill }) => (<MenuItem value={skill}>{t('character.skill.' + skill)}</MenuItem>))}
                                </Select>
                            </FormControl>
                            <FormControl>
                                <TextField
                                    aria-readonly
                                    label={t('sheet.value')}
                                    value={getSkillValue(character, activeSkill)}
                                />
                            </FormControl>
                        </Stack>
                        <Box sx={{mt:2, textAlign: 'center'}}>
                            <Fab variant='extended'
                                onClick={() => rollDice()}
                                color='primary'
                                disabled={!activeSkill}>
                                <FontAwesomeIcon size='2xl' icon={faDiceD20} />
                                {actionPoints ? <Typography variant='h5' sx={{ ml: 2 }}>{actionPoints}</Typography> : ''}
                            </Fab>
                        </Box>
                    </Card>
                </Stack>
            </Container>
    );

    function rollDice() {
        if (!character) return;
        setActionPoints(getSkillValue(character, activeSkill) + Math.floor(Math.random() * 10) + 1)
    }

    function changeSkill(e: any) {
        setActiveSkill(e.target?.value);
        setActionPoints(undefined)
    }
}

export default CharacterSheet;

import { Accordion, AccordionDetails, AccordionSummary, Box, Button, Card, Container, Dialog, DialogActions, DialogTitle, Fab, FormControl, IconButton, InputAdornment, InputLabel, LinearProgress, MenuItem, Select, Stack, TextField, Typography } from '@mui/material';
import { useState } from 'react';
import CharacterStats from '../../components/character-stats/character-stats';
import CharacterStory from '../../components/character-story/character-story';
import { getActionSkills, getSkillValue, getSpecialSkillMoney } from '../../lib/skills';
import { Skill, SkillFamily } from '../../interfaces/skills.interface';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBitcoinSign, faChevronDown, faDiceD20, faSave, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { charactersSubject, removeCharacter, saveCharacter, } from '../../lib/db';
import { useNavigate, useParams } from 'react-router-dom';
import CharacterInfo from '../../components/character-info/character-info';
import { t } from 'i18next';

function CharacterSheet() {
    const navigate = useNavigate();
    const params = useParams();
    const character = charactersSubject.value.find(({ uid }) => uid === params.uid);
    const skills: SkillFamily[] = character ? getActionSkills().sort((a, b) => getSkillValue(character, b.skill) - getSkillValue(character, a.skill)) : [];
    const [activeSkill, setActiveSkill] = useState<Skill>(skills[0].skill);
    const [actionPoints, setActionPoints] = useState<number | undefined>(undefined);
    const [deletePopup, setDeletePopup] = useState<boolean>(false);
    const [notes, setNotes] = useState<string>(character?.notes || '');
    const [money, setMoney] = useState<number>(character?.money || 0);
    const [changes, setChanges] = useState<boolean>(false);

    return (
        !character ? <LinearProgress color='warning' /> :
            <Container sx={{ pb: 2 }}>
                <Stack spacing={1}>
                    <Accordion>
                        <AccordionSummary
                            aria-controls="panel1a-content"
                            id="panel1a-header"
                        >
                            <Stack sx={{ width: '100%' }}>
                                <CharacterInfo character={character}></CharacterInfo>
                                <Box sx={{ position: 'relative', top: 3, textAlign: 'center' }}>
                                    <FontAwesomeIcon size='xs' icon={faChevronDown}></FontAwesomeIcon>
                                </Box>
                            </Stack>
                        </AccordionSummary>
                        <AccordionDetails>
                            <Stack spacing={2}>
                                <CharacterStory character={character} readonly={true}></CharacterStory>
                                <Box sx={{ textAlign: 'right' }}>
                                    <Button endIcon={<FontAwesomeIcon icon={faTrashAlt} />} variant='outlined' color='error' onClick={() => setDeletePopup(true)}>
                                        {t('core.delete')}
                                    </Button>
                                </Box>
                            </Stack>
                        </AccordionDetails>
                    </Accordion>
                    <Accordion>
                        <AccordionSummary
                            aria-controls="panel1a-content"
                            id="panel1a-header"
                        >
                            <Stack sx={{ width: '100%' }} direction='row'>
                                <Typography flex="1" variant="h5" component="div" color='text.secondary'>{t('sheet.state')}</Typography>
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
                                        type='number'
                                        InputProps={{
                                            endAdornment: <InputAdornment position="start">
                                                <FontAwesomeIcon icon={faBitcoinSign}></FontAwesomeIcon>
                                            </InputAdornment>,
                                        }}
                                        defaultValue={character.money}
                                        onChange={(e) => { setMoney(parseInt(e.target.value)); setChanges(true); }}
                                    />
                                </FormControl>
                                <FormControl fullWidth>
                                    <TextField
                                        multiline
                                        type='textarea'
                                        rows={7}
                                        defaultValue={character.notes}
                                        label={t('sheet.notes')}
                                        onChange={(e) => { setNotes(e.target.value); setChanges(true); }}
                                    />
                                </FormControl>
                                <Box sx={{ textAlign: 'right' }}>
                                    <Button endIcon={<FontAwesomeIcon icon={faSave} />} variant='outlined' color="primary" disabled={!changes} onClick={async () => { await saveCharacter({ ...character, money, notes }); setChanges(false) }}>
                                        {t('core.save')}
                                    </Button>
                                </Box>
                            </Stack>
                        </AccordionDetails>
                    </Accordion>
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
                                    {skills.map(({ skill }) => (<MenuItem key={skill} value={skill}>{t('character.skill.' + skill)} ({character.skills[skill] || 0})</MenuItem>))}
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
                        <Box sx={{ mt: 2, textAlign: 'center' }}>
                            <Fab variant='extended'
                                onClick={() => rollDice()}
                                color={actionPoints === 1 ? 'error' : character.skills[activeSkill] ? 'primary' : 'secondary'}
                                disabled={!activeSkill}>
                                <FontAwesomeIcon size='2xl' icon={faDiceD20} />
                                {actionPoints ? <Typography variant='h5' sx={{ ml: 2 }}>{actionPoints}</Typography> : ''}
                            </Fab>
                        </Box>
                    </Card>
                </Stack>
                <Dialog
                    open={!!deletePopup}
                    onClose={() => setDeletePopup(false)}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <DialogTitle id="alert-dialog-title">{t('core.confirmaction')}</DialogTitle>
                    <DialogActions>
                        <Button color='inherit' onClick={() => setDeletePopup(false)} autoFocus>{t('core.cancel')}</Button>
                        <Button color='error' onClick={() => deleteCharacter()}>{t('core.delete')}</Button>
                    </DialogActions>
                </Dialog>
            </Container>
    );

    function rollDice() {
        if (!character) return;
        const dice = Math.floor(Math.random() * 10) + 1;
        setActionPoints(dice > 1 ? getSkillValue(character, activeSkill) + dice : dice)
    }

    function deleteCharacter() {
        if (!character) return;
        removeCharacter(character);
        navigate('/');
    }

    function changeSkill(e: any) {
        setActiveSkill(e.target?.value);
        setActionPoints(undefined)
    }
}

export default CharacterSheet;

import { Accordion, AccordionDetails, AccordionSummary, Box, Button, Card, Container, Dialog, DialogActions, DialogTitle, Fab, FormControl, Grid, IconButton, InputAdornment, InputLabel, LinearProgress, MenuItem, Select, Stack, TextField, Typography } from '@mui/material';
import { useState } from 'react';
import CharacterStats from '../../components/character-stats/character-stats';
import CharacterStory from '../../components/character-story/character-story';
import { getActionSkills, getSkillValue, getSpecialSkillMoney } from '../../lib/skills';
import { Skill, SkillFamily } from '../../interfaces/skills.interface';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBitcoinSign, faChevronDown, faCircleMinus, faCirclePlus, faDiceD20, faHeart, faRedo, faSave, faShield, faShieldHeart, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { charactersSubject, removeCharacter, saveCharacter, } from '../../lib/db';
import { useNavigate, useParams } from 'react-router-dom';
import CharacterInfo from '../../components/character-info/character-info';
import bodystate from '../../images/bodystate.jpg';
import { t } from 'i18next';
import { BodyState, Character } from '../../interfaces/character.interface';
import { getDefaultBodystate, getRandomCharacter } from '../../lib/character';

function CharacterSheet() {
    const navigate = useNavigate();
    const params = useParams();
    const character: Character = charactersSubject.value.find(({ uid }) => uid === params.uid) || getRandomCharacter();
    const skills: SkillFamily[] = character ? getActionSkills().sort((a, b) => getSkillValue(character, b.skill) - getSkillValue(character, a.skill)) : [];
    const [activeSkill, setActiveSkill] = useState<Skill>(skills[0].skill);
    const [actionPoints, setActionPoints] = useState<number | undefined>(undefined);
    const [deletePopup, setDeletePopup] = useState<boolean>(false);
    const [notes, setNotes] = useState<string>(character?.notes || '');
    const [money, setMoney] = useState<number>(character?.money || 0);
    const [health, setHealth] = useState<BodyState | undefined>(character?.health);
    const [armor, setArmor] = useState<BodyState | undefined>(character?.armor);
    const [changes, setChanges] = useState<boolean>(false);

    if (character.uid != params.uid) {
        navigate('/');
    }

    return (
        character.uid != params.uid ? <LinearProgress color='warning' /> :
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

                                <Stack sx={{ width: '100%' }} direction='row'>
                                    <Typography flex="1" variant="h6" component="div" color='text.secondary'>{t('sheet.bodystate')}</Typography>
                                    <Box sx={{ position: 'relative', top: 3, textAlign: 'center' }}>
                                        <IconButton onClick={() => resetBodyState()}>
                                            <FontAwesomeIcon icon={faRedo}></FontAwesomeIcon>
                                        </IconButton>
                                    </Box>
                                </Stack>
                                <Grid container sx={{
                                    backgroundImage: `url(${bodystate})`,
                                    backgroundPosition: 'center',
                                    backgroundSize: 'cover',
                                    textAlign: 'center',
                                }} spacing={1}>
                                    <Grid item xs={12}>
                                        <Stack sx={{ justifyContent: 'center', textAlign: 'center', border: '1px solid' }}>
                                            <Stack sx={{ justifyContent: 'center', textAlign: 'center' }} direction='row'>
                                                <IconButton size='small' onClick={() => changeHealth('head', false)}><FontAwesomeIcon icon={faCircleMinus} /></IconButton>
                                                <Typography
                                                    variant="h5"
                                                    sx={{ alignSelf: 'center' }}
                                                    component="div"
                                                    color={(health?.head || 0) > 0 ? 'inherit' : 'error'}>
                                                    {health?.head + ' '}<FontAwesomeIcon icon={faHeart} />
                                                </Typography>
                                                <IconButton size='small' onClick={() => changeHealth('head', true)}><FontAwesomeIcon icon={faCirclePlus} /></IconButton>
                                            </Stack>
                                            <Stack sx={{ justifyContent: 'center', textAlign: 'center' }} direction='row'>
                                                <IconButton size='small' onClick={() => changeArmor('head', false)}><FontAwesomeIcon icon={faCircleMinus} /></IconButton>
                                                <Typography
                                                    variant="h5"
                                                    sx={{ alignSelf: 'center' }}
                                                    component="div"
                                                    color={(armor?.head || 0) > 0 ? 'inherit' : 'primary'}>
                                                    {armor?.head + ' '}<FontAwesomeIcon icon={faShield} />
                                                </Typography>
                                                <IconButton size='small' onClick={() => changeArmor('head', true)}><FontAwesomeIcon icon={faCirclePlus} /></IconButton>
                                            </Stack>
                                        </Stack>
                                    </Grid>
                                    <Grid item xs={4}>
                                        <Stack sx={{ justifyContent: 'center', textAlign: 'center', border: '1px solid' }}>
                                            <Stack sx={{ justifyContent: 'center', textAlign: 'center' }} direction='row'>
                                                <IconButton size='small' onClick={() => changeHealth('armR', false)}><FontAwesomeIcon icon={faCircleMinus} /></IconButton>
                                                <Typography
                                                    variant="h5"
                                                    sx={{ alignSelf: 'center' }}
                                                    component="div"
                                                    color={(health?.armR || 0) > 0 ? 'inherit' : 'error'}>
                                                    {health?.armR + ' '}<FontAwesomeIcon icon={faHeart} />
                                                </Typography>
                                                <IconButton size='small' onClick={() => changeHealth('armR', true)}><FontAwesomeIcon icon={faCirclePlus} /></IconButton>
                                            </Stack>
                                            <Stack sx={{ justifyContent: 'center', textAlign: 'center' }} direction='row'>
                                                <IconButton size='small' onClick={() => changeArmor('armR', false)}><FontAwesomeIcon icon={faCircleMinus} /></IconButton>
                                                <Typography
                                                    variant="h5"
                                                    sx={{ alignSelf: 'center' }}
                                                    component="div"
                                                    color={(armor?.armR || 0) > 0 ? 'inherit' : 'primary'}>
                                                    {armor?.armR + ' '}<FontAwesomeIcon icon={faShield} />
                                                </Typography>
                                                <IconButton size='small' onClick={() => changeArmor('armR', true)}><FontAwesomeIcon icon={faCirclePlus} /></IconButton>
                                            </Stack>
                                        </Stack>
                                    </Grid>
                                    <Grid item xs={4}>
                                        <Stack sx={{ justifyContent: 'center', textAlign: 'center', border: '1px solid' }}>
                                            <Stack sx={{ justifyContent: 'center', textAlign: 'center' }} direction='row'>
                                                <IconButton size='small' onClick={() => changeHealth('trunk', false)}><FontAwesomeIcon icon={faCircleMinus} /></IconButton>
                                                <Typography
                                                    variant="h5"
                                                    sx={{ alignSelf: 'center' }}
                                                    component="div"
                                                    color={(health?.trunk || 0) > 0 ? 'inherit' : 'error'}>
                                                    {health?.trunk + ' '}<FontAwesomeIcon icon={faHeart} />
                                                </Typography>
                                                <IconButton size='small' onClick={() => changeHealth('trunk', true)}><FontAwesomeIcon icon={faCirclePlus} /></IconButton>
                                            </Stack>
                                            <Stack sx={{ justifyContent: 'center', textAlign: 'center' }} direction='row'>
                                                <IconButton size='small' onClick={() => changeArmor('trunk', false)}><FontAwesomeIcon icon={faCircleMinus} /></IconButton>
                                                <Typography
                                                    variant="h5"
                                                    sx={{ alignSelf: 'center' }}
                                                    component="div"
                                                    color={(armor?.trunk || 0) > 0 ? 'inherit' : 'primary'}>
                                                    {armor?.trunk + ' '}<FontAwesomeIcon icon={faShield} />
                                                </Typography>
                                                <IconButton size='small' onClick={() => changeArmor('trunk', true)}><FontAwesomeIcon icon={faCirclePlus} /></IconButton>
                                            </Stack>
                                        </Stack>
                                    </Grid>
                                    <Grid item xs={4}>
                                        <Stack sx={{ justifyContent: 'center', textAlign: 'center', border: '1px solid' }}>
                                            <Stack sx={{ justifyContent: 'center', textAlign: 'center' }} direction='row'>
                                                <IconButton size='small' onClick={() => changeHealth('armL', false)}><FontAwesomeIcon icon={faCircleMinus} /></IconButton>
                                                <Typography
                                                    variant="h5"
                                                    sx={{ alignSelf: 'center' }}
                                                    component="div"
                                                    color={(health?.armL || 0) > 0 ? 'inherit' : 'error'}>
                                                    {health?.armL + ' '}<FontAwesomeIcon icon={faHeart} />
                                                </Typography>
                                                <IconButton size='small' onClick={() => changeHealth('armL', true)}><FontAwesomeIcon icon={faCirclePlus} /></IconButton>
                                            </Stack>
                                            <Stack sx={{ justifyContent: 'center', textAlign: 'center' }} direction='row'>
                                                <IconButton size='small' onClick={() => changeArmor('armL', false)}><FontAwesomeIcon icon={faCircleMinus} /></IconButton>
                                                <Typography
                                                    variant="h5"
                                                    sx={{ alignSelf: 'center' }}
                                                    component="div"
                                                    color={(armor?.armL || 0) > 0 ? 'inherit' : 'primary'}>
                                                    {armor?.armL + ' '}<FontAwesomeIcon icon={faShield} />
                                                </Typography>
                                                <IconButton size='small' onClick={() => changeArmor('armL', true)}><FontAwesomeIcon icon={faCirclePlus} /></IconButton>
                                            </Stack>
                                        </Stack>
                                    </Grid>
                                    <Grid item xs={6}>
                                        <Stack sx={{ justifyContent: 'center', textAlign: 'center', border: '1px solid' }}>
                                            <Stack sx={{ justifyContent: 'center', textAlign: 'center' }} direction='row'>
                                                <IconButton size='small' onClick={() => changeHealth('legR', false)}><FontAwesomeIcon icon={faCircleMinus} /></IconButton>
                                                <Typography
                                                    variant="h5"
                                                    sx={{ alignSelf: 'center' }}
                                                    component="div"
                                                    color={(health?.legR || 0) > 0 ? 'inherit' : 'error'}>
                                                    {health?.legR + ' '}<FontAwesomeIcon icon={faHeart} />
                                                </Typography>
                                                <IconButton size='small' onClick={() => changeHealth('legR', true)}><FontAwesomeIcon icon={faCirclePlus} /></IconButton>
                                            </Stack>
                                            <Stack sx={{ justifyContent: 'center', textAlign: 'center' }} direction='row'>
                                                <IconButton size='small' onClick={() => changeArmor('legR', false)}><FontAwesomeIcon icon={faCircleMinus} /></IconButton>
                                                <Typography
                                                    variant="h5"
                                                    sx={{ alignSelf: 'center' }}
                                                    component="div"
                                                    color={(armor?.legR || 0) > 0 ? 'inherit' : 'primary'}>
                                                    {armor?.legR + ' '}<FontAwesomeIcon icon={faShield} />
                                                </Typography>
                                                <IconButton size='small' onClick={() => changeArmor('legR', true)}><FontAwesomeIcon icon={faCirclePlus} /></IconButton>
                                            </Stack>
                                        </Stack>
                                    </Grid>
                                    <Grid item xs={6}>
                                        <Stack sx={{ justifyContent: 'center', textAlign: 'center', border: '1px solid'}}>
                                            <Stack sx={{ justifyContent: 'center', textAlign: 'center' }} direction='row'>
                                                <IconButton size='small' onClick={() => changeHealth('legL', false)}><FontAwesomeIcon icon={faCircleMinus} /></IconButton>
                                                <Typography
                                                    variant="h5"
                                                    sx={{ alignSelf: 'center' }}
                                                    component="div"
                                                    color={(health?.legL || 0) > 0 ? 'inherit' : 'error'}>
                                                    {health?.legL + ' '}<FontAwesomeIcon icon={faHeart} />
                                                </Typography>
                                                <IconButton size='small' onClick={() => changeHealth('legL', true)}><FontAwesomeIcon icon={faCirclePlus} /></IconButton>
                                            </Stack>
                                            <Stack sx={{ justifyContent: 'center', textAlign: 'center' }} direction='row'>
                                                <IconButton size='small' onClick={() => changeArmor('legL', false)}><FontAwesomeIcon icon={faCircleMinus} /></IconButton>
                                                <Typography
                                                    variant="h5"
                                                    sx={{ alignSelf: 'center' }}
                                                    component="div"
                                                    color={(armor?.legL || 0) > 0 ? 'inherit' : 'primary'}>
                                                    {armor?.legL + ' '}<FontAwesomeIcon icon={faShield} />
                                                </Typography>
                                                <IconButton size='small' onClick={() => changeArmor('legL', true)}><FontAwesomeIcon icon={faCirclePlus} /></IconButton>
                                            </Stack>
                                        </Stack>
                                    </Grid>
                                </Grid>
                                <Box sx={{ textAlign: 'right' }}>
                                    <Button endIcon={<FontAwesomeIcon icon={faSave} />} variant='outlined' color="primary" disabled={!changes} onClick={() => saveChanges()}>
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
        const dice = Math.floor(Math.random() * 10) + 1;
        setActionPoints(dice > 1 ? getSkillValue(character, activeSkill) + dice : dice)
    }

    function deleteCharacter() {
        removeCharacter(character);
        navigate('/');
    }

    function changeSkill(e: any) {
        setActiveSkill(e.target?.value);
        setActionPoints(undefined);
    }

    async function changeHealth(part: keyof BodyState, add: boolean) {
        let value: number = health ? health[part] : 0;
        setHealth({ ...health, [part]: Math.min(character?.stats.TCO, Math.max(add ? ++value : --value, 0)) } as any);
        setChanges(true);
    }

    async function changeArmor(part: keyof BodyState, add: boolean) {
        let value: number = armor ? armor[part] : 0;
        setArmor({ ...armor, [part]: Math.max(add ? ++value : --value, 0) } as any);
        setChanges(true);
    }

    async function resetBodyState() {
        const next = getDefaultBodystate(character.stats);
        setHealth(next.health);
        setArmor(next.armor);
        setChanges(true);
    }

    async function saveChanges() {
        await saveCharacter({ ...character, money, notes, health, armor });
        setChanges(false)
    }
}

export default CharacterSheet;

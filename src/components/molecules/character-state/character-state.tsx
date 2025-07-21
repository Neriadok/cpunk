import {
  Box,
  Button,
  FormControl,
  Grid,
  IconButton,
  InputAdornment,
  Slider,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import { CharacterStateProps } from './character-state.interface';
import { t } from 'i18next';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState } from 'react';
import { BodyState } from '../../../interfaces/character.interface';
import { getDefaultBodystate } from '../../../lib/character';
import { saveCharacter } from '../../../lib/db';
import {
  faBitcoinSign,
  faBoltLightning,
  faCircleMinus,
  faCirclePlus,
  faDroplet,
  faHeart,
  faRedo,
  faSave,
  faShield,
  faSkullCrossbones,
} from '@fortawesome/free-solid-svg-icons';
import { bodyStateImage } from '../../../interfaces/images.interfaces';

function CharacterState({ character }: CharacterStateProps) {
  const [notes, setNotes] = useState<string>(character?.notes || '');
  const [money, setMoney] = useState<number>(character?.money || 0);
  const [shock, setShock] = useState<number>(character?.shock || 0);
  const [poison, setPoison] = useState<number>(character?.poison || 0);
  const [bleed, setBleed] = useState<number>(character?.bleed || 0);
  const [health, setHealth] = useState<BodyState | undefined>(
    character?.health
  );
  const [armor, setArmor] = useState<BodyState | undefined>(character?.armor);
  const [changes, setChanges] = useState<boolean>(false);

  return (
    <Stack spacing={2}>
      <FormControl fullWidth>
        <TextField
          label={t('sheet.money')}
          type="number"
          InputProps={{
            endAdornment: (
              <InputAdornment position="start">
                <FontAwesomeIcon icon={faBitcoinSign}></FontAwesomeIcon>
              </InputAdornment>
            ),
          }}
          defaultValue={character.money}
          onChange={(e) => {
            setMoney(parseInt(e.target.value));
            setChanges(true);
          }}
        />
      </FormControl>
      <FormControl fullWidth>
        <TextField
          multiline
          type="textarea"
          rows={7}
          defaultValue={character.notes}
          label={t('sheet.notes')}
          onChange={(e) => {
            setNotes(e.target.value);
            setChanges(true);
          }}
        />
      </FormControl>

      <Stack sx={{ width: '100%' }} direction="row">
        <Typography
          flex="1"
          variant="h6"
          component="div"
          color="text.secondary"
        >
          {t('sheet.bodystate')}
        </Typography>
        <Box sx={{ position: 'relative', top: 3, textAlign: 'center' }}>
          <IconButton onClick={() => resetBodyState()}>
            <FontAwesomeIcon icon={faRedo}></FontAwesomeIcon>
          </IconButton>
        </Box>
      </Stack>
      <Grid
        container
        sx={{
          backgroundImage: `url(${bodyStateImage})`,
          backgroundPosition: 'center',
          backgroundSize: 'cover',
          textAlign: 'center',
        }}
        spacing={1}
      >
        <Grid item xs={12}>
          <Stack
            sx={{
              justifyContent: 'center',
              textAlign: 'center',
              border: '1px solid',
            }}
          >
            <Stack
              sx={{ justifyContent: 'center', textAlign: 'center' }}
              direction="row"
            >
              <IconButton
                size="small"
                onClick={() => changeHealth('head', false)}
              >
                <FontAwesomeIcon icon={faCircleMinus} />
              </IconButton>
              <Typography
                variant="h5"
                sx={{ alignSelf: 'center' }}
                component="div"
                color={(health?.head || 0) > 0 ? 'inherit' : 'error'}
              >
                {health?.head + ' '}
                <FontAwesomeIcon icon={faHeart} />
              </Typography>
              <IconButton
                size="small"
                onClick={() => changeHealth('head', true)}
              >
                <FontAwesomeIcon icon={faCirclePlus} />
              </IconButton>
            </Stack>
            <Stack
              sx={{ justifyContent: 'center', textAlign: 'center' }}
              direction="row"
            >
              <IconButton
                size="small"
                onClick={() => changeArmor('head', false)}
              >
                <FontAwesomeIcon icon={faCircleMinus} />
              </IconButton>
              <Typography
                variant="h5"
                sx={{ alignSelf: 'center' }}
                component="div"
                color={(armor?.head || 0) > 0 ? 'inherit' : 'primary'}
              >
                {armor?.head + ' '}
                <FontAwesomeIcon icon={faShield} />
              </Typography>
              <IconButton
                size="small"
                onClick={() => changeArmor('head', true)}
              >
                <FontAwesomeIcon icon={faCirclePlus} />
              </IconButton>
            </Stack>
          </Stack>
        </Grid>
        <Grid item xs={4}>
          <Stack
            sx={{
              justifyContent: 'center',
              textAlign: 'center',
              border: '1px solid',
            }}
          >
            <Stack
              sx={{ justifyContent: 'center', textAlign: 'center' }}
              direction="row"
            >
              <IconButton
                size="small"
                onClick={() => changeHealth('armR', false)}
              >
                <FontAwesomeIcon icon={faCircleMinus} />
              </IconButton>
              <Typography
                variant="h5"
                sx={{ alignSelf: 'center' }}
                component="div"
                color={(health?.armR || 0) > 0 ? 'inherit' : 'error'}
              >
                {health?.armR + ' '}
                <FontAwesomeIcon icon={faHeart} />
              </Typography>
              <IconButton
                size="small"
                onClick={() => changeHealth('armR', true)}
              >
                <FontAwesomeIcon icon={faCirclePlus} />
              </IconButton>
            </Stack>
            <Stack
              sx={{ justifyContent: 'center', textAlign: 'center' }}
              direction="row"
            >
              <IconButton
                size="small"
                onClick={() => changeArmor('armR', false)}
              >
                <FontAwesomeIcon icon={faCircleMinus} />
              </IconButton>
              <Typography
                variant="h5"
                sx={{ alignSelf: 'center' }}
                component="div"
                color={(armor?.armR || 0) > 0 ? 'inherit' : 'primary'}
              >
                {armor?.armR + ' '}
                <FontAwesomeIcon icon={faShield} />
              </Typography>
              <IconButton
                size="small"
                onClick={() => changeArmor('armR', true)}
              >
                <FontAwesomeIcon icon={faCirclePlus} />
              </IconButton>
            </Stack>
          </Stack>
        </Grid>
        <Grid item xs={4}>
          <Stack
            sx={{
              justifyContent: 'center',
              textAlign: 'center',
              border: '1px solid',
            }}
          >
            <Stack
              sx={{ justifyContent: 'center', textAlign: 'center' }}
              direction="row"
            >
              <IconButton
                size="small"
                onClick={() => changeHealth('trunk', false)}
              >
                <FontAwesomeIcon icon={faCircleMinus} />
              </IconButton>
              <Typography
                variant="h5"
                sx={{ alignSelf: 'center' }}
                component="div"
                color={(health?.trunk || 0) > 0 ? 'inherit' : 'error'}
              >
                {health?.trunk + ' '}
                <FontAwesomeIcon icon={faHeart} />
              </Typography>
              <IconButton
                size="small"
                onClick={() => changeHealth('trunk', true)}
              >
                <FontAwesomeIcon icon={faCirclePlus} />
              </IconButton>
            </Stack>
            <Stack
              sx={{ justifyContent: 'center', textAlign: 'center' }}
              direction="row"
            >
              <IconButton
                size="small"
                onClick={() => changeArmor('trunk', false)}
              >
                <FontAwesomeIcon icon={faCircleMinus} />
              </IconButton>
              <Typography
                variant="h5"
                sx={{ alignSelf: 'center' }}
                component="div"
                color={(armor?.trunk || 0) > 0 ? 'inherit' : 'primary'}
              >
                {armor?.trunk + ' '}
                <FontAwesomeIcon icon={faShield} />
              </Typography>
              <IconButton
                size="small"
                onClick={() => changeArmor('trunk', true)}
              >
                <FontAwesomeIcon icon={faCirclePlus} />
              </IconButton>
            </Stack>
          </Stack>
        </Grid>
        <Grid item xs={4}>
          <Stack
            sx={{
              justifyContent: 'center',
              textAlign: 'center',
              border: '1px solid',
            }}
          >
            <Stack
              sx={{ justifyContent: 'center', textAlign: 'center' }}
              direction="row"
            >
              <IconButton
                size="small"
                onClick={() => changeHealth('armL', false)}
              >
                <FontAwesomeIcon icon={faCircleMinus} />
              </IconButton>
              <Typography
                variant="h5"
                sx={{ alignSelf: 'center' }}
                component="div"
                color={(health?.armL || 0) > 0 ? 'inherit' : 'error'}
              >
                {health?.armL + ' '}
                <FontAwesomeIcon icon={faHeart} />
              </Typography>
              <IconButton
                size="small"
                onClick={() => changeHealth('armL', true)}
              >
                <FontAwesomeIcon icon={faCirclePlus} />
              </IconButton>
            </Stack>
            <Stack
              sx={{ justifyContent: 'center', textAlign: 'center' }}
              direction="row"
            >
              <IconButton
                size="small"
                onClick={() => changeArmor('armL', false)}
              >
                <FontAwesomeIcon icon={faCircleMinus} />
              </IconButton>
              <Typography
                variant="h5"
                sx={{ alignSelf: 'center' }}
                component="div"
                color={(armor?.armL || 0) > 0 ? 'inherit' : 'primary'}
              >
                {armor?.armL + ' '}
                <FontAwesomeIcon icon={faShield} />
              </Typography>
              <IconButton
                size="small"
                onClick={() => changeArmor('armL', true)}
              >
                <FontAwesomeIcon icon={faCirclePlus} />
              </IconButton>
            </Stack>
          </Stack>
        </Grid>
        <Grid item xs={6}>
          <Stack
            sx={{
              justifyContent: 'center',
              textAlign: 'center',
              border: '1px solid',
            }}
          >
            <Stack
              sx={{ justifyContent: 'center', textAlign: 'center' }}
              direction="row"
            >
              <IconButton
                size="small"
                onClick={() => changeHealth('legR', false)}
              >
                <FontAwesomeIcon icon={faCircleMinus} />
              </IconButton>
              <Typography
                variant="h5"
                sx={{ alignSelf: 'center' }}
                component="div"
                color={(health?.legR || 0) > 0 ? 'inherit' : 'error'}
              >
                {health?.legR + ' '}
                <FontAwesomeIcon icon={faHeart} />
              </Typography>
              <IconButton
                size="small"
                onClick={() => changeHealth('legR', true)}
              >
                <FontAwesomeIcon icon={faCirclePlus} />
              </IconButton>
            </Stack>
            <Stack
              sx={{ justifyContent: 'center', textAlign: 'center' }}
              direction="row"
            >
              <IconButton
                size="small"
                onClick={() => changeArmor('legR', false)}
              >
                <FontAwesomeIcon icon={faCircleMinus} />
              </IconButton>
              <Typography
                variant="h5"
                sx={{ alignSelf: 'center' }}
                component="div"
                color={(armor?.legR || 0) > 0 ? 'inherit' : 'primary'}
              >
                {armor?.legR + ' '}
                <FontAwesomeIcon icon={faShield} />
              </Typography>
              <IconButton
                size="small"
                onClick={() => changeArmor('legR', true)}
              >
                <FontAwesomeIcon icon={faCirclePlus} />
              </IconButton>
            </Stack>
          </Stack>
        </Grid>
        <Grid item xs={6}>
          <Stack
            sx={{
              justifyContent: 'center',
              textAlign: 'center',
              border: '1px solid',
            }}
          >
            <Stack
              sx={{ justifyContent: 'center', textAlign: 'center' }}
              direction="row"
            >
              <IconButton
                size="small"
                onClick={() => changeHealth('legL', false)}
              >
                <FontAwesomeIcon icon={faCircleMinus} />
              </IconButton>
              <Typography
                variant="h5"
                sx={{ alignSelf: 'center' }}
                component="div"
                color={(health?.legL || 0) > 0 ? 'inherit' : 'error'}
              >
                {health?.legL + ' '}
                <FontAwesomeIcon icon={faHeart} />
              </Typography>
              <IconButton
                size="small"
                onClick={() => changeHealth('legL', true)}
              >
                <FontAwesomeIcon icon={faCirclePlus} />
              </IconButton>
            </Stack>
            <Stack
              sx={{ justifyContent: 'center', textAlign: 'center' }}
              direction="row"
            >
              <IconButton
                size="small"
                onClick={() => changeArmor('legL', false)}
              >
                <FontAwesomeIcon icon={faCircleMinus} />
              </IconButton>
              <Typography
                variant="h5"
                sx={{ alignSelf: 'center' }}
                component="div"
                color={(armor?.legL || 0) > 0 ? 'inherit' : 'primary'}
              >
                {armor?.legL + ' '}
                <FontAwesomeIcon icon={faShield} />
              </Typography>
              <IconButton
                size="small"
                onClick={() => changeArmor('legL', true)}
              >
                <FontAwesomeIcon icon={faCirclePlus} />
              </IconButton>
            </Stack>
          </Stack>
        </Grid>
      </Grid>
      <Stack>
        <Stack
          spacing={1}
          direction="row"
          sx={{ display: 'flex', alignItems: 'center' }}
        >
          <IconButton
            color={
              shock + bleed + poison >= character.stats.TCO
                ? 'warning'
                : 'primary'
            }
          >
            <FontAwesomeIcon icon={faBoltLightning} />
          </IconButton>
          <Box sx={{ flex: 1, pr: 1 }}>
            <Slider
              valueLabelDisplay="auto"
              color="primary"
              defaultValue={shock}
              step={1}
              marks
              min={0}
              max={character.stats.TCO}
              onChange={(e: any) => {
                setShock(e.target?.value || 0);
                setChanges(true);
              }}
            />
          </Box>
        </Stack>
        <Stack
          spacing={1}
          direction="row"
          sx={{ display: 'flex', alignItems: 'center' }}
        >
          <IconButton
            color={
              shock + bleed + poison >= character.stats.TCO
                ? 'warning'
                : 'primary'
            }
          >
            <FontAwesomeIcon icon={faSkullCrossbones} />
          </IconButton>
          <Box sx={{ flex: 1, pr: 1 }}>
            <Slider
              valueLabelDisplay="auto"
              color="primary"
              defaultValue={poison}
              step={1}
              marks
              min={0}
              max={character.stats.TCO}
              onChange={(e: any) => {
                setPoison(e.target?.value || 0);
                setChanges(true);
              }}
            />
          </Box>
        </Stack>
        <Stack
          spacing={1}
          direction="row"
          sx={{ display: 'flex', alignItems: 'center' }}
        >
          <IconButton
            color={
              shock + bleed + poison >= character.stats.TCO
                ? 'warning'
                : 'primary'
            }
          >
            <FontAwesomeIcon icon={faDroplet} />
          </IconButton>
          <Box sx={{ flex: 1, pr: 1 }}>
            <Slider
              valueLabelDisplay="auto"
              color="primary"
              defaultValue={bleed}
              step={1}
              marks
              min={0}
              max={character.stats.TCO}
              onChange={(e: any) => {
                setBleed(e.target?.value || 0);
                setChanges(true);
              }}
            />
          </Box>
        </Stack>
      </Stack>
      <Box sx={{ textAlign: 'right' }}>
        <Button
          endIcon={<FontAwesomeIcon icon={faSave} />}
          variant="outlined"
          color="primary"
          disabled={!changes}
          onClick={() => saveChanges()}
        >
          {t('core.save')}
        </Button>
      </Box>
    </Stack>
  );

  async function changeHealth(part: keyof BodyState, add: boolean) {
    let value: number = health ? health[part] : 0;
    setHealth({
      ...health,
      [part]: Math.min(
        character?.stats.TCO,
        Math.max(add ? ++value : --value, 0)
      ),
    } as any);
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
    setPoison(next.poison);
    setShock(next.shock);
    setBleed(next.bleed);
    setChanges(true);
  }

  async function saveChanges() {
    await saveCharacter({ ...character, money, notes, health, armor });
    setChanges(false);
  }
}

export default CharacterState;

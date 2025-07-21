import {
  Box,
  Button,
  FormControl,
  Grid,
  IconButton,
  InputAdornment,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import { t } from 'i18next';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState } from 'react';
import { saveCharacter } from '../../../lib/db';
import {
  faBitcoinSign,
  faCircleMinus,
  faCirclePlus,
  faHeart,
  faRedo,
  faSave,
  faShield,
} from '@fortawesome/free-solid-svg-icons';
import { bodyStateImage } from '../../../interfaces/images.interfaces';
import { getDefaultBodystate } from '../../../lib/character-generator';
import { CharacterStatusProps } from './character-status.interface';
import CharacterStateAlterations from '../character-state-alterations/character-state-alterations';
import { BodyState, Character } from '../../../interfaces/character.interface';

function CharacterState({ character }: CharacterStatusProps) {
  const [characterStatus, setCharacterStatus] = useState<Character>(character);
  const [notes, setNotes] = useState<string>(characterStatus?.notes || '');
  const [money, setMoney] = useState<number>(characterStatus?.money || 0);
  const [health, setHealth] = useState<BodyState | undefined>(
    characterStatus?.health
  );
  const [armor, setArmor] = useState<BodyState | undefined>(
    characterStatus?.armor
  );
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
          defaultValue={characterStatus.money}
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
          defaultValue={characterStatus.notes}
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
        <Grid size={12}>
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
        <Grid size={4}>
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
        <Grid size={4}>
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
        <Grid size={4}>
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
        <Grid size={6}>
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
        <Grid size={6}>
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
      <CharacterStateAlterations
        character={character}
        onChange={(c) => setNewStatus(c)}
      />
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
    const next = getDefaultBodystate(characterStatus.stats);
    setNewStatus({ ...characterStatus, ...next });
  }

  async function setNewStatus(newStatus: Partial<Character>) {
    setCharacterStatus({ ...characterStatus, ...newStatus });
    setChanges(true);
  }

  async function saveChanges() {
    await saveCharacter({ ...character, money, notes, health, armor });
    setChanges(false);
  }
}

export default CharacterState;

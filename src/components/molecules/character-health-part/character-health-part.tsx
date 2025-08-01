import { IconButton, Stack, Typography } from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCircleMinus,
  faCirclePlus,
  faHeart,
  faShield,
} from '@fortawesome/free-solid-svg-icons';
import { CharacterHealthPartProps } from './character-health-part.interface';
import { getHealth } from '../../../lib/bonifications';

function CharacterHealthPart({
  character,
  part,
  setArmor,
  setHealth,
}: CharacterHealthPartProps) {
  const partHealth = character?.health?.[part] || 0;
  const partArmor = character?.armor?.[part] || 0;

  return (
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
        <IconButton size="small" onClick={() => changePartHealth(false)}>
          <FontAwesomeIcon icon={faCircleMinus} />
        </IconButton>
        <Typography
          variant="h5"
          sx={{ alignSelf: 'center' }}
          component="div"
          color={(partHealth || 0) > 0 ? 'inherit' : 'error'}
        >
          {partHealth + ' '}
          <FontAwesomeIcon icon={faHeart} />
        </Typography>
        <IconButton size="small" onClick={() => changePartHealth(true)}>
          <FontAwesomeIcon icon={faCirclePlus} />
        </IconButton>
      </Stack>
      <Stack
        sx={{ justifyContent: 'center', textAlign: 'center' }}
        direction="row"
      >
        <IconButton size="small" onClick={() => changePartArmor(false)}>
          <FontAwesomeIcon icon={faCircleMinus} />
        </IconButton>
        <Typography
          variant="h5"
          sx={{ alignSelf: 'center' }}
          component="div"
          color={(partArmor || 0) > 0 ? 'inherit' : 'primary'}
        >
          {partArmor + ' '}
          <FontAwesomeIcon icon={faShield} />
        </Typography>
        <IconButton size="small" onClick={() => changePartArmor(true)}>
          <FontAwesomeIcon icon={faCirclePlus} />
        </IconButton>
      </Stack>
    </Stack>
  );

  function getValue(add: boolean, current: number = 0) {
    return Math.max(add ? current + 1 : current - 1, 0);
  }

  function changePartArmor(add: boolean) {
    const value = getValue(add, partArmor);
    setArmor(part, value);
  }
  function changePartHealth(add: boolean) {
    const value = Math.min(getHealth(character), getValue(add, partHealth));
    setHealth(part, value);
  }
}

export default CharacterHealthPart;

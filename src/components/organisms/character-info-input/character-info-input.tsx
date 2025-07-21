import {
  Avatar,
  Box,
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
} from '@mui/material';
import { CharacterInfoInputProps } from './character-info-input.interface';
import { t } from 'i18next';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMars, faVenus } from '@fortawesome/free-solid-svg-icons';
import { roles } from '../../../interfaces/role.interface';
import { getRandomEvents } from '../../../lib/character';
import { getAverageRoleSkills } from '../../../lib/skills';
import { roleImages } from '../../../interfaces/images.interfaces';

function CharacterInfoInput({ character, subject }: CharacterInfoInputProps) {
  const image = roleImages;
  const ages = [];
  while (ages.length < 12) {
    ages.push(18 + ages.length);
  }

  return (
    <Stack spacing={2}>
      <Box
        sx={{ alignItems: 'center', display: 'flex', justifyContent: 'center' }}
      >
        <Avatar
          src={image[character.role.key]}
          alt={t('role.' + character.role.key)}
          sx={{ width: 200, height: 200 }}
        />
      </Box>
      <FormControl fullWidth>
        <TextField
          required
          id="outlined-required"
          label={t('character.name')}
          defaultValue={character.name}
          onChange={(e: any) => changeName(e)}
        />
      </FormControl>
      <FormControl fullWidth>
        <InputLabel id="role-label">{t('character.role')}</InputLabel>
        <Select
          labelId="role-label"
          id="demo-simple-select"
          value={character.role.key}
          label="Role"
          onChange={(e: any) => changeRole(e)}
        >
          {roles.map(({ key }) => (
            <MenuItem key={key} value={key}>
              {t('role.' + key)}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <FormControl fullWidth>
        <InputLabel id="role-label">{t('character.age')}</InputLabel>
        <Select
          labelId="role-label"
          id="demo-simple-select"
          value={character.age}
          label="Role"
          onChange={(e: any) => setAge(e)}
        >
          {ages.map((age) => (
            <MenuItem key={age} value={age}>
              {age} {t('core.years')}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <Stack direction="row" display="flex" justifyContent="space-around">
        <IconButton
          color={character.gender ? 'warning' : 'inherit'}
          onClick={() => setGender(true)}
        >
          <FontAwesomeIcon icon={faMars}></FontAwesomeIcon>
        </IconButton>
        <IconButton
          color={character.gender ? 'inherit' : 'warning'}
          onClick={() => setGender(false)}
        >
          <FontAwesomeIcon icon={faVenus}></FontAwesomeIcon>
        </IconButton>
      </Stack>
    </Stack>
  );

  function changeRole(e: any) {
    const role =
      roles.find(({ key }) => key === e.target?.value) || character.role;
    const skills = getAverageRoleSkills(role);
    subject.next({ ...character, role, skills });
  }

  function setAge(e: any) {
    const age = e.target?.value || character.age;
    const events = getRandomEvents(age);
    subject.next({ ...character, age, events });
  }

  function setGender(gender: boolean) {
    subject.next({ ...character, gender });
  }

  function changeName(e: any) {
    const name = e.target?.value || character.age;
    subject.next({ ...character, name });
  }
}

export default CharacterInfoInput;

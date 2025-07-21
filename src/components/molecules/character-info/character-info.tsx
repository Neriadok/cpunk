import { Avatar, Box, Stack, Typography } from '@mui/material';
import { CharacterInfoProps } from './character-info.interface';
import { t } from 'i18next';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMars, faVenus } from '@fortawesome/free-solid-svg-icons';
import { roleImages } from '../../../interfaces/images.interfaces';

function CharacterInfo({ character }: CharacterInfoProps) {
  const image = roleImages;

  return (
    <Stack direction="row" sx={{ display: 'flex', alignItems: 'center' }}>
      <Avatar
        src={image[character.role.key]}
        alt={t('role.' + character.role.key)}
        sx={{ width: 80, height: 80 }}
      />
      <Box sx={{ flex: 1, pl: 2 }}>
        <Stack>
          <Typography gutterBottom variant="h5" component="div" color="primary">
            {character.name}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {t('role.' + character.role.key) + ' '}
            <FontAwesomeIcon icon={character.gender ? faMars : faVenus} />
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {character.age} {t('core.years')}
          </Typography>
        </Stack>
      </Box>
    </Stack>
  );
}

export default CharacterInfo;

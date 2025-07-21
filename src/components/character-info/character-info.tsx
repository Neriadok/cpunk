import { Avatar, Box, Stack, Typography } from '@mui/material';
import { CharacterInfoProps } from './character-info.interface';
import { t } from 'i18next';
import cops from '../../images/roles/cops.png';
import corpos from '../../images/roles/corpos.png';
import fixers from '../../images/roles/fixers.png';
import medias from '../../images/roles/medias.png';
import merc from '../../images/roles/merc.png';
import netrunners from '../../images/roles/netrunners.png';
import nomads from '../../images/roles/nomads.png';
import rocknrolla from '../../images/roles/rocknrolla.png';
import techies from '../../images/roles/techies.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMars, faVenus } from '@fortawesome/free-solid-svg-icons';

function CharacterInfo({ character }: CharacterInfoProps) {
  const image = {
    cops,
    corpos,
    fixers,
    medias,
    merc,
    netrunners,
    nomads,
    rocknrolla,
    techies,
  };

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

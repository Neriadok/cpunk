import { Box, Button, Grid, IconButton, Typography } from '@mui/material';
import { CharacterStatsProps } from './character-stats.interface';
import { useState } from 'react';
import { Stat, stats } from '../../../interfaces/stats.interface';
import { t } from 'i18next';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRedo } from '@fortawesome/free-solid-svg-icons';
import { getRandomStats } from '../../../lib/character-generator';
import {
  getBonus,
  getHealth,
  getJumpValue,
  getLift,
  getRunValue,
} from '../../../lib/bonifications';

function CharacterStats({
  subject,
  character,
  readonly,
}: CharacterStatsProps): JSX.Element {
  const [targetStat, setTargetStat] = useState<Stat | undefined>();

  return (
    <Box>
      <Box display="flex">
        <Typography
          flex="1"
          variant="h5"
          component="div"
          color="text.secondary"
        >
          {t('character.stats')}
        </Typography>
        {readonly ? (
          ''
        ) : (
          <IconButton size="small" color="inherit" onClick={() => resetStats()}>
            <FontAwesomeIcon icon={faRedo} />
          </IconButton>
        )}
      </Box>
      <Grid container sx={{ textAlign: 'center' }} spacing={1}>
        {stats.map((stat) => (
          <Grid key={stat} size={4} onClick={() => chooseStat(stat)}>
            <Typography variant="body2" component="div" color="text.secondary">
              {stat}
              {getStatBonus(stat)}
            </Typography>
            <Button
              fullWidth={true}
              variant="outlined"
              color={targetStat === stat ? 'warning' : 'inherit'}
            >
              {character.stats[stat]}
            </Button>
          </Grid>
        ))}
        <Grid size={3}>
          <Typography variant="body2" component="div" color="text.secondary">
            {t('character.extrastats.run')}
          </Typography>
          <Button fullWidth={true} variant="outlined" color="inherit">
            {getRunValue(character)}
          </Button>
        </Grid>
        <Grid size={3}>
          <Typography variant="body2" component="div" color="text.secondary">
            {t('character.extrastats.jump')}
          </Typography>
          <Button fullWidth={true} variant="outlined" color="inherit">
            {getJumpValue(character)}
          </Button>
        </Grid>
        <Grid size={3}>
          <Typography variant="body2" component="div" color="text.secondary">
            {t('character.extrastats.lift')}
          </Typography>
          <Button fullWidth={true} variant="outlined" color="inherit">
            {getLift(character)}
          </Button>
        </Grid>
        <Grid size={3}>
          <Typography variant="body2" component="div" color="text.secondary">
            {t('character.extrastats.health')}
          </Typography>
          <Button fullWidth={true} variant="outlined" color="inherit">
            {getHealth(character)}
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
  function getStatBonus(stat: Stat) {
    const bonus = getBonus(character, stat, 'stats');
    return bonus ? ` (${bonus})` : '';
  }

  function chooseStat(stat: Stat) {
    if (readonly) return;
    if (targetStat) {
      setTargetStat(undefined);
      const aux = character.stats[targetStat];
      character.stats[targetStat] = character.stats[stat];
      character.stats[stat] = aux;
      subject?.next({ ...character });
    } else {
      setTargetStat(stat);
    }
  }

  function resetStats() {
    if (readonly) return;
    setTargetStat(undefined);
    subject?.next({ ...character, stats: getRandomStats() });
  }
}

export default CharacterStats;

import { Grid, Typography } from '@mui/material';
import { t } from 'i18next';
import { ItemAmmunitionInfoProps } from './item-melee-weapon-info.interface';

function ItemAmmunitionInfo({ item }: ItemAmmunitionInfoProps) {
  return (
    <Grid container columns={24} rowSpacing={1} columnSpacing={2}>
      <Grid
        size="auto"
        sx={{ textAlign: 'center', display: 'flex', justifyContent: 'center' }}
      >
        <Typography variant="body2" color="text.secondary" sx={{ pr: 1 }}>
          {t('item.capacity')}
        </Typography>
        <Typography variant="body2" color="secondary">
          {item.capacity ?? '-'}
        </Typography>
      </Grid>
      <Grid
        size="auto"
        sx={{ textAlign: 'center', display: 'flex', justifyContent: 'center' }}
      >
        <Typography variant="body2" color="text.secondary" sx={{ pr: 1 }}>
          {t('item.randomDamage')}
        </Typography>
        <Typography variant="body2" color="secondary">
          {item.randomDamage ? `${item.randomDamage}` : '-'}
        </Typography>
      </Grid>
      <Grid
        size="auto"
        sx={{ textAlign: 'center', display: 'flex', justifyContent: 'center' }}
      >
        <Typography variant="body2" color="text.secondary" sx={{ pr: 1 }}>
          {t('item.piercing')}
        </Typography>
        <Typography variant="body2" color="secondary">
          {item.piercing ?? '-'}
        </Typography>
      </Grid>
      <Grid
        size="auto"
        sx={{ textAlign: 'center', display: 'flex', justifyContent: 'center' }}
      >
        <Typography variant="body2" color="text.secondary" sx={{ pr: 1 }}>
          {t('item.bleed')}
        </Typography>
        <Typography variant="body2" color="secondary">
          {item.bleed ?? '-'}
        </Typography>
      </Grid>
      <Grid
        size="auto"
        sx={{ textAlign: 'center', display: 'flex', justifyContent: 'center' }}
      >
        <Typography variant="body2" color="text.secondary" sx={{ pr: 1 }}>
          {t('item.shock')}
        </Typography>
        <Typography variant="body2" color="secondary">
          {item.shock ?? '-'}
        </Typography>
      </Grid>

      <Grid
        size="auto"
        sx={{ textAlign: 'center', display: 'flex', justifyContent: 'center' }}
      >
        <Typography variant="body2" color="text.secondary" sx={{ pr: 1 }}>
          {t('item.poison')}
        </Typography>
        <Typography variant="body2" color="secondary">
          {item.poison ?? '-'}
        </Typography>
      </Grid>
    </Grid>
  );
}

export default ItemAmmunitionInfo;

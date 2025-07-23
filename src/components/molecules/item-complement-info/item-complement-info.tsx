import { Grid, Typography } from '@mui/material';
import { t } from 'i18next';
import { ItemComplementInfoProps } from './item-complement-info.interface';

function ItemComplementInfo({ item }: ItemComplementInfoProps) {
  return (
    <Grid container rowSpacing={1} columnSpacing={2}>
      <Grid
        size="auto"
        sx={{ textAlign: 'center', display: 'flex', justifyContent: 'center' }}
      >
        <Typography variant="body2" color="text.secondary" sx={{ pr: 1 }}>
          {t('item.stat')}
        </Typography>
        <Typography variant="body2" color="secondary">
          {item.stat ?? '-'}
        </Typography>
      </Grid>
      <Grid
        size="auto"
        sx={{ textAlign: 'center', display: 'flex', justifyContent: 'center' }}
      >
        <Typography variant="body2" color="text.secondary" sx={{ pr: 1 }}>
          {t('item.bonus')}
        </Typography>
        <Typography variant="body2" color="secondary">
          {item.bonus ?? '-'}
        </Typography>
      </Grid>
      <Grid
        size="auto"
        sx={{ textAlign: 'center', display: 'flex', justifyContent: 'center' }}
      >
        <Typography variant="body2" color="text.secondary" sx={{ pr: 1 }}>
          {t('item.activable')}
        </Typography>
        <Typography variant="body2" color="secondary">
          {item.activable ? t('core.yes') : t('core.no')}
        </Typography>
      </Grid>
      <Grid
        size="auto"
        sx={{ textAlign: 'center', display: 'flex', justifyContent: 'center' }}
      >
        <Typography variant="body2" color="text.secondary" sx={{ pr: 1 }}>
          {t('item.numberOfUses')}
        </Typography>
        <Typography variant="body2" color="secondary">
          {item.numberOfUses || 0}
        </Typography>
      </Grid>
      <Grid size={12} sx={{ textAlign: 'left' }}>
        <Typography variant="body2" color="text.secondary" sx={{ pr: 1 }}>
          {t('item.extraEffects')}:
        </Typography>
        <Typography variant="body2" color="secondary">
          {item.extraEffects ?? '-'}
        </Typography>
      </Grid>
    </Grid>
  );
}

export default ItemComplementInfo;

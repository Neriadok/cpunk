import { Grid, Typography } from '@mui/material';
import { t } from 'i18next';
import { ItemFirearmInfoProps } from './item-firearm-info.interface';

function ItemFirearmInfo({ item }: ItemFirearmInfoProps) {
  return (
    <Grid container rowSpacing={1} columnSpacing={2}>
      <Grid
        size="auto"
        sx={{ textAlign: 'center', display: 'flex', justifyContent: 'center' }}
      >
        <Typography variant="body2" color="text.secondary" sx={{ pr: 1 }}>
          {t('item.precision')}
        </Typography>
        <Typography variant="body2" color="secondary">
          {item.precision ?? '-'}
        </Typography>
      </Grid>
      <Grid
        size="auto"
        sx={{ textAlign: 'center', display: 'flex', justifyContent: 'center' }}
      >
        <Typography variant="body2" color="text.secondary" sx={{ pr: 1 }}>
          {t('item.burst')}
        </Typography>
        <Typography variant="body2" color="secondary">
          {item.burst ? `${item.burst}` : '-'}
        </Typography>
      </Grid>
    </Grid>
  );
}

export default ItemFirearmInfo;

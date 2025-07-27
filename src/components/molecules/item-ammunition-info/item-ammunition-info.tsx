import { Grid } from '@mui/material';
import { ItemAmmunitionInfoProps } from './item-ammunition-info.interface';
import ItemProperty from '../item-property/item-property';

function ItemAmmunitionInfo({ item, onChange }: ItemAmmunitionInfoProps) {
  return (
    <Grid container rowSpacing={1} columnSpacing={2}>
      <Grid size={onChange ? 12 : 'auto'}>
        <ItemProperty item={item} property="capacity" onChange={onChange} />
      </Grid>
      <Grid size={onChange ? 6 : 'auto'}>
        <ItemProperty item={item} property="cyberware" onChange={onChange} />
      </Grid>
      <Grid size={onChange ? 6 : 'auto'}>
        <ItemProperty item={item} property="burst" onChange={onChange} />
      </Grid>
      <Grid size={onChange ? 12 : 'auto'}>
        <ItemProperty item={item} property="piercing" onChange={onChange} />
      </Grid>
      <Grid size={onChange ? 12 : 'auto'}>
        <ItemProperty item={item} property="bleed" onChange={onChange} />
      </Grid>
      <Grid size={onChange ? 12 : 'auto'}>
        <ItemProperty item={item} property="shock" onChange={onChange} />
      </Grid>
      <Grid size={onChange ? 12 : 'auto'}>
        <ItemProperty item={item} property="poison" onChange={onChange} />
      </Grid>
    </Grid>
  );
}

export default ItemAmmunitionInfo;

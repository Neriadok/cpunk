import { Grid } from '@mui/material';
import { ItemFirearmInfoProps } from './item-firearm-info.interface';
import ItemProperty from '../item-property/item-property';

function ItemFirearmInfo({ item, onChange }: ItemFirearmInfoProps) {
  return (
    <Grid container rowSpacing={1} columnSpacing={2}>
      <Grid size={onChange ? 12 : 'auto'}>
        <ItemProperty item={item} property="precision" onChange={onChange} />
      </Grid>
      <Grid size={onChange ? 12 : 'auto'}>
        <ItemProperty item={item} property="burst" onChange={onChange} />
      </Grid>
    </Grid>
  );
}

export default ItemFirearmInfo;

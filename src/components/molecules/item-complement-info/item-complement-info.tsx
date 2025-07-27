import { Grid } from '@mui/material';
import { ItemComplementInfoProps } from './item-complement-info.interface';
import ItemProperty from '../item-property/item-property';

function ItemComplementInfo({ item, onChange }: ItemComplementInfoProps) {
  return (
    <Grid container rowSpacing={1} columnSpacing={2}>
      <Grid size={12}>
        <ItemProperty item={item} property="name" onChange={onChange} />
      </Grid>
      <Grid size={onChange ? 6 : 'auto'}>
        <ItemProperty item={item} property="stats" onChange={onChange} />
      </Grid>
      <Grid size={onChange ? 6 : 'auto'}>
        <ItemProperty item={item} property="activable" onChange={onChange} />
      </Grid>
      <Grid size={onChange ? 12 : 'auto'}>
        <ItemProperty item={item} property="bonus" onChange={onChange} />
      </Grid>
      <Grid size={onChange ? 12 : 'auto'}>
        <ItemProperty item={item} property="numberOfUses" onChange={onChange} />
      </Grid>
      <Grid size={12}>
        <ItemProperty item={item} property="extraPrice" onChange={onChange} />
      </Grid>
      <Grid size={12}>
        <ItemProperty item={item} property="extraEffects" onChange={onChange} />
      </Grid>
    </Grid>
  );
}

export default ItemComplementInfo;

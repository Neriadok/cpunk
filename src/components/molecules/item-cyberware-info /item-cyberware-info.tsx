import { Grid } from '@mui/material';
import { ItemCyberwareInfoProps } from './item-cyberware-info.interface';
import ItemProperty from '../item-property/item-property';

function ItemCyberwareInfo({ item, onChange }: ItemCyberwareInfoProps) {
  return (
    <Grid container rowSpacing={1} columnSpacing={2}>
      <Grid size={12}>
        <ItemProperty item={item} property="name" onChange={onChange} />
      </Grid>
      <Grid size={onChange ? 6 : 'auto'}>
        <ItemProperty item={item} property="part" onChange={onChange} />
      </Grid>
      <Grid size={onChange ? 6 : 'auto'}>
        <ItemProperty item={item} property="ice" onChange={onChange} />
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
        <ItemProperty item={item} property="cooldown" onChange={onChange} />
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

export default ItemCyberwareInfo;

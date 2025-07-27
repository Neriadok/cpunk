import { Grid } from '@mui/material';
import { ItemMeleeWeaponInfoProps } from './item-melee-weapon-info.interface';
import ItemProperty from '../item-property/item-property';

function ItemMeleeWeaponInfo({ item, onChange }: ItemMeleeWeaponInfoProps) {
  return (
    <Grid container rowSpacing={1} columnSpacing={2}>
      <Grid size={onChange ? 6 : 'auto'}>
        <ItemProperty item={item} property="cyberware" onChange={onChange} />
      </Grid>
      <Grid size={onChange ? 6 : 'auto'}>
        <ItemProperty item={item} property="randomDamage" onChange={onChange} />
      </Grid>
      <Grid size={onChange ? 12 : 'auto'}>
        <ItemProperty item={item} property="damage" onChange={onChange} />
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

export default ItemMeleeWeaponInfo;

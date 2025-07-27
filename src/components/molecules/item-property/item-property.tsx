import { Box, Typography } from '@mui/material';
import { t } from 'i18next';
import { ItemPropertyProps } from './item-property.interface';
import ItemPropertyInput from '../item-property-input/item-property-input';
import { CyberwarePart } from '../../../interfaces/game.interface';

function ItemProperty({ item, property, onChange }: ItemPropertyProps) {
  return (
    <Box
      sx={{
        textAlign: 'left',
        display: onChange ? 'bolck' : 'flex',
        justifyContent: 'flex-start',
        alignItems: 'center',
      }}
    >
      <Typography variant="body2" color="text.secondary" sx={{ pr: 1 }}>
        {t(`item.${property}`)}
      </Typography>
      {onChange ? (
        <ItemPropertyInput
          item={item}
          property={property}
          onChange={onChange}
        />
      ) : (
        <Typography variant="body2" color="secondary">
          {getValue()}
        </Typography>
      )}
    </Box>
  );

  function getValue() {
    const value = (item as any)[property];
    return property === 'activable'
      ? getBooleanValue(value)
      : property === 'cyberware' || property === 'part'
        ? getBodyPart(value)
        : property === 'stats'
          ? getStats(value)
          : (value ?? '-');
  }

  function getBooleanValue(value: boolean) {
    return t(value ? 'core.yes' : 'core.no');
  }
  function getBodyPart(value: CyberwarePart | null) {
    return value ? t(`bodyparts.${value}`) : t('core.no');
  }
  function getStats(value: string[]) {
    return value.join(', ');
  }
}

export default ItemProperty;

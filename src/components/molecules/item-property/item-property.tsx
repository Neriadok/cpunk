import { Box, Typography } from '@mui/material';
import { t } from 'i18next';
import { ItemPropertyProps } from './item-property.interface';
import ItemPropertyInput from '../item-property-input/item-property-input';

function ItemProperty({ item, property, onChange }: ItemPropertyProps) {
  return (
    <Box
      sx={{
        textAlign: 'left',
        display: onChange ? 'bolck' : 'flex',
        justifyContent: 'center',
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
      ? t(value ? 'core.yes' : 'core.no')
      : (value ?? '-');
  }
}

export default ItemProperty;

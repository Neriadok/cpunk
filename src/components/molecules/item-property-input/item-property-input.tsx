import { dices } from '../../../interfaces/game.interface';
import {
  ItemPropertyInputProps,
  ItemPropertyInputTypes,
} from './item-property-input.interface';
import {
  debounce,
  Input,
  MenuItem,
  Select,
  Slider,
  Stack,
  Typography,
} from '@mui/material';
import { anyStats } from '../../../interfaces/stats.interface';
import { t } from 'i18next';

function ItemPropertyInput({
  item,
  property,
  onChange,
}: ItemPropertyInputProps) {
  const debouncedChange = debounce((e) => selectItem(e), 600);
  const value = (item as any)[property];
  const type = getPropertyType();

  return type === 'dice' ? (
    getInputDice()
  ) : type === 'lowValue' ? (
    getInputRange(3)
  ) : type === 'midValue' ? (
    getInputRange(5)
  ) : type === 'highValue' ? (
    <Input
      type="number"
      sx={{ width: '100%' }}
      slotProps={{ input: { max: 100, min: 0, step: 1 } }}
      defaultValue={value}
      onChange={(e) => setValue(e)}
    />
  ) : type === 'number' ? (
    <Input
      type="number"
      sx={{ width: '100%' }}
      defaultValue={value}
      onChange={(e) => setValue(e)}
    />
  ) : type === 'stat' ? (
    getInputStat()
  ) : (
    <Input
      sx={{ width: '100%' }}
      type={type}
      defaultValue={value}
      onChange={debouncedChange}
    />
  );

  function getInputStat() {
    return (
      <Select
        sx={{ width: '100%' }}
        defaultValue={value}
        onChange={(e) => selectItem(e)}
      >
        {anyStats.map((stat) => (
          <MenuItem value={stat}>{stat}</MenuItem>
        ))}
      </Select>
    );
  }

  function getInputDice() {
    return (
      <Select
        sx={{ width: '100%' }}
        defaultValue={value}
        onChange={(e) => selectItem(e)}
      >
        <MenuItem value={null as any}>{t('core.no')}</MenuItem>
        {dices.map((dice) => (
          <MenuItem value={dice}>{dice}</MenuItem>
        ))}
      </Select>
    );
  }

  function getInputRange(max: number) {
    return (
      <Stack
        spacing={3}
        direction="row"
        sx={{ width: '100%', display: 'flex', alignItems: 'center' }}
      >
        <Slider
          sx={{ flex: 1 }}
          defaultValue={value}
          onChange={(e) => selectItem(e)}
          max={max}
          marks
        />
        <Typography variant="body2" color="secondary">
          {value}
        </Typography>
      </Stack>
    );
  }

  function setValue(e: any) {
    onChange({ ...item, [property]: Number(e?.target?.value) });
  }

  function selectItem(e: any) {
    onChange({ ...item, [property]: e?.target?.value });
  }

  function getPropertyType(): ItemPropertyInputTypes {
    const propertyTypes = {
      precision: 'highValue',
      burst: 'dice',
      damage: 'midValue',
      piercing: 'lowValue',
      randomDamage: 'dice',
      bleed: 'lowValue',
      shock: 'lowValue',
      poison: 'lowValue',
      stat: 'stat',
      bonus: 'midValue',
      activable: 'boolean',
      extraPrice: 'number',
      extraEffects: 'text',
      numberOfUses: 'number',
      capacity: 'number',
    };
    return propertyTypes[property as keyof typeof propertyTypes] || 'text';
  }
}

export default ItemPropertyInput;

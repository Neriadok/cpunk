import {
  bodyParts,
  cyberwareParts,
  dices,
  difficulties,
} from '../../../interfaces/game.interface';
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
  Switch,
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
  ) : type === 'bodypart' ? (
    getInputBodyPart()
  ) : type === 'cyberware' ? (
    getInputCyberware()
  ) : type === 'ice' ? (
    getInputIce()
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
  ) : type === 'boolean' ? (
    getInputBoolean()
  ) : type === 'stats' ? (
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
        multiple
        onChange={(e) => selectItem(e)}
      >
        {anyStats.map((stat) => (
          <MenuItem value={stat}>{stat}</MenuItem>
        ))}
      </Select>
    );
  }

  function getInputCyberware() {
    return (
      <Select
        sx={{ width: '100%' }}
        defaultValue={value}
        onChange={(e) => selectItem(e)}
      >
        {cyberwareParts.map((part) => (
          <MenuItem value={part}>{t('bodyparts.' + part)}</MenuItem>
        ))}
      </Select>
    );
  }

  function getInputBodyPart() {
    return (
      <Select
        sx={{ width: '100%' }}
        defaultValue={value}
        onChange={(e) => selectItem(e)}
      >
        <MenuItem value={null as any}>{t('core.no')}</MenuItem>
        {bodyParts.map((part) => (
          <MenuItem value={part}>{t('bodyparts.' + part)}</MenuItem>
        ))}
      </Select>
    );
  }

  function getInputIce() {
    return (
      <Select
        sx={{ width: '100%' }}
        defaultValue={value}
        onChange={(e) => selectItem(e)}
      >
        {difficulties.map((stat) => (
          <MenuItem value={stat}>{stat}</MenuItem>
        ))}
      </Select>
    );
  }

  function getInputBoolean() {
    return <Switch checked={value} onChangeCapture={() => switchValue()} />;
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
        <Typography variant="body1" color="primary">
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

  function switchValue() {
    onChange({ ...item, [property]: !value as any });
  }

  function getPropertyType(): ItemPropertyInputTypes {
    const propertyTypes = {
      precision: 'midValue',
      burst: 'dice',
      ice: 'ice',
      range: 'highValue',
      damage: 'midValue',
      piercing: 'lowValue',
      randomDamage: 'dice',
      cooldown: 'lowValue',
      bleed: 'lowValue',
      shock: 'lowValue',
      poison: 'lowValue',
      stats: 'stats',
      cyberware: 'bodypart',
      part: 'cyberware',
      bonus: 'midValue',
      activable: 'boolean',
      extraPrice: 'number',
      extraEffects: 'text',
      numberOfUses: 'highValue',
      capacity: 'highValue',
    };
    return propertyTypes[property as keyof typeof propertyTypes] || 'text';
  }
}

export default ItemPropertyInput;

import { Avatar, Card, Stack, Typography } from '@mui/material';
import { ItemInfoProps } from './item-info.interface';
import {
  faBitcoinSign,
  faBoxOpen,
  faBullseye,
  faGavel,
  faGun,
  faMicrochip,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import ItemFirearmInfo from '../../molecules/item-firearm-info/item-firearm-info';
import {
  Ammunition,
  Complement,
  Cyberware,
  Firearms,
  Item,
  MeleeWeapon,
} from '../../../interfaces/item.interface';
import ItemMeleeWeaponInfo from '../../molecules/item-melee-weapon-info/item-melee-weapon-info';
import ItemComplementInfo from '../../molecules/item-complement-info/item-complement-info';
import ItemAmmunitionInfo from '../../molecules/item-ammunition-info/item-ammunition-info';
import { useState } from 'react';
import { calculateItemPrice } from '../../../lib/item.price';
import ItemCyberwareInfo from '../../molecules/item-cyberware-info /item-cyberware-info';

function ItemInfo({ item, editable, onChange }: ItemInfoProps) {
  const [itemValue, setItemValue] = useState<Item>(item);
  return (
    <Stack>
      <Stack
        direction={'row'}
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
        spacing={1}
      >
        <Avatar sx={{ width: 40, height: 40, bgcolor: getShopColor() }}>
          <FontAwesomeIcon size="lg" icon={getShopIcon()} />
        </Avatar>
        <Typography
          gutterBottom
          variant="subtitle1"
          component="div"
          color="primary"
          sx={{
            textAlign: 'right',
            display: 'flex',
            alignItems: 'center',
            fontWeight: 'bold',
          }}
        >
          {itemValue.price}{' '}
          <FontAwesomeIcon
            style={{ display: 'inline-block', marginLeft: '5px' }}
            icon={faBitcoinSign}
          />
        </Typography>
      </Stack>
      <Typography
        gutterBottom
        variant="h6"
        component="div"
        color="primary"
        sx={{
          textAlign: 'left',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          whiteSpace: 'nowrap',
          width: '100%',
        }}
      >
        {itemValue.name}
      </Typography>
      <Card sx={{ flex: 1, display: 'block', p: 2 }}>
        {itemValue.shop === 'firearms' && (
          <ItemFirearmInfo
            item={itemValue as Firearms}
            onChange={editable ? (i) => changeInputValue(i) : undefined}
          />
        )}
        {itemValue.shop === 'melee-weapons' && (
          <ItemMeleeWeaponInfo
            item={itemValue as MeleeWeapon}
            onChange={editable ? (i) => changeInputValue(i) : undefined}
          />
        )}
        {itemValue.shop === 'complements' && (
          <ItemComplementInfo
            item={itemValue as Complement}
            onChange={editable ? (i) => changeInputValue(i) : undefined}
          />
        )}
        {itemValue.shop === 'ammunition' && (
          <ItemAmmunitionInfo
            item={itemValue as Ammunition}
            onChange={editable ? (i) => changeInputValue(i) : undefined}
          />
        )}
        {itemValue.shop === 'cyberware' && (
          <ItemCyberwareInfo
            item={itemValue as Cyberware}
            onChange={editable ? (i) => changeInputValue(i) : undefined}
          />
        )}
      </Card>
    </Stack>
  );

  function getShopIcon() {
    return {
      firearms: faGun,
      'melee-weapons': faGavel,
      complements: faBoxOpen,
      ammunition: faBullseye,
      cyberware: faMicrochip,
    }[item.shop];
  }

  function getShopColor() {
    return {
      firearms: 'error.main',
      'melee-weapons': 'secondary.main',
      complements: 'primary.main',
      ammunition: 'warning.main',
      cyberware: 'success.main',
    }[item.shop];
  }

  function changeInputValue(nextValue: Item) {
    const price = calculateItemPrice(nextValue);
    setItemValue({ ...nextValue, price });
    if (onChange) {
      onChange(nextValue);
    }
  }
}

export default ItemInfo;

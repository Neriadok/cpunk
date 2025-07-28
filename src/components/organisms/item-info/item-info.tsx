import { Card, Fab, IconButton, Stack, Typography } from '@mui/material';
import { ItemInfoProps } from './item-info.interface';
import {
  faBitcoinSign,
  faBoxOpen,
  faCrosshairs,
  faGavel,
  faGun,
  faMicrochip,
  faRotate,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import ItemFirearmInfo from '../../molecules/item-firearm-info/item-firearm-info';
import {
  Complement,
  Cyberware,
  Firearms,
  Item,
  MeleeWeapon,
} from '../../../interfaces/item.interface';
import ItemMeleeWeaponInfo from '../../molecules/item-melee-weapon-info/item-melee-weapon-info';
import ItemComplementInfo from '../../molecules/item-complement-info/item-complement-info';
import { useState } from 'react';
import { calculateItemPrice } from '../../../lib/item.price';
import ItemCyberwareInfo from '../../molecules/item-cyberware-info /item-cyberware-info';
import {
  getRandomComplement,
  getRandomCyberware,
  getRandomFirearm,
  getRandomMeleeWeapon,
} from '../../../lib/item.generator';

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
        <Stack direction={'row'} spacing={1}>
          <Fab
            color={getShopColor()}
            sx={{ width: 40, height: 40 }}
            onClick={() => changeShop()}
          >
            <FontAwesomeIcon size="2xl" icon={getShopIcon()} />
          </Fab>
          {editable && (
            <IconButton
              color="inherit"
              sx={{ width: 40, height: 40, opacity: 0.4 }}
              onClick={() => changeShop()}
            >
              <FontAwesomeIcon icon={faRotate} />
            </IconButton>
          )}
        </Stack>
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
        {itemValue.shop === 'cyberware' && (
          <ItemCyberwareInfo
            item={itemValue as Cyberware}
            onChange={editable ? (i) => changeInputValue(i) : undefined}
          />
        )}
      </Card>
    </Stack>
  );

  function changeShop() {
    if (!editable) return;
    const nextInputValue = {
      firearms: getRandomMeleeWeapon,
      'melee-weapons': getRandomComplement,
      complements: getRandomCyberware,
      cyberware: getRandomFirearm,
    }[itemValue.shop];

    changeInputValue(nextInputValue(true));
  }

  function getShopIcon() {
    return {
      firearms: faGun,
      'melee-weapons': faGavel,
      complements: faBoxOpen,
      ammunition: faCrosshairs,
      cyberware: faMicrochip,
    }[itemValue.shop];
  }

  function getShopColor():
    | 'error'
    | 'warning'
    | 'primary'
    | 'success'
    | 'secondary' {
    return {
      firearms: 'error',
      'melee-weapons': 'warning',
      complements: 'secondary',
      cyberware: 'success',
    }[itemValue.shop] as any;
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

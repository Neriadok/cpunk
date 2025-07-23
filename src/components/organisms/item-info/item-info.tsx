import { Avatar, Card, Stack, Typography } from '@mui/material';
import { ItemInfoProps } from './item-info.interface';
import {
  faBitcoinSign,
  faBoxOpen,
  faBullseye,
  faGavel,
  faGun,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import ItemFirearmInfo from '../../molecules/item-firearm-info/item-firearm-info';
import {
  Ammunition,
  Complement,
  Firearms,
  MeleeWeapon,
} from '../../../interfaces/item.interface';
import ItemMeleeWeaponInfo from '../../molecules/item-melee-weapon-info/item-melee-weapon-info';
import ItemComplementInfo from '../../molecules/item-complement-info/item-complement-info';
import ItemAmmunitionInfo from '../../molecules/item-ammunition-info/item-melee-weapon-info';

function ItemInfo({ item }: ItemInfoProps) {
  return (
    <Stack>
      <Stack direction={'row'} sx={{ display: 'flex' }}>
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
          {item.name}
        </Typography>
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
          {item.price}{' '}
          <FontAwesomeIcon
            style={{ display: 'inline-block', marginLeft: '5px' }}
            icon={faBitcoinSign}
          />
        </Typography>
      </Stack>
      <Stack
        direction="row"
        sx={{ display: 'flex', alignItems: 'top' }}
        spacing={2}
      >
        <Avatar sx={{ width: 40, height: 40, bgcolor: getShopColor() }}>
          <FontAwesomeIcon size="lg" icon={getShopIcon()} />
        </Avatar>
        <Card sx={{ flex: 1, display: 'block', p: 2 }}>
          {item.shop === 'firearms' && (
            <ItemFirearmInfo item={item as Firearms} />
          )}
          {item.shop === 'melee-weapons' && (
            <ItemMeleeWeaponInfo item={item as MeleeWeapon} />
          )}
          {item.shop === 'complements' && (
            <ItemComplementInfo item={item as Complement} />
          )}
          {item.shop === 'ammunition' && (
            <ItemAmmunitionInfo item={item as Ammunition} />
          )}
        </Card>
      </Stack>
    </Stack>
  );

  function getShopIcon() {
    return {
      firearms: faGun,
      'melee-weapons': faGavel,
      complements: faBoxOpen,
      ammunition: faBullseye,
    }[item.shop];
  }

  function getShopColor() {
    return {
      firearms: 'error.main',
      'melee-weapons': 'secondary.main',
      complements: 'primary.main',
      ammunition: 'warning.main',
    }[item.shop];
  }
}

export default ItemInfo;

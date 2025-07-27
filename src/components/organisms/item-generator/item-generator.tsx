import { Button, Stack } from '@mui/material';
import ItemInfo from '../item-info/item-info';
import { useState } from 'react';
import { getRandomItem } from '../../../lib/item.generator';
import { Item } from '../../../interfaces/item.interface';
import { ItemGeneratorProps } from './item-generator.interface';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faReply } from '@fortawesome/free-solid-svg-icons';
import { t } from 'i18next';

function ItemGenerator({ onSave, onAbort }: ItemGeneratorProps) {
  const [item, setItem] = useState<Item>(getRandomItem(true));
  return (
    <Stack spacing={2}>
      <ItemInfo editable={true} item={item} onChange={(i) => setItem(i)} />
      <Stack
        direction={'row'}
        spacing={1}
        sx={{ display: 'flex', justifyContent: 'right' }}
      >
        <Button
          sx={{ opacity: 0.4 }}
          endIcon={<FontAwesomeIcon icon={faReply} />}
          variant="outlined"
          color="inherit"
          onClick={() => onAbort()}
        >
          {t('core.cancel')}
        </Button>
        <Button
          endIcon={<FontAwesomeIcon icon={faPlus} />}
          variant="outlined"
          color="primary"
          onClick={() => onSave(item)}
        >
          {t('core.add')}
        </Button>
      </Stack>
    </Stack>
  );
}

export default ItemGenerator;

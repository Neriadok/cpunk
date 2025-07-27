import { Button, Card, IconButton, Stack } from '@mui/material';
import ItemInfo from '../item-info/item-info';
import { Item } from '../../../interfaces/item.interface';
import { CharacterInventoryProps } from './character-inventory.interface';
import ItemGenerator from '../item-generator/item-generator';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faTrash } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';

function CharacterInventory({ character, onChange }: CharacterInventoryProps) {
  const [showGenerator, setShowGenerator] = useState<boolean>(false);
  return (
    <Stack spacing={1}>
      {showGenerator ? (
        <Card elevation={3} sx={{ p: 2 }}>
          <ItemGenerator
            onSave={(i) => addItem(i)}
            onAbort={() => setShowGenerator(false)}
          ></ItemGenerator>
        </Card>
      ) : (
        <Stack spacing={2}>
          {character?.inventory?.map((item) => toItemRow(item))}
          <Button
            onClick={() => setShowGenerator(true)}
            variant="outlined"
            color="primary"
            endIcon={<FontAwesomeIcon icon={faPlus} />}
          ></Button>
        </Stack>
      )}
    </Stack>
  );

  function addItem(item: Item) {
    console.log(item);
    const inventory = [...(character?.inventory || []), item];
    onChange({ ...character, inventory });
    setShowGenerator(false);
  }

  function removeItem(item: Item) {
    const inventory = (character?.inventory || []).filter(
      (i) => i.uid !== item.uid
    );
    onChange({ ...character, inventory });
  }

  function toItemRow(item: Item) {
    return (
      <Card elevation={3} key={item.uid} sx={{ p: 2, border: '1px solid' }}>
        <ItemInfo key={item.name} item={item} />

        <Stack
          direction={'row'}
          spacing={1}
          sx={{ p: 1, display: 'flex', justifyContent: 'right' }}
        >
          <IconButton sx={{ opacity: 0.4 }} onClick={() => removeItem(item)}>
            <FontAwesomeIcon icon={faTrash} />
          </IconButton>
        </Stack>
      </Card>
    );
  }
}

export default CharacterInventory;

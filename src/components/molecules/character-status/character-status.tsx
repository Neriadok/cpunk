import { Box, Button, Stack, Tab, Tabs } from '@mui/material';
import { t } from 'i18next';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState } from 'react';
import { saveCharacter } from '../../../lib/db';
import {
  faBook,
  faSave,
  faSuitcase,
  faUniversalAccess,
} from '@fortawesome/free-solid-svg-icons';
import { CharacterStatusProps } from './character-status.interface';
import CharacterState from '../character-state/character-state';
import CharacterHealth from '../character-health/character-health';
import { Character } from '../../../interfaces/character.interface';
import CharacterDiary from '../character-diary/character-diary';
import CharacterInventory from '../../organisms/character-inventory/character-inventory';

function CharacterStatus({ character }: CharacterStatusProps) {
  const [characterStatus, setCharacterStatus] = useState<Character>(character);
  const [changes, setChanges] = useState<boolean>(false);
  const [tab, setTab] = useState<'diary' | 'health' | 'inventory'>('diary');

  return (
    <Stack spacing={2}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs
          value={tab}
          onChange={(_, t) => setTab(t as any)}
          aria-label="basic tabs example"
          variant="fullWidth"
        >
          <Tab
            icon={<FontAwesomeIcon size="xl" icon={faBook} />}
            value="diary"
          />
          <Tab
            icon={<FontAwesomeIcon size="xl" icon={faUniversalAccess} />}
            value="health"
          />
          <Tab
            icon={<FontAwesomeIcon size="xl" icon={faSuitcase} />}
            value="inventory"
          />
        </Tabs>
      </Box>
      {tab === 'diary' && (
        <CharacterDiary
          character={characterStatus}
          onChange={(c) => setNewStatus(c)}
        />
      )}
      {tab === 'health' && (
        <>
          <CharacterHealth
            character={characterStatus}
            onChange={(c) => setNewStatus(c)}
          />
          <CharacterState
            character={characterStatus}
            onChange={(c) => setNewStatus(c)}
          />
        </>
      )}
      {tab === 'inventory' && (
        <CharacterInventory
          character={characterStatus}
          onChange={(c) => setNewStatus(c)}
        />
      )}
      <Box sx={{ textAlign: 'right' }}>
        <Button
          endIcon={<FontAwesomeIcon icon={faSave} />}
          variant="outlined"
          color="primary"
          disabled={!changes}
          onClick={() => saveChanges()}
        >
          {t('core.save')}
        </Button>
      </Box>
    </Stack>
  );

  async function setNewStatus(newStatus: Partial<Character>) {
    console.log(newStatus);
    setCharacterStatus({ ...characterStatus, ...newStatus });
    setChanges(true);
  }

  async function saveChanges() {
    await saveCharacter(characterStatus);
    setChanges(false);
  }
}

export default CharacterStatus;

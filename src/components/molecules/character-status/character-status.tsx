import { Box, Button, Stack } from '@mui/material';
import { t } from 'i18next';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState } from 'react';
import { saveCharacter } from '../../../lib/db';
import { faSave } from '@fortawesome/free-solid-svg-icons';
import { CharacterStatusProps } from './character-status.interface';
import CharacterState from '../character-state/character-state';
import CharacterHealth from '../character-health/character-health';
import { Character } from '../../../interfaces/character.interface';
import CharacterDiary from '../character-diary/character-diary';

function CharacterStatus({ character }: CharacterStatusProps) {
  const [characterStatus, setCharacterStatus] = useState<Character>(character);
  const [changes, setChanges] = useState<boolean>(false);

  return (
    <Stack spacing={2}>
      <CharacterDiary
        character={characterStatus}
        onChange={(c) => setNewStatus(c)}
      />

      <CharacterHealth
        character={characterStatus}
        onChange={(c) => setNewStatus(c)}
      />
      <CharacterState character={character} onChange={(c) => setNewStatus(c)} />
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
    setCharacterStatus({ ...characterStatus, ...newStatus });
    setChanges(true);
  }

  async function saveChanges() {
    await saveCharacter(characterStatus);
    setChanges(false);
  }
}

export default CharacterStatus;

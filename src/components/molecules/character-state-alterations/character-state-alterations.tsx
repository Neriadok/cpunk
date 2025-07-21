import { Box, IconButton, Slider, Stack } from '@mui/material';
import { CharacterStateAlterationsProps } from './character-state-alterations.interface';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState } from 'react';
import {
  faBoltLightning,
  faDroplet,
  faSkullCrossbones,
} from '@fortawesome/free-solid-svg-icons';
import { State } from '../../../interfaces/game.interface';

function CharacterStateAlterations({
  character,
  onChange,
}: CharacterStateAlterationsProps) {
  const [shock, setShock] = useState<number>(character?.shock || 0);
  const [poison, setPoison] = useState<number>(character?.poison || 0);
  const [bleed, setBleed] = useState<number>(character?.bleed || 0);

  return (
    <Stack>
      <Stack
        spacing={1}
        direction="row"
        sx={{ display: 'flex', alignItems: 'center' }}
      >
        <IconButton color={isKO() ? 'warning' : 'primary'}>
          <FontAwesomeIcon icon={faBoltLightning} />
        </IconButton>
        <Box sx={{ flex: 1, pr: 1 }}>
          <Slider
            valueLabelDisplay="auto"
            color="primary"
            defaultValue={shock}
            step={1}
            marks
            min={0}
            max={character.stats.TCO}
            onChange={(_: any, value: number) => updateValue('shock', value)}
          />
        </Box>
      </Stack>
      <Stack
        spacing={1}
        direction="row"
        sx={{ display: 'flex', alignItems: 'center' }}
      >
        <IconButton color={isKO() ? 'warning' : 'primary'}>
          <FontAwesomeIcon icon={faSkullCrossbones} />
        </IconButton>
        <Box sx={{ flex: 1, pr: 1 }}>
          <Slider
            valueLabelDisplay="auto"
            color="primary"
            defaultValue={poison}
            step={1}
            marks
            min={0}
            max={character.stats.TCO}
            onChange={(_: any, value: number) => updateValue('poison', value)}
          />
        </Box>
      </Stack>
      <Stack
        spacing={1}
        direction="row"
        sx={{ display: 'flex', alignItems: 'center' }}
      >
        <IconButton color={isKO() ? 'warning' : 'primary'}>
          <FontAwesomeIcon icon={faDroplet} />
        </IconButton>
        <Box sx={{ flex: 1, pr: 1 }}>
          <Slider
            valueLabelDisplay="auto"
            color="primary"
            defaultValue={bleed}
            step={1}
            marks
            min={0}
            max={character.stats.TCO}
            onChange={(_: any, value: number) => updateValue('bleed', value)}
          />
        </Box>
      </Stack>
    </Stack>
  );

  function updateValue(state: State, value: number = 0) {
    const update = {
      poison: setPoison,
      shock: setShock,
      bleed: setBleed,
    };
    update[state](value);
    onChange({ ...character, [state]: value });
  }

  function isKO() {
    return shock + bleed + poison >= character.stats.TCO;
  }
}

export default CharacterStateAlterations;

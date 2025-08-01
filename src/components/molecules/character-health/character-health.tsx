import { Box, Grid, IconButton, Stack, Typography } from '@mui/material';
import { t } from 'i18next';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState } from 'react';
import { faRedo } from '@fortawesome/free-solid-svg-icons';
import { bodyStateImage } from '../../../interfaces/images.interfaces';
import { getDefaultBodystate } from '../../../lib/character-generator';
import { CharacterHealthProps } from './character-health.interface';
import { BodyParts } from '../../../interfaces/character.interface';
import CharacterHealthPart from '../character-health-part/character-health-part';

function CharacterHealth({ character, onChange }: CharacterHealthProps) {
  const [health, setHealth] = useState<BodyParts | undefined>(
    character?.health
  );
  const [armor, setArmor] = useState<BodyParts | undefined>(character?.armor);
  const chatacterStatus = { ...character, health, armor };

  return (
    <Box>
      <Stack sx={{ width: '100%' }} direction="row">
        <Typography
          flex="1"
          variant="h6"
          component="div"
          color="text.secondary"
        >
          {t('sheet.bodystate')}
        </Typography>
        <Box sx={{ position: 'relative', top: 3, textAlign: 'center' }}>
          <IconButton onClick={() => resetBodyState()}>
            <FontAwesomeIcon icon={faRedo}></FontAwesomeIcon>
          </IconButton>
        </Box>
      </Stack>
      <Grid
        container
        sx={{
          backgroundImage: `url(${bodyStateImage})`,
          backgroundPosition: 'center',
          backgroundSize: 'cover',
          textAlign: 'center',
        }}
        spacing={1}
      >
        <Grid size={12}>
          <CharacterHealthPart
            part="head"
            character={chatacterStatus}
            setArmor={(part, add) => changeArmor(part, add)}
            setHealth={(part, add) => changeHealth(part, add)}
          />
        </Grid>
        <Grid size={4}>
          <CharacterHealthPart
            part="armL"
            character={chatacterStatus}
            setArmor={(part, add) => changeArmor(part, add)}
            setHealth={(part, add) => changeHealth(part, add)}
          />
        </Grid>
        <Grid size={4}>
          <CharacterHealthPart
            part="trunk"
            character={chatacterStatus}
            setArmor={(part, add) => changeArmor(part, add)}
            setHealth={(part, add) => changeHealth(part, add)}
          />
        </Grid>
        <Grid size={4}>
          <CharacterHealthPart
            part="armR"
            character={chatacterStatus}
            setArmor={(part, add) => changeArmor(part, add)}
            setHealth={(part, add) => changeHealth(part, add)}
          />
        </Grid>
        <Grid size={6}>
          <CharacterHealthPart
            part="legL"
            character={chatacterStatus}
            setArmor={(part, add) => changeArmor(part, add)}
            setHealth={(part, add) => changeHealth(part, add)}
          />
        </Grid>
        <Grid size={6}>
          <CharacterHealthPart
            part="legR"
            character={chatacterStatus}
            setArmor={(part, add) => changeArmor(part, add)}
            setHealth={(part, add) => changeHealth(part, add)}
          />
        </Grid>
      </Grid>
    </Box>
  );

  async function changeHealth(part: keyof BodyParts, value: number) {
    setHealth({
      ...health,
      [part]: value,
    } as any);
    onChange({ ...character, health });
  }

  async function changeArmor(part: keyof BodyParts, value: number) {
    setArmor({ ...armor, [part]: value } as any);
    onChange({ ...character, health });
  }

  async function resetBodyState() {
    console.log('reset');
    const next = getDefaultBodystate(character);
    setHealth({ ...next.health });
    setArmor({ ...next.armor });
    onChange({ ...character, ...next });
  }
}

export default CharacterHealth;

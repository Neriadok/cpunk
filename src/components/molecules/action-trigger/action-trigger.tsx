import { faDiceD20 } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  Stack,
  FormControl,
  InputLabel,
  Select,
  Box,
  Fab,
  Typography,
  Card,
  MenuItem,
  TextField,
} from '@mui/material';
import { t } from 'i18next';
import { theme } from '../../../env/theme';
import { getActionSkills } from '../../../lib/skills';
import CharacterStats from '../../organisms/character-stats/character-stats';
import { Skill, SkillFamily } from '../../../interfaces/skills.interface';
import { useState } from 'react';
import { ActionTriggerProps } from './action-trigger.interface';
import { getSkillValue } from '../../../lib/bonifications';

function ActionTrigger({ character }: ActionTriggerProps) {
  const skills: SkillFamily[] = character
    ? getActionSkills().sort(
        (a, b) =>
          getSkillValue(character, b.skill) - getSkillValue(character, a.skill)
      )
    : [];
  const [activeSkill, setActiveSkill] = useState<Skill>(skills[0].skill);
  const [actionPoints, setActionPoints] = useState<number | undefined>(
    undefined
  );
  return (
    <Card sx={{ p: 2 }}>
      <CharacterStats character={character} readonly={true}></CharacterStats>
      <Stack sx={{ mt: 2 }} direction="row" spacing={1}>
        <FormControl fullWidth>
          <InputLabel id="skill-label">{t('sheet.skill')}</InputLabel>
          <Select
            labelId="skill-label"
            value={activeSkill}
            label="skill"
            onChange={(e: any) => changeSkill(e)}
          >
            {skills.sort(alphabetically).map(({ skill }) => (
              <MenuItem
                key={skill}
                sx={{
                  color: character.skills[skill]
                    ? theme.palette.primary.main
                    : 'text.secondary',
                }}
                value={skill}
              >
                {t('character.skill.' + skill)} ({character.skills[skill] || 0})
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl>
          <TextField
            aria-readonly
            label={t('sheet.value')}
            value={getSkillValue(character, activeSkill)}
          />
        </FormControl>
      </Stack>
      <Box sx={{ mt: 2, textAlign: 'center' }}>
        <Fab
          variant="extended"
          onClick={() => rollDice()}
          color={
            actionPoints === 1
              ? 'error'
              : character.skills[activeSkill]
                ? 'primary'
                : 'secondary'
          }
          disabled={!activeSkill}
        >
          <FontAwesomeIcon size="2xl" icon={faDiceD20} />
          {actionPoints ? (
            <Typography variant="h5" sx={{ ml: 2 }}>
              {actionPoints}
            </Typography>
          ) : (
            ''
          )}
        </Fab>
      </Box>
    </Card>
  );

  function rollDice() {
    const dice = Math.floor(Math.random() * 10) + 1;
    setActionPoints(
      dice > 1 ? getSkillValue(character, activeSkill) + dice : dice
    );
  }

  function changeSkill(e: any) {
    setActiveSkill(e.target?.value);
    setActionPoints(undefined);
  }

  function alphabetically(a: SkillFamily, b: SkillFamily) {
    return t('character.skill.' + a.skill) > t('character.skill.' + b.skill)
      ? 1
      : -1;
  }
}

export default ActionTrigger;

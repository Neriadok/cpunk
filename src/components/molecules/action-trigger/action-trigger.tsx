import { faDiceD20 } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  FormControl,
  InputLabel,
  Select,
  Box,
  Fab,
  Typography,
  Card,
  MenuItem,
  TextField,
  Grid,
} from '@mui/material';
import { t } from 'i18next';
import { theme } from '../../../env/theme';
import { getActionSkills } from '../../../lib/skills';
import CharacterStats from '../../organisms/character-stats/character-stats';
import { Skill, SkillFamily } from '../../../interfaces/skills.interface';
import { useState } from 'react';
import { ActionTriggerProps } from './action-trigger.interface';
import { getSkillStat, getSkillValue } from '../../../lib/bonifications';
import {
  Dice,
  dices,
  difficulties,
  Difficulty,
  DifficultyValue,
} from '../../../interfaces/game.interface';
import { getRollDiceValue } from '../../../lib/dice';

function ActionTrigger({ character }: ActionTriggerProps) {
  const skills: SkillFamily[] = character
    ? getActionSkills().sort(
        (a, b) =>
          getSkillValue(character, b.skill) - getSkillValue(character, a.skill)
      )
    : [];
  const [activeDice, setActiveDice] = useState<Dice>('1D10');
  const [activeSkill, setActiveSkill] = useState<Skill | 'none'>('none');
  const [actionPoints, setActionPoints] = useState<number | null>(null);
  const [difficulty, setDifficulty] = useState<Difficulty>(difficulties[0]);
  const [bonus, setBonus] = useState<number>(0);

  return (
    <Card sx={{ p: 2 }}>
      <CharacterStats character={character} readonly={true}></CharacterStats>
      <Grid container spacing={2} sx={{ mt: 3 }}>
        <Grid size={12}>
          <FormControl fullWidth>
            <InputLabel id="skill-label">{t('sheet.skill')}</InputLabel>
            <Select
              labelId="skill-label"
              value={activeSkill}
              label="skill"
              onChange={(e: any) => changeSkill(e)}
            >
              <MenuItem value={'none'}>{t('sheet.no-skill')}</MenuItem>
              {skills.sort(alphabetically).map(({ skill }) => toSkill(skill))}
            </Select>
          </FormControl>
        </Grid>

        <Grid size={6}>
          <FormControl fullWidth>
            <TextField
              aria-readonly
              disabled
              label={t('sheet.value')}
              value={getSkillValue(character, activeSkill)}
            />
          </FormControl>
        </Grid>

        <Grid size={6}>
          <FormControl fullWidth>
            <TextField
              label={t('sheet.bonus')}
              slotProps={{
                htmlInput: {
                  min: 0,
                  step: 1,
                },
              }}
              value={bonus}
              type="number"
              onChange={(e) => setBonus(parseInt(e?.target?.value || '0'))}
            />
          </FormControl>
        </Grid>

        <Grid size={6}>
          <FormControl fullWidth>
            <InputLabel id="difficulty-label">
              {t('sheet.difficulty')}
            </InputLabel>
            <Select
              labelId="difficulty-label"
              value={difficulty}
              label={t('sheet.difficulty')}
              onChange={(e: any) => setDifficulty(e?.target?.value)}
            >
              {difficulties.map(toDifficulty)}
            </Select>
          </FormControl>
        </Grid>

        <Grid size={6}>
          <FormControl fullWidth>
            <InputLabel id="dice-label">{t('sheet.dice')}</InputLabel>
            <Select
              labelId="dice-label"
              value={activeDice}
              label={t('sheet.dice')}
              onChange={(e: any) => setActiveDice(e?.target?.value)}
            >
              {dices.map(toDice)}
            </Select>
          </FormControl>
        </Grid>
      </Grid>
      <Box sx={{ mt: 2, textAlign: 'center' }}>
        <Fab
          variant="extended"
          onClick={() => rollDice()}
          color={getDiceColor()}
          disabled={!activeSkill}
        >
          <FontAwesomeIcon size="2xl" icon={faDiceD20} />
          {actionPoints && (
            <Typography variant="h5" sx={{ ml: 2 }}>
              {actionPoints}
            </Typography>
          )}
        </Fab>
      </Box>
    </Card>
  );

  function getDiceColor() {
    return actionPoints === 1 ||
      (actionPoints && actionPoints < DifficultyValue[difficulty])
      ? 'error'
      : actionPoints
        ? 'primary'
        : 'secondary';
  }

  function rollDice() {
    const dice = getRollDiceValue(activeDice);
    const value = getSkillValue(character, activeSkill) + dice + bonus;
    setActionPoints(dice > 1 ? value : 1);
  }

  function changeSkill(e: any) {
    setActiveSkill(e.target?.value);
    setActionPoints(null);
  }

  function toSkill(skill: Skill) {
    const skillValue = getSkillValue(character, skill);

    const stat = getSkillStat(skill);
    const color =
      skillValue > 9
        ? theme.palette.success.main
        : skillValue > 5
          ? theme.palette.warning.main
          : 'text.secondary';
    return (
      <MenuItem key={skill} sx={{ color }} value={skill}>
        {t('character.skill.' + skill)} ({stat} + {character.skills[skill] || 0}
        )
      </MenuItem>
    );
  }

  function toDifficulty(diff: Difficulty) {
    return (
      <MenuItem key={diff} value={diff}>
        {t('difficulty.' + diff)}
      </MenuItem>
    );
  }

  function toDice(dice: Dice) {
    return (
      <MenuItem key={dice} value={dice}>
        {dice}
      </MenuItem>
    );
  }

  function alphabetically(a: SkillFamily, b: SkillFamily) {
    return t('character.skill.' + a.skill) > t('character.skill.' + b.skill)
      ? 1
      : -1;
  }
}

export default ActionTrigger;

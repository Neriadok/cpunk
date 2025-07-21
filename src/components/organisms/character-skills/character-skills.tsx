import { Box, Slider, Stack, Typography } from '@mui/material';
import { CharacterSkillsProps } from './character-skills.interface';
import { Stat } from '../../../interfaces/stats.interface';
import { t } from 'i18next';
import { Skill, skillFamilies } from '../../../interfaces/skills.interface';
import {
  getElectionSkillPoints,
  isRoleSkill,
  sumOfSkills,
} from '../../../lib/skills';
import { getBonus } from '../../../lib/bonifications';

function CharacterSkills({ subject, character }: CharacterSkillsProps) {
  const electionSkills = skillFamilies.filter(
    ({ stat, skill }) =>
      stat !== 'special' && !isRoleSkill(character.role, skill)
  );
  const roleSkillPoints = sumOfSkills(
    character,
    electionSkills.map(({ skill }) => skill)
  );
  const maxSkillPoints = getElectionSkillPoints(character);
  const color = roleSkillPoints === maxSkillPoints ? 'primary' : 'error';

  return (
    <Box>
      <Stack direction="row" sx={{ display: 'flex' }}>
        <Typography
          flex="1"
          variant="h5"
          component="div"
          color="text.secondary"
        >
          {t('character.electionskills')}
        </Typography>
        <Typography variant="h5" component="div" color={color}>
          {roleSkillPoints}/{maxSkillPoints}
        </Typography>
      </Stack>
      <Stack>
        {electionSkills.map(({ stat, skill }) => getSkill(stat, skill))}
      </Stack>
    </Box>
  );

  function getSkill(stat: Stat | 'special', skill: Skill) {
    return (
      <Stack
        spacing={1}
        key={skill}
        direction="row"
        sx={{ display: 'flex', alignItems: 'center' }}
      >
        <Typography
          width="120px"
          variant="body2"
          color={character.skills[skill] ? 'inherit' : 'text.secondary'}
        >
          ({stat}) {t('character.skill.' + skill)}
        </Typography>
        <Box sx={{ flex: 1, pr: 1 }}>
          <Slider
            valueLabelDisplay="auto"
            color={character.skills[skill] ? 'primary' : 'secondary'}
            defaultValue={character.skills[skill]}
            step={1}
            marks
            min={getBonus(character, skill, 'skills')}
            max={10}
            onChange={(e) => setSkill(e, skill)}
          />
        </Box>
      </Stack>
    );
  }

  function setSkill(e: any, skill: Skill) {
    character.skills[skill] = Math.max(
      e.target?.value,
      getBonus(character, skill, 'skills')
    );
    subject.next({ ...character });
  }
}

export default CharacterSkills;

import { Box, Slider, Stack, Typography } from '@mui/material';
import { CharacterSkillsProps as CharacterRoleSkillsProps } from './character-role-skills.interface';
import { Stat } from '../../interfaces/stats.interface';
import { t } from 'i18next';
import { getSpecialSkillMoney, isRoleSkill, sumOfRoleSkills } from '../../lib/skills';
import { Skill, maxRoleSkillPoints, skillFamilies } from '../../interfaces/skills.interface';
import { getBonus } from '../../lib/lifepath';


function CharacterRoleSkills({ subject, character, readonly }: CharacterRoleSkillsProps) {
    const roleSkills = skillFamilies.filter(({ skill }) => isRoleSkill(character.role, skill));
    const roleSkillPoints = sumOfRoleSkills(character);
    const color = roleSkillPoints === maxRoleSkillPoints ? 'primary' : 'error'

    return (<Box>
        <Stack direction='row' sx={{ display: 'flex' }}>
            <Typography flex="1" variant="h5" component="div" color='text.secondary'>{t('character.roleskills')}</Typography>
            <Typography variant="h5" component="div" color={color}>{roleSkillPoints}/{maxRoleSkillPoints}</Typography>
        </Stack>
        <Stack>
            {roleSkills.map(({ stat, skill }) => stat ==='special' ? getSpecialRoleSkill(skill) : getRoleSkill(stat, skill))}
        </Stack>
    </Box>
    );

    function getRoleSkill(stat: Stat, skill: Skill){
        return <Stack spacing={1} key={skill} direction='row' sx={{ display: 'flex', alignItems: 'center'}}>
        <Typography width='120px' variant="body2" color='text.secondary'>({stat}) {t('character.skill.' + skill)}</Typography>
        <Box sx={{ flex: 1, pr: 1 }}>
            <Slider valueLabelDisplay="auto" color='secondary' defaultValue={character.skills[skill]} step={1} marks min={getBonus(character, skill, 'skills')} max={10} onChange={(e) => setRoleSkill(e, skill)}/>
        </Box>
    </Stack>
    }

    function getSpecialRoleSkill(skill: Skill){
        return <Stack spacing={1} key={skill} direction='row' sx={{ display: 'flex', alignItems: 'center' }}>
        <Typography width='120px' variant="body2" color='inherit'>({getSpecialSkillMoney(character)}$) {t('character.skill.' + skill)}</Typography>
        <Box sx={{ flex: 1, pr: 1 }}>
            <Slider valueLabelDisplay="auto" color='primary' defaultValue={character.skills[skill]} step={1} marks min={getBonus(character, skill, 'skills')} max={10}  onChange={(e) => setRoleSkill(e, skill)}/>
        </Box>
    </Stack>
    }

    function setRoleSkill(e: any, skill: Skill){
        character.skills[skill] = e.target?.value || 0
        subject.next({...character})
    }

}

export default CharacterRoleSkills;

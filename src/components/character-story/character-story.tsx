import { Box, Divider, IconButton, Stack, Typography } from '@mui/material';
import { CharacterStoryProps } from './character-story.interface';
import { t } from 'i18next';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRedo } from '@fortawesome/free-solid-svg-icons';
import { baseAge, getRandomLifePath } from '../../lib/character';
import { getAverageRoleSkills, getSkillsBonified, getSpecialSkillMoney } from '../../lib/skills';
import { LifePathEvent } from '../../interfaces/lifepath.interface';

function CharacterStory({ subject, character, readonly }: CharacterStoryProps) {
    return (<Box>
        <Box display='flex'>
            <Typography flex="1" variant="h5" component="div" color='text.secondary'>{t('character.story')}</Typography>
            {readonly ? '' :
                <IconButton size='small' color="inherit" onClick={() => resetStory()}>
                    <FontAwesomeIcon icon={faRedo} />
                </IconButton>}
        </Box>
        <Stack>
            {character.events.map(({ type, facts }: LifePathEvent, index: number) => <Stack>
                <Divider/>
                <Typography flex="1" variant="body1" component="div" color='inherit'>
                    {t(`life-path.event-age`, {age: index + baseAge - 2}) + ' ' +t(`life-path.event-${type}-label`)}
                    </Typography>
                <Stack>
                    {facts.map((fact) => <Typography flex="1" variant="body2" component="div" color='text.secondary'>{t(fact)}</Typography>)}
                </Stack>
            </Stack>)}
        </Stack>
    </Box>
    );

    function resetStory() {
        if (readonly) return;
        const baseCharacter = { ...character, skills: getAverageRoleSkills(character.role), ...getRandomLifePath(character.age, character.gender) };
        subject?.next({ ...baseCharacter, skills: getSkillsBonified(baseCharacter), money: getSpecialSkillMoney(baseCharacter) });
    }

}

export default CharacterStory;

import { Box, Button, Card, Grid, IconButton, Typography } from '@mui/material';
import { CharacterSkillsProps } from './character-skills.interface';
import { useState } from 'react';
import { Stat, stats } from '../../interfaces/stats.interface';
import { t } from 'i18next';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRedo } from '@fortawesome/free-solid-svg-icons';
import { getRandomStats } from '../../lib/character';


function CharacterSkills({ subject, character, readonly }: CharacterSkillsProps) {
    const [targetStat, setTargetStat] = useState<Stat | undefined>();

    return (<Card>
        <Box display='flex'>
            <Typography flex="1" variant="h5" component="div" color='text.secondary'>{t('character.stats')}</Typography>
            {readonly ? '' :
                <IconButton size='small' color="inherit" onClick={() => resetStats()}>
                    <FontAwesomeIcon icon={faRedo} />
                </IconButton>}
        </Box>
    </Card>
    );

    function chooseStat(stat: Stat) {
        if (readonly) return;
        if (targetStat) {
            setTargetStat(undefined);
            const aux = character.stats[targetStat];
            character.stats[targetStat] = character.stats[stat];
            character.stats[stat] = aux;
            subject.next({ ...character });
        } else {
            setTargetStat(stat);
        }
    }

    function resetStats() {
        if (readonly) return;
        setTargetStat(undefined);
        subject.next({ ...character, stats: getRandomStats() });
    }

}

export default CharacterSkills;

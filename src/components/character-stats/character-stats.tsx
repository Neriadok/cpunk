import { Box, Button, Card, CardHeader, Grid, IconButton, Stack, Typography } from '@mui/material';
import { CharacterStatsProps } from './character-stats.interface';
import cops from '../../images/roles/cops.png';
import corpos from '../../images/roles/corpos.png';
import fixers from '../../images/roles/fixers.png';
import medias from '../../images/roles/medias.png';
import merc from '../../images/roles/merc.png';
import netrunners from '../../images/roles/netrunners.png';
import nomads from '../../images/roles/nomads.png';
import rocknrolla from '../../images/roles/rocknrolla.png';
import techies from '../../images/roles/techies.png';
import { useState } from 'react';
import { Stat, stats } from '../../interfaces/stats.interface';
import { t } from 'i18next';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRedo } from '@fortawesome/free-solid-svg-icons';
import { getRandomStats } from '../../lib/character';


function CharacterStats({ subject, character, readonly }: CharacterStatsProps) {
    const [targetStat, setTargetStat] = useState<Stat | undefined>();
    const image = {
        cops,
        corpos,
        fixers,
        medias,
        merc,
        netrunners,
        nomads,
        rocknrolla,
        techies
    }

    return (<Card>
        <Box display='flex'>
            <Typography flex="1" variant="h5" component="div" color='text.secondary'>{t('character.stats')}</Typography>
            {readonly ? '' :
                <IconButton size='small' color="inherit" onClick={() => resetStats()}>
                    <FontAwesomeIcon icon={faRedo} />
                </IconButton>}
        </Box>
        <Grid container sx={{ textAlign: 'center' }} spacing={1}>
            {stats.map((stat) => (<Grid item xs={4} onClick={() => chooseStat(stat)}>
                <Typography variant="body2" component="div" color='text.secondary'>{stat}</Typography>
                <Button fullWidth={true} variant='outlined' color={targetStat === stat ? 'warning' : 'inherit'}>{character.stats[stat]}</Button>
            </Grid>))}
            <Grid item xs={3}>
                <Typography variant="body2" component="div" color='text.secondary'>{t('character.extrastats.run')}</Typography>
                <Button fullWidth={true} variant='outlined' color='inherit'>{Math.floor(character.stats.MOV * 3)}</Button>
            </Grid>
            <Grid item xs={3}>
                <Typography variant="body2" component="div" color='text.secondary'>{t('character.extrastats.jump')}</Typography>
                <Button fullWidth={true} variant='outlined' color='inherit'>{Math.floor(character.stats.MOV * 3 / 4)}</Button>
            </Grid>
            <Grid item xs={3}>
                <Typography variant="body2" component="div" color='text.secondary'>{t('character.extrastats.lift')}</Typography>
                <Button fullWidth={true} variant='outlined' color='inherit'>{Math.floor(character.stats.TCO * 10)}</Button>
            </Grid>
            <Grid item xs={3}>
                <Typography variant="body2" component="div" color='text.secondary'>{t('character.extrastats.health')}</Typography>
                <Button fullWidth={true} variant='outlined' color='inherit'>{Math.ceil(character.stats.TCO / 2)}</Button>
            </Grid>
        </Grid>
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

export default CharacterStats;

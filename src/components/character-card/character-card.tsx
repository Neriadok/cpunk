import { Card, CardContent, CardMedia, Grid, Stack, Typography } from '@mui/material';
import { CharacterCardProps } from './character-card.interface';
import { t } from 'i18next';
import cops from '../../images/roles/cops.png';
import corpos from '../../images/roles/corpos.png';
import fixers from '../../images/roles/fixers.png';
import medias from '../../images/roles/medias.png';
import merc from '../../images/roles/merc.png';
import netrunners from '../../images/roles/netrunners.png';
import nomads from '../../images/roles/nomads.png';
import rocknrolla from '../../images/roles/rocknrolla.png';
import techies from '../../images/roles/techies.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMars, faVenus } from '@fortawesome/free-solid-svg-icons';


function CharacterCard({ character }: CharacterCardProps) {
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

    return (<Card >
        <Stack direction='row' sx={{ display: 'flex' }}>
            <img className='roleimage' height={100} width={100} src={image[character.role.key]} alt={t('role.' + character.role.key)} />
            <CardContent sx={{ flex: 1 }}>
                <Typography gutterBottom variant="h5" component="div" color='primary'>
                    {character.name}
                </Typography>
                <Grid container>
                    <Grid item xs={8}>
                        <Typography variant="body2" color="text.secondary">
                            {t('role.' + character.role.key) + ' '}
                            <FontAwesomeIcon icon={character.gender ? faMars : faVenus} />
                        </Typography>
                    </Grid>
                    <Grid item xs={4} sx={{textAlign: 'right'}}>
                        <Typography variant="body2" color="text.secondary">{character.age} {t('core.years')}</Typography>
                    </Grid>
                </Grid>
            </CardContent>

        </Stack>
    </Card>
    );
}

export default CharacterCard;

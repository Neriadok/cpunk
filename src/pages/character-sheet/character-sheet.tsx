import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Button,
  Container,
  Dialog,
  DialogActions,
  DialogTitle,
  LinearProgress,
  Stack,
  Typography,
} from '@mui/material';
import { useState } from 'react';
import CharacterStory from '../../components/organisms/character-story/character-story';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { charactersSubject, removeCharacter } from '../../lib/db';
import { useNavigate, useParams } from 'react-router-dom';
import CharacterInfo from '../../components/molecules/character-info/character-info';
import { t } from 'i18next';
import { Character } from '../../interfaces/character.interface';
import { getRandomCharacter } from '../../lib/character';
import CharacterState from '../../components/molecules/character-state/character-state';
import ActionTrigger from '../../components/molecules/action-trigger/action-trigger';

function CharacterSheet() {
  const navigate = useNavigate();
  const params = useParams();
  const character: Character =
    charactersSubject.value.find(({ uid }) => uid === params.uid) ||
    getRandomCharacter();
  const [deletePopup, setDeletePopup] = useState<boolean>(false);

  if (character.uid != params.uid) {
    navigate('/');
  }

  return character.uid != params.uid ? (
    <LinearProgress color="warning" />
  ) : (
    <Container sx={{ pb: 2 }}>
      <Stack spacing={1}>
        <Accordion>
          <AccordionSummary aria-controls="panel1a-content" id="panel1a-header">
            <Stack sx={{ width: '100%' }}>
              <CharacterInfo character={character}></CharacterInfo>
              <Box sx={{ position: 'relative', top: 3, textAlign: 'center' }}>
                <FontAwesomeIcon
                  size="xs"
                  icon={faChevronDown}
                ></FontAwesomeIcon>
              </Box>
            </Stack>
          </AccordionSummary>
          <AccordionDetails>
            <Stack spacing={2}>
              <CharacterStory
                character={character}
                readonly={true}
              ></CharacterStory>
              <Box sx={{ textAlign: 'right' }}>
                <Button
                  endIcon={<FontAwesomeIcon icon={faTrashAlt} />}
                  variant="outlined"
                  color="error"
                  onClick={() => setDeletePopup(true)}
                >
                  {t('core.delete')}
                </Button>
              </Box>
            </Stack>
          </AccordionDetails>
        </Accordion>
        <Accordion>
          <AccordionSummary aria-controls="panel1a-content" id="panel1a-header">
            <Stack sx={{ width: '100%' }} direction="row">
              <Typography
                flex="1"
                variant="h5"
                component="div"
                color="text.secondary"
              >
                {t('sheet.state')}
              </Typography>
              <Box sx={{ position: 'relative', top: 3, textAlign: 'center' }}>
                <FontAwesomeIcon
                  size="xs"
                  icon={faChevronDown}
                ></FontAwesomeIcon>
              </Box>
            </Stack>
          </AccordionSummary>
          <AccordionDetails>
            <CharacterState character={character}></CharacterState>
          </AccordionDetails>
        </Accordion>
        <ActionTrigger character={character}></ActionTrigger>
      </Stack>
      <Dialog
        open={!!deletePopup}
        onClose={() => setDeletePopup(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {t('core.confirmaction')}
        </DialogTitle>
        <DialogActions>
          <Button
            color="inherit"
            onClick={() => setDeletePopup(false)}
            autoFocus
          >
            {t('core.cancel')}
          </Button>
          <Button color="error" onClick={() => deleteCharacter()}>
            {t('core.delete')}
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );

  function deleteCharacter() {
    removeCharacter(character);
    navigate('/');
  }
}

export default CharacterSheet;

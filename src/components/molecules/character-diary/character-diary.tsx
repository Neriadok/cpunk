import { Box, FormControl, InputAdornment, TextField } from '@mui/material';
import { t } from 'i18next';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState } from 'react';
import { faBitcoinSign } from '@fortawesome/free-solid-svg-icons';
import { CharacterDiartProps } from './character-diary.interface';

function CharacterDiary({ character, onChange }: CharacterDiartProps) {
  const [notes, setNotes] = useState<string>(character?.notes || '');
  const [money, setMoney] = useState<number>(character?.money || 0);

  return (
    <Box>
      <FormControl fullWidth>
        <TextField
          label={t('sheet.money')}
          type="number"
          slotProps={{
            input: {
              endAdornment: (
                <InputAdornment position="start">
                  <FontAwesomeIcon icon={faBitcoinSign}></FontAwesomeIcon>
                </InputAdornment>
              ),
            },
          }}
          defaultValue={money}
          onChange={(e) =>
            changeMoney(e.target.value ? parseInt(e.target.value) : 0)
          }
        />
      </FormControl>
      <FormControl fullWidth>
        <TextField
          multiline
          type="textarea"
          rows={7}
          defaultValue={notes}
          label={t('sheet.notes')}
          onChange={(e) => changeNotes(e.target.value)}
        />
      </FormControl>
    </Box>
  );

  function changeMoney(value: number = 0) {
    setMoney(value);
    onChange({ ...character, money: value });
  }

  function changeNotes(value: string = '') {
    setNotes(value);
    onChange({ ...character, notes: value });
  }
}

export default CharacterDiary;

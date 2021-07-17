import { FormControl, InputLabel, MenuItem } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import React from 'react';
import {
  Prefecture,
  PREFECTURES,
} from '../../../containers/entities/prefectures';
import { SelectCustom } from '../../helpers/SelectCustom/SelectCustom';

interface Props {
  selectedPrefecture: Prefecture | 'すべて';
  handleSelectPrefecture: (e: React.ChangeEvent<{ value: unknown }>) => void;
}

const useStyles = makeStyles(() => ({
  formControl: {
    minWidth: 120,
  },
}));

export const FilterByPrefecture: React.VFC<Props> = ({
  selectedPrefecture,
  handleSelectPrefecture,
}) => {
  const classes = useStyles();
  const prefectures = Object.keys(PREFECTURES) as Prefecture[];

  return (
    <FormControl className={classes.formControl} variant="outlined">
      <InputLabel id="prefecture">開催場所</InputLabel>
      <SelectCustom
        displayRowsCount={5.5}
        labelId="prefecture"
        value={selectedPrefecture}
        onChange={handleSelectPrefecture}
        label="開催場所"
        align="right"
      >
        <MenuItem value="すべて">すべて</MenuItem>
        {prefectures.map((prefecture) => (
          <MenuItem key={prefecture} value={prefecture}>
            {prefecture}
          </MenuItem>
        ))}
      </SelectCustom>
    </FormControl>
  );
};

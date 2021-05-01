import React from 'react';
import { InputLabel, MenuItem, FormControl, Select } from '@material-ui/core';
import { useSelect } from '../../helpers/hooks/useSelect';
import { PREFECTURES, Prefecture } from '../../constants/prefectures';

export const FilterByPrefecture: React.VFC = () => {
  const [selectedPrefecture, handleSelectPrefecture] = useSelect('すべて');
  const prefectures = Object.keys(PREFECTURES) as Prefecture[];

  return (
    <FormControl variant="outlined">
      <InputLabel id="prefecture">開催場所</InputLabel>
      <Select
        labelId="prefecture"
        value={selectedPrefecture}
        onChange={handleSelectPrefecture}
        label="開催場所"
        MenuProps={{
          getContentAnchorEl: null,
          anchorOrigin: {
            vertical: 'bottom',
            horizontal: 'center',
          },
          transformOrigin: {
            vertical: 'top',
            horizontal: 'center',
          },
        }}
      >
        <MenuItem value="すべて">
          <em>すべて</em>
        </MenuItem>
        {prefectures.map((prefecture) => (
          <MenuItem key={prefecture} value={prefecture}>
            {prefecture}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

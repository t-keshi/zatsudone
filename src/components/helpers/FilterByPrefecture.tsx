import { FormControl, InputLabel, MenuItem, Select } from '@material-ui/core';
import React from 'react';
import { Prefecture, PREFECTURES } from '../../constants/prefectures';
import { useSelect } from '../../utility/hooks/useSelect';

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

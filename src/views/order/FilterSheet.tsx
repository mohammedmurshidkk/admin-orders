import React, { Dispatch, SetStateAction } from 'react';
import { MenuItem, Select } from '@mui/material';
import Card from '@mui/material/Card';
import FormControl from '@mui/material/FormControl';
import Grid from '@mui/material/Grid';
import InputLabel from '@mui/material/InputLabel';
import TextField from '@mui/material/TextField';
import { statusList } from '../../constants/status';

export interface Filter {
  search?: string;
  status?: string;
}

interface Props {
  filter: Filter;
  setFilter: Dispatch<SetStateAction<Filter>>;
}

const FilterSheet: React.FC<Props> = ({ filter = {}, setFilter }) => {
  const { search, status } = filter;

  const handleFilterChange = (name: keyof Filter, value: string) => {
    const updatedFilter = { ...filter };
    updatedFilter[name] = value;
    setFilter(updatedFilter);
  };

  return (
    <Grid component={Card} container p={2} gap={2}>
      <TextField
        size='small'
        autoComplete='off'
        label='Search'
        value={search}
        onChange={(e) => handleFilterChange('search', e?.target?.value)}
      />
      <FormControl size='small'>
        <InputLabel id='status-label'>Status</InputLabel>
        <Select
          labelId='status-label'
          id='status'
          label='Status'
          value={status}
          onChange={(e) => handleFilterChange('status', e.target.value)}
          sx={{ minWidth: 200 }}
        >
          {statusList?.map((status) => {
            return (
              <MenuItem key={status.value} value={status.value}>
                {status.label}
              </MenuItem>
            );
          })}
        </Select>
      </FormControl>
    </Grid>
  );
};

export default FilterSheet;

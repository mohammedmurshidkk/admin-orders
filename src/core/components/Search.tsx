import TextField from '@mui/material/TextField';
import { useTheme } from '@mui/material/styles';
import SearchIcon from '@mui/icons-material/Search';

const Search = () => {
  const theme = useTheme();

  return (
    <TextField
      size='small'
      placeholder='Search'
      fullWidth
      inputProps={{ style: { marginLeft: 8 } }}
      InputProps={{
        startAdornment: <SearchIcon fontSize='small' />,
        style: { backgroundColor: theme.palette.common.white },
      }}
    />
  );
};

export default Search;

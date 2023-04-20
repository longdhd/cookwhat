import { Box, Theme } from '@mui/material';
import { createStyles, makeStyles } from '@mui/styles';
import React, { useEffect, useState } from 'react';
import ingredientApi from './api/ingredientApi';
import './App.css';
import AutocompleteMultiInput from './components/SearchBar';
import { Ingredient } from './models';

const useStyles = makeStyles((theme: Theme) => (
  createStyles({
    root: {
      height: '100vh',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'yellow'
    }
  })
))

function App() {
  const classes = useStyles();
  const [searchOptions, setSearchOptions] = useState<Array<Ingredient>>([]);

  useEffect(() => {
    (async () => {
      const response = await ingredientApi.getAll();
      setSearchOptions(response);
    })()
  })

  return (
    <div className="App">
      <Box className={classes.root}>
        {searchOptions.length > 0 && <AutocompleteMultiInput searchOptions={searchOptions}/>}
      </Box>
    </div>
  );
}

export default App;

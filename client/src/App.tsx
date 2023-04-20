import React from 'react';
import logo from './logo.svg';
import './App.css';
import AutocompleteMultiInput from './components/SearchBar';
import { Box, Theme } from '@mui/material';
import { createStyles, makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme: Theme) => (
  createStyles({
    root: {
      height:'100vh',
      display: 'flex',
      justifyContent:'center',
      alignItems:'center',
      backgroundColor:'yellow'
    }
  })
))

function App() {
  const classes = useStyles();
  return (
    <div className="App">
      <Box className={classes.root}>
        <AutocompleteMultiInput />
      </Box>
    </div>
  );
}

export default App;

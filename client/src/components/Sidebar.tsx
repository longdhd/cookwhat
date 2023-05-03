import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Box, Collapse, Typography } from '@mui/material';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormGroup from '@mui/material/FormGroup';
import { createStyles, makeStyles } from '@mui/styles';
import { useState } from 'react';
import AccessTimeFilledIcon from '@mui/icons-material/AccessTimeFilled';
import LunchDiningIcon from '@mui/icons-material/LunchDining';
import TravelExploreIcon from '@mui/icons-material/TravelExplore';

const useStyles = makeStyles(() => (
  createStyles({
    root: {
      height: '100%',
      position: 'relative',
      padding: '40px 7.5%',
      color: '#C5CAD0',
      letterSpacing: 2,
      '&::before': {
        content: '""',
        position: 'absolute',
        backgroundColor: '#CECFD0',
        width: '85%',
        height: '1px',
        top: '16px',
        left: '7.5%',
      }
    },
    filterContainer: {
      height: '100%',
      padding: '16px 0',
      '&::before': {
        content: '""',
        position: 'absolute',
        backgroundColor: '#CECFD0',
        width: '85%',
        height: '1px',
        top: '88px',
        left: '7.5%',
      },
      '& > h6, & span': {
        fontFamily: 'Noto Sans Medium',
      },
      '& > h6': {
        marginTop: '36px',
        borderRadius:'8px',
        background:'#CECFD0',
        padding:'3px',
        color:'#000'
      },
      '& > h6 path':{
        fill: '#000'
      },
      '& path': {
        fill: '#C5CAD0'
      }
    }
  }
  )
))

export default function Sidebar() {
  const classes = useStyles();
  const [showDuration, setShowDuration] = useState(true);
  const [showMeals, setShowMeals] = useState(true);
  const [showCuisine, setShowCuisine] = useState(true);

  return (
    <Box className={classes.root}>
      <Typography variant='h5'>FILTERS</Typography>
      <Box className={classes.filterContainer}>
        <Typography variant='subtitle1'
          sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}
          onClick={() => setShowDuration(!showDuration)}>
          <AccessTimeFilledIcon />DURATION {showDuration ? <ExpandLessIcon /> : <ExpandMoreIcon fontSize="small" />}
        </Typography>
        <Collapse in={showDuration}>
          <FormGroup sx={{border:'1px solid #CECFD0', padding:'8px', mt:2}}>
            <FormControlLabel control={<Checkbox color="default" defaultChecked />} label="< 15 mins" />
            <FormControlLabel control={<Checkbox color="default" />} label="15 - 30 mins" />
            <FormControlLabel control={<Checkbox color="default" />} label="More than 30 mins" />
          </FormGroup>
        </Collapse>
        <Typography variant='subtitle1'
          sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}
          onClick={() => setShowMeals(!showMeals)}>
          <LunchDiningIcon />MEALS {showMeals ? <ExpandLessIcon /> : <ExpandMoreIcon fontSize="small" />}
        </Typography>
        <Collapse in={showMeals}>
          <FormGroup sx={{border:'1px solid #CECFD0', padding:'8px', mt:2}}>
            <FormControlLabel control={<Checkbox color="default" defaultChecked />} label="Breakfast & Brunch" />
            <FormControlLabel control={<Checkbox color="default" />} label="Lunch" />
            <FormControlLabel control={<Checkbox color="default" />} label="Dinner" />
            <FormControlLabel control={<Checkbox color="default" />} label="Hotpot" />
            <FormControlLabel control={<Checkbox color="default" />} label="Salad" />
            <FormControlLabel control={<Checkbox color="default" />} label="Snacks & Deserts" />
          </FormGroup>
        </Collapse>
        <Typography variant='subtitle1'
          sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}
          onClick={() => setShowCuisine(!showCuisine)}>
          <TravelExploreIcon />CUISINE {showCuisine ? <ExpandLessIcon /> : <ExpandMoreIcon fontSize="small" />}
        </Typography>
        <Collapse in={showCuisine}>
          <FormGroup sx={{border:'1px solid #CECFD0', padding:'8px', mt:2}}>
            <FormControlLabel control={<Checkbox color="default" defaultChecked />} label="Japanese" />
            <FormControlLabel control={<Checkbox color="default" />} label="Vietnamese" />
            <FormControlLabel control={<Checkbox color="default" />} label="Chinese" />
            <FormControlLabel control={<Checkbox color="default" />} label="Thai" />
            <FormControlLabel control={<Checkbox color="default" />} label="Mexican" />
            <FormControlLabel control={<Checkbox color="default" />} label="French" />
          </FormGroup>
        </Collapse>
      </Box>
    </Box>
  );
}

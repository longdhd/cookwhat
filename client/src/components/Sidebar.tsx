import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Box, Collapse, Typography, FormGroup } from '@mui/material';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import { createStyles, makeStyles } from '@mui/styles';
import { ChangeEvent, useState, FormEvent, useEffect } from 'react';
import AccessTimeFilledIcon from '@mui/icons-material/AccessTimeFilled';
import LunchDiningIcon from '@mui/icons-material/LunchDining';
import TravelExploreIcon from '@mui/icons-material/TravelExplore';
import { useAppDispatch, useAppSelector } from '../app/hook';
import { recipeActions, selectRecipeFilter } from '../features/recipes/recipeSlice';

const useStyles = makeStyles(() => (
  createStyles({
    root: {
      height: '100%',
      position: 'relative',
      padding: '40px 7.5%',
      color: '#f6f7f9',
      letterSpacing: 2,
      '&::before': {
        content: '""',
        position: 'absolute',
        backgroundColor: '#f6f7f9',
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
        backgroundColor: '#f6f7f9',
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
        borderRadius: '8px',
        background: '#f6f7f9',
        padding: '3px',
        color: '#000'
      },
      '& > h6 path': {
        fill: '#000'
      },
      '& path': {
        fill: '#f6f7f9'
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

  const [duration, setDuration] = useState({
    min: 0,
    max: 100
  })

  const dispatch = useAppDispatch();
  const filter = useAppSelector(selectRecipeFilter);

  const handleCheck = (e: ChangeEvent<HTMLInputElement>) => {
    const [minDuration, maxDuration] = e.target.value.split(',');
    setDuration({
      ...duration,
      min: Number(minDuration) === duration.min ? 0 : Number(minDuration),
      max: Number(maxDuration) === duration.max ? 100 : Number(maxDuration)
    })
  }

  useEffect(() => {
    const newFilter = {
      ...filter,
      duration: duration
    }
    dispatch(recipeActions.setFilter(newFilter));
  }, [dispatch, duration])

  return (
    <Box className={classes.root}>
      <Typography variant='h5'>FILTERS</Typography>
      <Box className={classes.filterContainer}>
        <Typography variant='subtitle1'
          sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}
          onClick={() => setShowDuration(!showDuration)}>
          <AccessTimeFilledIcon />TIMING {showDuration ? <ExpandLessIcon /> : <ExpandMoreIcon fontSize="small" />}
        </Typography>
        <Collapse in={showDuration}>
          <FormControl>
            <FormGroup sx={{ border: '1px solid #f6f7f9', padding: '8px', mt: 2 }}>
              <FormControlLabel control={<Checkbox color="default" value={[0, 15]} checked={duration.min === 0 && duration.max === 15} onChange={handleCheck} />} label="< 15 mins" />
              <FormControlLabel control={<Checkbox color="default" value={[15, 30]} checked={duration.min === 15 && duration.max === 30} onChange={handleCheck} />} label="15 - 30 mins" />
              <FormControlLabel control={<Checkbox color="default" value={[30, 100]} checked={duration.min === 30 && duration.max === 100} onChange={handleCheck} />} label="More than 30 mins" />
            </FormGroup>
          </FormControl>
        </Collapse>
        <Typography variant='subtitle1'
          sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}
          onClick={() => setShowMeals(!showMeals)}>
          <LunchDiningIcon />MEALS {showMeals ? <ExpandLessIcon /> : <ExpandMoreIcon fontSize="small" />}
        </Typography>
        <Collapse in={showMeals}>
          <FormGroup sx={{ border: '1px solid #f6f7f9', padding: '8px', mt: 2 }}>
            <FormControlLabel control={<Checkbox color="default" />} label="Breakfast & Brunch" />
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
          <FormGroup sx={{ border: '1px solid #f6f7f9', padding: '8px', mt: 2 }}>
            <FormControlLabel control={<Checkbox color="default" />} label="Japanese" />
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

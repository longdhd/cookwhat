import AccessTimeFilledIcon from '@mui/icons-material/AccessTimeFilled';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import LunchDiningIcon from '@mui/icons-material/LunchDining';
import TravelExploreIcon from '@mui/icons-material/TravelExplore';
import { Box, Collapse, FormGroup, Typography } from '@mui/material';
import Checkbox from '@mui/material/Checkbox';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import { createStyles, makeStyles } from '@mui/styles';
import { ChangeEvent, useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../app/hook';
import { recipeActions, selectRecipeFilter } from '../features/recipes/recipeSlice';

const useStyles = makeStyles(() => (
  createStyles({
    root: {
      height: '100%',
      position: 'relative',
      padding: '40px 7.5%',
      color: '#f4f3e6',
      letterSpacing: 2,
      '&::before': {
        content: '""',
        position: 'absolute',
        backgroundColor: '#f4f3e6',
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
        backgroundColor: '#f4f3e6',
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
        background: '#f4f3e6',
        padding: '3px',
        color: '#000'
      },
      '& > h6 path': {
        fill: '#000'
      },
      '& path': {
        fill: '#f4f3e6'
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

  const [tags, setTags] = useState<string[] | string>("All");

  const dispatch = useAppDispatch();
  const filter = useAppSelector(selectRecipeFilter);

  const handleDurationCheck = (e: ChangeEvent<HTMLInputElement>) => {
    const [minDuration, maxDuration] = e.target.value.split(',');
    setDuration({
      ...duration,
      min: Number(minDuration) === duration.min ? 0 : Number(minDuration),
      max: Number(maxDuration) === duration.max ? 100 : Number(maxDuration)
    })
  }

  const handleTagCheck = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    if (tags.includes(value)) {
      if (tags.length > 1)
        setTags((state) => (state as string[]).filter(item => item !== value));
      else
        setTags("All");
    } else {
      if (Array.isArray(tags))
        setTags([...tags, value])
      else {
        setTags([value])
      }
    }
  }

  useEffect(() => {
    const newFilter = {
      ...filter,
      duration: duration,
      _tags: tags
    }
    dispatch(recipeActions.setFilter(newFilter));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, duration, tags])

  return (
    <Box className={classes.root}>
      <Typography variant='h5'>FILTERS</Typography>
      <Box className={classes.filterContainer}>
        <Typography variant='subtitle1'
          sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}
          onClick={() => setShowDuration(!showDuration)}>
          <AccessTimeFilledIcon />TIMING {showDuration ? <ExpandLessIcon /> : <ExpandMoreIcon fontSize="small" />}
        </Typography>
        <Collapse in={showDuration} timeout={800}>
          <FormControl sx={{ border: '1px solid #f4f3e6', padding: '8px', mt: 2, width: 'inherit' }}>
            <FormGroup>
              <FormControlLabel control={<Checkbox color="default" value={[0, 15]} checked={duration.min === 0 && duration.max === 15} onChange={handleDurationCheck} />} label="< 15 mins" />
              <FormControlLabel control={<Checkbox color="default" value={[15, 30]} checked={duration.min === 15 && duration.max === 30} onChange={handleDurationCheck} />} label="15 - 30 mins" />
              <FormControlLabel control={<Checkbox color="default" value={[30, 100]} checked={duration.min === 30 && duration.max === 100} onChange={handleDurationCheck} />} label="More than 30 mins" />
            </FormGroup>
          </FormControl>
        </Collapse>
        <Typography variant='subtitle1'
          sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}
          onClick={() => setShowMeals(!showMeals)}>
          <LunchDiningIcon />MEALS {showMeals ? <ExpandLessIcon /> : <ExpandMoreIcon fontSize="small" />}
        </Typography>
        <Collapse in={showMeals}>
          <FormControl sx={{ border: '1px solid #f4f3e6', padding: '8px', mt: 2, width: 'inherit' }}>
            <FormGroup>
              <FormControlLabel control={<Checkbox color="default" value={'Breakfast'} checked={(Array.isArray(tags) && tags.includes("Breakfast"))} onChange={handleTagCheck} />} label="Breakfast & Brunch" />
              <FormControlLabel control={<Checkbox color="default" value={'Lunch'} checked={(Array.isArray(tags) && tags.includes("Lunch"))} onChange={handleTagCheck}/>} label="Lunch" />
              <FormControlLabel control={<Checkbox color="default" value={'Dinner'} checked={(Array.isArray(tags) && tags.includes("Dinner"))} onChange={handleTagCheck}/>} label="Dinner" />
              <FormControlLabel control={<Checkbox color="default" value={'Hotpot'} checked={(Array.isArray(tags) && tags.includes("Hotpot"))} onChange={handleTagCheck}/>} label="Hotpot" />
              <FormControlLabel control={<Checkbox color="default" value={'Salad'} checked={(Array.isArray(tags) && tags.includes("Salad"))} onChange={handleTagCheck}/>} label="Salad" />
              <FormControlLabel control={<Checkbox color="default" value={'Snacks'} checked={(Array.isArray(tags) && tags.includes("Snacks"))} onChange={handleTagCheck}/>} label="Snacks & Deserts" />
            </FormGroup>
          </FormControl>
        </Collapse>
        <Typography variant='subtitle1'
          sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}
          onClick={() => setShowCuisine(!showCuisine)}>
          <TravelExploreIcon />CUISINE {showCuisine ? <ExpandLessIcon /> : <ExpandMoreIcon fontSize="small" />}
        </Typography>
        <Collapse in={showCuisine}>
          <FormGroup sx={{ border: '1px solid #f4f3e6', padding: '8px', mt: 2 }}>
            <FormControlLabel control={<Checkbox color="default" />} label="Japanese" />
            <FormControlLabel control={<Checkbox color="default" value={'Vietnamese'} checked={(Array.isArray(tags) && tags.includes("Vietnamese"))} onChange={handleTagCheck} />} label="Vietnamese" />
            <FormControlLabel control={<Checkbox color="default" value={'Chinese'} checked={(Array.isArray(tags) && tags.includes("Chinese"))} onChange={handleTagCheck} />} label="Chinese" />
            <FormControlLabel control={<Checkbox color="default" value={'Thai'} checked={(Array.isArray(tags) && tags.includes("Thai"))} onChange={handleTagCheck}/>} label="Thai" />
            <FormControlLabel control={<Checkbox color="default" value={'Mexican'} checked={(Array.isArray(tags) && tags.includes("Mexican"))} onChange={handleTagCheck}/>} label="Mexican" />
            <FormControlLabel control={<Checkbox color="default" value={'French'} checked={(Array.isArray(tags) && tags.includes("French"))} onChange={handleTagCheck}/>} label="French" />
          </FormGroup>
        </Collapse>
      </Box>
    </Box>
  );
}

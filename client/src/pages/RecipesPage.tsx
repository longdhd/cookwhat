import { Box, Button, Collapse, Grid, Typography } from '@mui/material';
import { createStyles, makeStyles } from '@mui/styles';
import { unwrapResult } from '@reduxjs/toolkit';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../app/hook';
import LoadingLottie from '../components/LoadingLottie';
import RecipeItem from '../components/RecipeItem';
import { getRecipes, getRecipesByIngredients, selectIngredientArray, selectRecipeFilter, selectRecipeList, selectRecipeLoading, seletIsSearchingRecipesByIngredients } from '../features/recipes/recipeSlice';
import { Recipe } from '../models';

export interface RecipesPageProps {
}
const useStyles = makeStyles(() => (
  createStyles({
    root: {
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'flex-start',
      padding: '40px 48px',
      oveflow: 'hidden'
    },
  })
))

export default function RecipesPage(props: RecipesPageProps) {
  const classes = useStyles();
  const dispatch = useAppDispatch();
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const isSearchingRecipesByIngredients = useAppSelector(seletIsSearchingRecipesByIngredients);
  const ingredientArray = useAppSelector(selectIngredientArray);
  const filter = useAppSelector(selectRecipeFilter);
  const isLoading = useAppSelector(selectRecipeLoading);

  useEffect(() => {

    const fetchData = async () => {
      if (!isSearchingRecipesByIngredients) {
        const result = await dispatch(getRecipes(filter));
        const response = unwrapResult(result);
        setRecipes(response);
      } else {
        const result = await dispatch(getRecipesByIngredients());
        const response = unwrapResult(result);
        setRecipes(response);
      }
    }

    fetchData();
  }, [dispatch, filter, isSearchingRecipesByIngredients])

  return (
    <Box className={classes.root}>
      {!isSearchingRecipesByIngredients
        ? <>
          <Typography variant='h4'>Khám phá tất cả công thức</Typography>
          <Typography sx={{ mt: 2, fontFamily: 'Noto Sans Medium', fontSize: '18px' }}>Hôm nay ăn gì? Tìm kiếm câu trả lời cho câu hỏi này với các công thức nấu ăn.</Typography>
        </>
        : <>
          <Typography variant='h4' sx={{ mt: 4 }}>Tìm món ăn bằng nguyên liệu: </Typography>
          <Typography sx={{ mt: 2, fontFamily: 'Noto Sans Medium', fontSize: '18px', display: 'flex', alignItems: 'center', gap: 2 }}>
            {ingredientArray.map(item => (
              <div style={{ background: '#1976d2', border: '1px solid #fff', borderRadius: '4px', padding: '0 10px', height: '36px', display: 'flex', alignItems: 'center', color: '#fff' }}><span>{item.title.concat(' ')}</span></div>
            ))}
          </Typography>
        </>
      }
      {!isLoading
        ? <Grid container spacing={4} sx={{ mt: 2, pb: 4 }}>
          {recipes && recipes.map(
            (recipe, idx) =>
              <Grid item xs={12} md={6} lg={4} xl={3} key={idx}>
                <RecipeItem recipe={recipe} />
              </Grid>
          )}
        </Grid>
        : <Box sx={{ height: '100%', width: '100%', display: 'flex' }}><LoadingLottie /></Box>}
    </Box>
  );
}

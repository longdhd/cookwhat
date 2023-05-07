import { Box, Typography } from '@mui/material';
import { createStyles, makeStyles } from '@mui/styles';
import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../app/hook';
import LoadingLottie from '../components/LoadingLottie';
import RecipeList from '../components/RecipeList';
import RecipeSearchSort from '../components/RecipeSearchSort';
import { debouncedSetFilter, getRecipes, getRecipesByIngredients, recipeActions, selectIngredientArray, selectRecipeFilter, selectRecipeList, selectRecipeLoading, seletIsSearchingRecipesByIngredients } from '../features/recipes/recipeSlice';
import { ListParams } from '../models/index';

export interface RecipesPageProps {
}
const useStyles = makeStyles(() => (
  createStyles({
    root: {
      height: '100%',
      width: '100%',
      padding: '40px 48px',
      oveflow: 'auto'
    },
  })
))

export default function RecipesPage(props: RecipesPageProps) {
  const classes = useStyles();
  const dispatch = useAppDispatch();
  const recipes = useAppSelector(selectRecipeList);
  const isSearchingRecipesByIngredients = useAppSelector(seletIsSearchingRecipesByIngredients);
  const ingredientArray = useAppSelector(selectIngredientArray);
  const filter = useAppSelector(selectRecipeFilter);
  const isLoading = useAppSelector(selectRecipeLoading);

  useEffect(() => {

    const fetchData = async () => {
      if (!isSearchingRecipesByIngredients) {
        dispatch(getRecipes(filter));
      } else {
        dispatch(getRecipesByIngredients());
      }
    }

    fetchData();
  }, [dispatch, filter, isSearchingRecipesByIngredients])

  const handleSearchChange = (filter: ListParams) => {
    dispatch(debouncedSetFilter(filter));
  }

  const handleSortChange = (filter: ListParams) => {
    dispatch(recipeActions.setFilter(filter));
  }

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
      <RecipeSearchSort filter={filter} onSearchChange={handleSearchChange} onSortChange={handleSortChange} />
      {isLoading ? <LoadingLottie /> : <RecipeList recipeList={recipes} />}
    </Box>
  );
}

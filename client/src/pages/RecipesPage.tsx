import { Box, Grid, Typography } from '@mui/material';
import { createStyles, makeStyles } from '@mui/styles';
import { unwrapResult } from '@reduxjs/toolkit';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../app/hook';
import RecipeItem from '../components/RecipeItem';
import { getRecipes, selectIngredientArray, selectRecipeList, seletIsSearchingRecipesByIngredients } from '../features/recipes/recipeSlice';
import { Ingredient, Recipe } from '../models';

export interface RecipesPageProps {
}
const useStyles = makeStyles(() => (
  createStyles({
    root: {
      height: '100vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'flex-start',
      padding: '40px 48px',
    },
  })
))

const routes = [
  { route: "", query: { _sort: "updateAt" }, title: "Khám phá tất cả công thức", desc: "Hôm nay ăn gì? Tìm kiếm câu trả lời cho câu hỏi này với các công thức nấu ăn." },
  { route: "?_sort=most-picked", query: { _sort: "title" }, title: "Khám phá công thức yêu thích nhất", desc: "Khám phá hàng trăm công thức nấu ăn nhanh và dễ dàng được xếp hạng hàng đầu cho bữa sáng, bữa trưa và bữa tối." },
  { route: "?_sort=recommended", query: { _sort: "img" }, title: "Khám phá công thức AI giới thiệu", desc: "Hôm nay ăn gì? Hãy để AI giúp bạn tìm kiếm công thức phù hợp với thời tiết, thời điểm trong ngày" }
]

export default function RecipesPage(props: RecipesPageProps) {
  const classes = useStyles();
  const location = useLocation();
  const dispatch = useAppDispatch();
  const [title, setTitle] = useState("Khám phá tất cả công thức");
  const [desc, setDesc] = useState("Hôm nay ăn gì? Tìm kiếm câu trả lời cho câu hỏi này với các công thức nấu ăn.");
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const isSearchingRecipesByIngredients = useAppSelector(seletIsSearchingRecipesByIngredients);
  const ingredientArray = useAppSelector(selectIngredientArray);
  const recipeList = useAppSelector(selectRecipeList);

  useEffect(() => {

    const fetchData = async (locationSearch: string) => {
      const location = routes.find(route => route.route === locationSearch);

      if (location) {
        const result = await dispatch(getRecipes(location.query));
        const response = unwrapResult(result);
        setTitle(location.title);
        setDesc(location.desc);
        setRecipes(response)
      }
    }

    if (!isSearchingRecipesByIngredients) {
      fetchData(location.search);
    } else {
      setRecipes(recipeList);
    }
  }, [dispatch, isSearchingRecipesByIngredients, location.search])

  return (
    <Box className={classes.root}>
      {!isSearchingRecipesByIngredients && <>
        <Typography variant='h4'>{title}</Typography>
        <Typography sx={{ mt: 2, fontFamily: 'Noto Sans Medium', fontSize: '18px'}}>{desc}</Typography>
      </>}
      {isSearchingRecipesByIngredients && <>
        <Typography variant='h4' sx={{ mt: 4 }}>Tìm món ăn bằng nguyên liệu: </Typography>
        <Typography sx={{ mt: 2, fontFamily: 'Noto Sans Medium', fontSize: '18px', display:'flex', alignItems:'center', gap: 2 }}>
          {ingredientArray.map(item => (
            <div style={{background:'#1976d2', border: '1px solid #fff', borderRadius: '4px', padding:'0 10px', height:'36px', display:'flex', alignItems:'center', color:'#fff'}}><span>{item.title.concat(' ')}</span></div>
          ))}
        </Typography>
      </>}
      <Grid container spacing={4} sx={{ mt: 4, pb: 4 }}>
        {recipes && recipes.map(repcipe => (
          <Grid item xs={12} md={6} lg={3} key={repcipe.title}>
            <RecipeItem recipe={repcipe} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}

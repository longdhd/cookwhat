import { Box, Grid, Typography } from '@mui/material';
import { createStyles, makeStyles } from '@mui/styles';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import recipeApi from '../api/recipeApi';
import RecipeItem from '../components/RecipeItem';
import { Recipe } from '../models';

export interface RecipesPageProps {
}
const useStyles = makeStyles(() => (
  createStyles({
    root: {
      height: '100vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      padding: '24px 48px',
    },
  })
))

export default function RecipesPage(props: RecipesPageProps) {
  const classes = useStyles();
  const location = useLocation();
  const [title, setTitle] = useState("Khám phá tất cả công thức");
  const [desc, setDesc] = useState("Hôm nay ăn gì? Tìm kiếm câu trả lời cho câu hỏi này với các công thức nấu ăn.");
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  useEffect(() => {
    (async () => {
      const response = await recipeApi.getAll();
      setRecipes(response)
    })()

    switch (location.search) {
      case "?option=most-picked":
        setTitle("Khám phá công thức yêu thích nhất");
        setDesc("Khám phá hàng trăm công thức nấu ăn nhanh và dễ dàng được xếp hạng hàng đầu cho bữa sáng, bữa trưa và bữa tối.")
        break;

      case "?option=recommended":
        setTitle("Khám phá công thức AI giới thiệu")
        setDesc("Hôm nay ăn gì? Hãy để AI giúp bạn tìm kiếm công thức phù hợp với thời tiết, thời điểm trong ngày")
        break;

      default:
        setTitle("Khám phá tất cả công thức")
        setDesc("Hôm nay ăn gì? Tìm kiếm câu trả lời cho câu hỏi này với các công thức nấu ăn.");
        break;
    }
  }, [location.search])

  return (
    <Box className={classes.root}>
      <Typography variant='h4' sx={{ mt: 4}}>{title}</Typography>
      <Typography sx={{ mt: 2, fontFamily: 'Noto Sans Medium', fontSize: '18px' }}>{desc}</Typography>
      <Grid container spacing={4} sx={{ mt: 4 }}>
        {recipes && recipes.map(repcipe => (
          <Grid item xs={12} md={6} lg={3} key={repcipe.title}>
            <RecipeItem recipe={repcipe}/>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}

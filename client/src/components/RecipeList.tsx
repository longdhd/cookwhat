import { Grid } from '@mui/material';
import * as React from 'react';
import { Recipe } from '../models';
import RecipeItem from './RecipeItem';

export interface RecipeListProps {
    recipeList: Recipe[]
}

export default function RecipeList({recipeList}: RecipeListProps) {
    return (
        <Grid container spacing={4} sx={{ mt: 2, pb: 4 }}>
            {recipeList && recipeList.map(
                (recipe, idx) =>
                    <Grid item xs={12} md={6} lg={4} xl={3} key={idx}>
                        <RecipeItem recipe={recipe} />
                    </Grid>)}
        </Grid>
    );
}

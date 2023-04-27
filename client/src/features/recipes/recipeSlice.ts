import type { PayloadAction } from '@reduxjs/toolkit'
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { Schema } from 'mongoose'
import recipeApi from '../../api/recipeApi'
import type { RootState } from '../../app/store'
import { Ingredient, ListParams, Recipe } from '../../models'

interface RecipeState {
    loading: boolean,
    isSearchingRecipesByIngredients: boolean,
    ingredientArr: Ingredient[],
    list: Recipe[],
    filter: ListParams,
    error: string
}

const initialState: RecipeState = {
    loading: false,
    isSearchingRecipesByIngredients: false,
    ingredientArr: [],
    list: [],
    filter: {
        _sort: "createAt",
        _order: 1
    },
    error: ""
}

export const getRecipes = createAsyncThunk('recipe/getRecipes',
    async (params: ListParams) => {
        const recipes = await recipeApi.getAll(params);
        return recipes;
    }
)

export const getRecipesByIngredients = createAsyncThunk('recipe/getRecipesByIngredients',
    async (ingredientArray: Ingredient[], thunkApi) => {
        thunkApi.dispatch(recipeActions.setIngredientArr(ingredientArray));
        const ingredientArr = ingredientArray.map(item => item._id);
        const recipes = await recipeApi.getRecipesByIngredients(ingredientArr);
        return recipes;
    }
)

const recipeSlice = createSlice({
    name: 'recipe',
    initialState,
    reducers: {
        setFilter(state, action: PayloadAction<ListParams>) {
            state.filter = action.payload;
        },
        setIngredientArr(state, action) {
            state.ingredientArr = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(getRecipes.pending, (state) => {
                state.loading = true;
                state.isSearchingRecipesByIngredients = false;
            })
            .addCase(getRecipes.fulfilled, (state: RecipeState, action) => {
                state.loading = false;
                state.list = action.payload;
            })
            .addCase(getRecipes.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || "";
            })
            .addCase(getRecipesByIngredients.fulfilled, (state: RecipeState, action) => {
                state.isSearchingRecipesByIngredients = true;
                state.list = action.payload;
            })
    }
})

export const recipeActions = recipeSlice.actions;

export const selectRecipeLoading = (state: RootState) => state.recipe.loading;
export const seletIsSearchingRecipesByIngredients = (state: RootState) => state.recipe.isSearchingRecipesByIngredients;
export const selectIngredientArray = (state: RootState) => state.recipe.ingredientArr;
export const selectRecipeList = (state: RootState) => state.recipe.list;
export const selectRecipeFilter = (state: RootState) => state.recipe.filter;

const recipeReducer = recipeSlice.reducer;
export default recipeReducer;
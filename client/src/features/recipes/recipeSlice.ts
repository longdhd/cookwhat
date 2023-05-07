import type { PayloadAction } from '@reduxjs/toolkit'
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { Schema } from 'mongoose'
import recipeApi from '../../api/recipeApi'
import type { RootState } from '../../app/store'
import { Ingredient, ListParams, Recipe } from '../../models'
import _ from 'lodash';
import { AppDispatch } from '../../app/store';

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
        _sort: "updatedAt",
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

const debounced = _.debounce((params, dispatch) => dispatch(recipeActions.setFilter(params)), 500);
export const debouncedSetFilter = (params: ListParams) => (dispatch: AppDispatch) => debounced(params, dispatch);

export const getRecipesByIngredients = createAsyncThunk<Recipe[], undefined, { state: RootState }>('recipe/getRecipesByIngredients',
    async (_, thunkApi) => {
        const state = thunkApi.getState();
        const ingredientArr: Schema.Types.ObjectId[] = state.recipe.ingredientArr.map(item => item._id);
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
            state.isSearchingRecipesByIngredients = true;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(getRecipes.pending, (state) => {
                state.loading = true;
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
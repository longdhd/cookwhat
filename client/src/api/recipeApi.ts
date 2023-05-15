import { Schema } from "mongoose";
import { ListParams, Recipe } from "../models";
import axiosClient from "./axiosClient";

const recipeApi = {
    getAll(params?: ListParams): Promise<Recipe[]> {
        const url = "/recipes";
        return axiosClient.get(url, { params });
    },

    getRecipebyId(recipeId: string): Promise<Recipe> {
        const url = `/recipes/${recipeId}`;
        return axiosClient.get(url);
    },

    getRecipesByIngredients(data: Schema.Types.ObjectId[]): Promise<Recipe[]> {
        const url = "/recipes/getRecipesByIngredients";
        return axiosClient.post(url, { ingredientsArr: data });
    }
}

export default recipeApi;
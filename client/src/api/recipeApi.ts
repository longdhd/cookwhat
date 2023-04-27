import { Schema } from "mongoose";
import { ListParams, Recipe } from "../models";
import axiosClient from "./axiosClient";

const recipeApi = {
    getAll(params?: ListParams): Promise<Recipe[]> {
        const url = "/recipes";
        return axiosClient.get(url, {params});
    },

    getRecipesByIngredients(data: Schema.Types.ObjectId[]):Promise<Recipe[]>{
        const url = "/recipes/getRecipesByIngredients";
        return axiosClient.post(url, {ingredientsArr : data});
    }
}

export default recipeApi;
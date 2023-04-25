import { ListResponse, Recipe } from "../models";
import axiosClient from "./axiosClient";

const recipeApi = {
    getAll(): Promise<Recipe[]> {
        const url = "/recipes";
        return axiosClient.get(url);
    }
}

export default recipeApi;
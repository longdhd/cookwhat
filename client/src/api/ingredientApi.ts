import { Ingredient, ListResponse } from "../models";
import axiosClient from "./axiosClient";

const ingredientApi = {
    getAll(): Promise<ListResponse<Ingredient>> {
        const url = "/ingredients";
        return axiosClient.get(url);
    }
}

export default ingredientApi;
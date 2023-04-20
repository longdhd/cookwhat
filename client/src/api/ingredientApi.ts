import { Ingredient } from "../models";
import axiosClient from "./axiosClient";

const ingredientApi = {
    getAll(): Promise<Ingredient[]> {
        const url = "/ingredients";
        return axiosClient.get(url);
    }
}

export default ingredientApi;
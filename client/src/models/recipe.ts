import { Ingredient } from ".";

export interface Recipe {
    title: string,
    img: string,
    ingredients: Ingredient[],
    desc: string,
    duration: number
}
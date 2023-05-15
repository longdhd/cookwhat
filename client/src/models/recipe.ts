import { Schema } from "mongoose";
import { Ingredient } from ".";

export interface Recipe {
    _id: Schema.Types.ObjectId,
    title: string,
    img: string,
    ingredients: Ingredient[],
    desc: string,
    duration: number,
    tags: string[]
}
import { Schema } from "mongoose";

export interface Ingredient {
    _id: Schema.Types.ObjectId,
    title: string,
    img: string,
}
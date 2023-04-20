import { InferSchemaType, model, Schema } from "mongoose";
import Ingredient from "./ingredient";

const recipeSchema = new Schema({
    title: { type: String, required: true },
    img: { type: String },
    ingredients: { type: Ingredient, required: true },
    desc: { type: String, required: true },
}, { timestamps: true })

type Recipe = InferSchemaType<typeof recipeSchema>;

export default model<Recipe>("Recipe", recipeSchema);
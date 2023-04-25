import { Document, InferSchemaType, model, Schema } from "mongoose";

export interface IIngredient {
    title: string,
    img: string
}

export interface IIngredientModel extends IIngredient, Document { }

const ingredientSchema = new Schema({
    title: { type: String, required: true },
    img: { type: String, required: true },
}, { timestamps: true })

type Ingredient = InferSchemaType<typeof ingredientSchema>;

export default model<Ingredient>("Ingredient", ingredientSchema);
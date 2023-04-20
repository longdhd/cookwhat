import { InferSchemaType, model, Schema } from "mongoose";

const ingredientSchema = new Schema({
    title: { type: String, required: true },
    img: { type: String, required: true },
}, { timestamps: true })

type Ingredient = InferSchemaType<typeof ingredientSchema>;

export default model<Ingredient>("Ingredient", ingredientSchema);
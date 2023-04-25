import { InferSchemaType, model, Schema } from "mongoose";

const recipeSchema = new Schema({
    title: { type: String, required: true },
    img: { type: String },
    ingredients: {type: [Schema.Types.ObjectId], required: true, ref: 'Ingredient'},
    desc: { type: String, required: true },
}, { timestamps: true })

type Recipe = InferSchemaType<typeof recipeSchema>;

export default model<Recipe>("Recipe", recipeSchema);
import { RequestHandler } from 'express';
import createHttpError from 'http-errors';
import mongoose, { Schema } from 'mongoose';
import RecipeModel from '../models/recipe';
interface Ingredient {
    _id: Schema.Types.ObjectId,
    title: string,
    img: string
}

export const getRecipes: RequestHandler = async (req, res, next) => {
    try {
        const { _page = 1, _limit = 10, _order = 1 } = req.query;
        const _sort =
            (req.query._sort && _order)
                ? Object.fromEntries([[req.query._sort, Number(_order)]])
                : { "createAt": 1 };

        console.log(_sort);

        const recipes = await RecipeModel
            .find()
            .populate('ingredients', 'title')
            .sort(_sort)
            .limit(Number(_limit) * 1)
            .skip((Number(_page) - 1) * Number(_limit))
            .exec();

        res.status(200).json(recipes);
    } catch (error) {
        next(error);
    }
}

export const getRecipesByIngredients: RequestHandler<unknown, any[], any[], unknown> = async (req, res, next) => {
    const ingredientsArr = req.body;

    try {
        if (!ingredientsArr) {
            throw createHttpError(400, "Request must have ingredients");
        }

        const recipes = await RecipeModel.find({ ingredients: { $in: ingredientsArr } }).populate('title').exec();

        res.status(200).json(recipes);
    } catch (error) {
        next(error);
    }
}

export const getRecipe: RequestHandler = async (req, res, next) => {
    const recipeId = req.params.recipeId;

    try {
        if (!mongoose.isValidObjectId(recipeId)) {
            throw createHttpError(400, "Invalid recipe id");
        }

        const recipe = await RecipeModel.findById(recipeId).populate("ingredients", "title img").exec();

        if (!recipe) {
            throw createHttpError(404, "Recipe not found");
        }

        res.status(200).json(recipe);
    } catch (error) {
        next(error);
    }
}

interface CreateRecipeBody {
    title?: string,
    img?: string,
    ingredients?: Ingredient[],
    desc?: string
}

export const createRecipe: RequestHandler<unknown, unknown, CreateRecipeBody, unknown> = async (req, res, next) => {
    const { title, img, ingredients, desc } = req.body;

    try {

        if (!title) {
            throw createHttpError(400, "Recipe must have a title");
        }

        if (!ingredients) {
            throw createHttpError(400, "Recipe must have ingredients");
        }

        if (!desc) {
            throw createHttpError(400, "Recipe must have desriptions");
        }

        const newRecipe = await RecipeModel.create({
            title: title,
            img: img,
            ingredients: ingredients,
            desc: desc
        });
        res.status(201).json(newRecipe);
    } catch (error) {
        next(error);
    }
}

// interface UpdateRecipeParams {
//     recipeId: string
// }

// interface UpdateRecipeBody {
//     title?: string,
//     img?: string,
//     ingredients?: Ingredient[],
//     desc?: string
// }

// export const updateRecipe: RequestHandler<UpdateRecipeParams, unknown, UpdateRecipeBody, unknown> = async (req, res, next) => {
//     const recipeId = req.params.recipeId;
//     const newTitle = req.body.title;
//     const newImg = req.body.img;
//     const newIngredients = req.body.ingredients;
//     const newDesc = req.body.desc;

//     try {
//         if (!mongoose.isValidObjectId(recipeId)) {
//             throw createHttpError(400, "Invalid note id");
//         }

//         if (!newTitle) {
//             throw createHttpError(400, "Recipe must have a title");
//         }

//         if (!newIngredients) {
//             throw createHttpError(400, "Recipe must have ingredients");
//         }

//         if (!newDesc) {
//             throw createHttpError(400, "Recipe must have a description");
//         }

//         const recipeToUpdate = await RecipeModel.findById(recipeId).exec();

//         if (!recipeToUpdate) {
//             throw createHttpError(404, "Recipe not found");
//         }

//         recipeToUpdate.title = newTitle;
//         recipeToUpdate.img = newImg;
//         recipeToUpdate.ingredients = newIngredients;
//         recipeToUpdate.desc = newDesc;

//         const updatedRecipe = recipeToUpdate.save();

//         res.status(200).json(updatedRecipe);

//     } catch (error) {
//         next(error);
//     }
// }
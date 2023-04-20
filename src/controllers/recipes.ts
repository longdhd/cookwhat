import { RequestHandler } from 'express';
import createHttpError from 'http-errors';
import mongoose from 'mongoose';
import RecipeModel from '../models/recipe';
import IngredientModel from '../models/ingredient';


export const getRecipes: RequestHandler = async (req, res, next) => {
    try {
        const recipes = await RecipeModel.find().exec();
        res.status(200).json(recipes);
    } catch (error) {
        next(error);
    }
}


interface GetRecipesByIngredientsBody {
    ingredientsArr?: Array<string>
}

export const getRecipesByIngredients: RequestHandler<unknown, any[], GetRecipesByIngredientsBody, unknown> = async (req, res, next) => {
    const ingredientsArr = req.body.ingredientsArr;

    try {
        if (!ingredientsArr) {
            throw createHttpError(400, "Request must have ingredients");
        }
        const allRecipes = await RecipeModel.find().exec();
        const availableRecipes: any[] = [];
        allRecipes.map(recipe => {
            let count = 0;

            //Count how many ingredients from recipe match user's ingredient
            for (let idx = 0; idx <= ingredientsArr.length; idx++) {
                if (recipe.ingredients.includes(ingredientsArr[idx])) {
                    count++;
                }
            }

            //If user's ingredients match the recipe's ingredient
            if (count >= (ingredientsArr.length / 2)) {
                availableRecipes.push(recipe);
            }
        })

        res.status(200).json(availableRecipes);
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

        const recipe = await RecipeModel.findById(recipeId).exec();

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
    ingredients?: string[],
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

interface UpdateRecipeParams {
    recipeId: string
}

interface UpdateRecipeBody {
    title?: string,
    img?: string,
    ingredients?: string[],
    desc?: string
}

export const updateRecipe: RequestHandler<UpdateRecipeParams, unknown, UpdateRecipeBody, unknown> = async (req, res, next) => {
    const recipeId = req.params.recipeId;
    const newTitle = req.body.title;
    const newImg = req.body.img;
    const newIngredients = req.body.ingredients;
    const newDesc = req.body.desc;

    try {
        if (!mongoose.isValidObjectId(recipeId)) {
            throw createHttpError(400, "Invalid note id");
        }

        if (!newTitle) {
            throw createHttpError(400, "Recipe must have a title");
        }

        if (!newIngredients) {
            throw createHttpError(400, "Recipe must have ingredients");
        }

        if (!newDesc) {
            throw createHttpError(400, "Recipe must have a description");
        }

        const recipeToUpdate = await RecipeModel.findById(recipeId).exec();

        if (!recipeToUpdate) {
            throw createHttpError(404, "Recipe not found");
        }

        recipeToUpdate.title = newTitle;
        recipeToUpdate.img = newImg;
        recipeToUpdate.ingredients = newIngredients;
        recipeToUpdate.desc = newDesc;

        const updatedRecipe = recipeToUpdate.save();

        res.status(200).json(updatedRecipe);

    } catch (error) {
        next(error);
    }
}
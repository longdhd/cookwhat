import { NextFunction, Request, RequestHandler, Response } from 'express';
import createHttpError from 'http-errors';
import mongoose, { Schema, Types } from 'mongoose';
import RecipeModel from '../models/recipe';
interface Ingredient {
    _id: Schema.Types.ObjectId,
    title: string,
    img: string
}

interface RequestQuery {
    _page: number,
    _limit: number,
    _sort: string,
    _order: 1 | -1,
    title_like: string,
    duration: {
        min: number,
        max: number
    }
}

export const getRecipes = async (req: Request<unknown, unknown, unknown, RequestQuery>, res: Response, next: NextFunction) => {
    try {
        const {
            _page = 1,
            _limit = 10,
            _sort = 'updatedAt',
            _order = 1,
            title_like = '',
            duration = {
                min: 0,
                max: 100
            }
        } = req.query;

        console.log(req.query.duration)

        const recipes = await RecipeModel
            .find({
                title: { $regex: title_like, $options: 'i' },
                duration: { $gte: duration.min, $lt: duration.max }
            })
            .collation({ locale: "vi@collation=traditional", strength: 1 })
            .populate('ingredients', 'title')
            .sort({[_sort]: _order})
            .limit(Number(_limit) * 1)
            .skip((Number(_page) - 1) * Number(_limit))
            .exec();

        res.status(200).json(recipes);
    } catch (error) {
        next(error);
    }
}

interface GetRecipesByIngredientsBody {
    ingredientsArr: Schema.Types.ObjectId[]
}

export const getRecipesByIngredients: RequestHandler<unknown, any[], GetRecipesByIngredientsBody, unknown> = async (req, res, next) => {
    const ingredientsArr = req.body.ingredientsArr;

    try {
        if (!ingredientsArr) {
            throw createHttpError(400, "Request must have ingredients");
        }

        const recipes = await RecipeModel.find({ ingredients: { $in: ingredientsArr } }).populate('ingredients', 'title').exec();

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
    desc?: string,
    duration?: number,
}

export const createRecipe: RequestHandler<unknown, unknown, CreateRecipeBody, unknown> = async (req, res, next) => {
    const { title, img, ingredients, desc, duration } = req.body;

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

        if (!duration) {
            throw createHttpError(400, "Recipe must have duration");
        }

        const newRecipe = await RecipeModel.create({
            title: title,
            img: img,
            ingredients: ingredients,
            desc: desc,
            duration: duration
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
    ingredients?: Types.ObjectId[],
    desc?: string,
    duration?: number
}

export const updateRecipe: RequestHandler<UpdateRecipeParams, unknown, UpdateRecipeBody, unknown> = async (req, res, next) => {
    const recipeId = req.params.recipeId.trim();
    const newTitle = req.body.title;
    const newImg = req.body.img;
    const newIngredients = req.body.ingredients;
    const newDesc = req.body.desc;
    const newDuration = req.body.duration;

    console.log("newIngredients", newIngredients)

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

        if (!newDuration) {
            throw createHttpError(400, "Recipe must have a duration");
        }

        const recipeToUpdate = await RecipeModel.findById(recipeId).exec();

        if (!recipeToUpdate) {
            throw createHttpError(404, "Recipe not found");
        }

        recipeToUpdate.title = newTitle;
        recipeToUpdate.img = newImg;
        recipeToUpdate.ingredients = newIngredients;
        recipeToUpdate.desc = newDesc;
        recipeToUpdate.duration = newDuration;

        const updatedRecipe = recipeToUpdate.save();

        res.status(200).json(updatedRecipe);

    } catch (error) {
        next(error);
    }
}
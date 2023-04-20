import { RequestHandler } from 'express';
import createHttpError from 'http-errors';
import mongoose from 'mongoose';
import IngredientModel from '../models/ingredient'

export const getIngredients: RequestHandler = async (req, res, next) => {
    try {
        const ingredients = await IngredientModel.find().exec();
        res.status(200).json(ingredients);
    } catch (error) {
        next(error);
    }
}

export const getIngredient: RequestHandler = async (req, res, next) => {
    const ingredientId = req.params.ingredientId;

    try {
        if (!mongoose.isValidObjectId(ingredientId)) {
            throw createHttpError(400, "Invalid ingredient id");
        }

        const ingredient = await IngredientModel.findById(ingredientId).exec();

        if (!ingredient) {
            throw createHttpError(404, "Ingredient not found");
        }

        res.status(200).json(ingredient);
    } catch (error) {
        next(error);
    }
}

interface CreateIngredientBody {
    title?: string,
    img?: string
}

export const createIngredient: RequestHandler<unknown, unknown, CreateIngredientBody, unknown> = async (req, res, next) => {
    const { title, img } = req.body;

    try {

        if (!title) {
            throw createHttpError(400, "Ingredient must have a title");
        }

        const newIngredient = await IngredientModel.create({
            title: title,
            img: img
        });
        res.status(201).json(newIngredient);
    } catch (error) {
        next(error);
    }
}
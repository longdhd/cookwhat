import { RequestHandler } from 'express';
import createHttpError from 'http-errors';
import mongoose from 'mongoose';
import IngredientModel from '../models/ingredient'

export const getIngredients: RequestHandler = async (req, res, next) => {
    try {
        // const { _page = 1, _limit = 10 } = req.query;

        const ingredients = await IngredientModel.find({ ...req.query })
            .sort({ "title": 1 })
            // .limit(Number(_limit) * 1)
            // .skip((Number(_page) - 1) * Number(_limit))
            .exec();

        const count = await IngredientModel.countDocuments();

        res.status(200).json({
            data: ingredients,
            // totalPages: Math.ceil(count / Number(_limit)),
            // currentPage: _page,
        });
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
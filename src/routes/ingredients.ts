import express from "express";
import * as IngredientController from "../controllers/ingredients";

const router = express.Router();

router.get("/", IngredientController.getIngredients);

router.get("/:ingredientId", IngredientController.getIngredient);

router.post("/", IngredientController.createIngredient);

export default router;
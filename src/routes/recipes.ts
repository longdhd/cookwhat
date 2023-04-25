import express from "express";
import * as RecipeController from "../controllers/recipes";

const router = express.Router();

router.get("/", RecipeController.getRecipes);

router.get("/:recipeId", RecipeController.getRecipe);

router.post("/", RecipeController.createRecipe);

router.post("/getRecipesByIngredients", RecipeController.getRecipesByIngredients);

// router.patch("/:recipeId", RecipeController.updateRecipe);

export default router;
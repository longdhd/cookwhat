import "dotenv/config";
import express, { NextFunction, Request, Response } from "express";
import createHttpError, { isHttpError } from "http-errors";
import morgan from "morgan";
import ingredientRouter from "./routes/ingredients";
import recipeRouter from "./routes/recipes";


const app = express();

app.use(morgan("dev"));

app.use(express.json());

app.use("/api/ingredients", ingredientRouter);

app.use("/api/recipes", recipeRouter);


app.use((req, res, next) => {
    next(createHttpError(404, "Endpoint not found"));
})

// eslint-disable-next-line @typescript-eslint/no-unused-vars
app.use((error: unknown, req: Request, res: Response, next: NextFunction) => {
    console.error(error)
    let errorMessage = 'An unknown error occurred!';
    let statusCode = 500;
    if (isHttpError(error)) {
        statusCode = error.status;
        errorMessage = error.message;
    }
    res.status(statusCode).json({ error: errorMessage });
})

export default app;
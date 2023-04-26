import { Box } from "@mui/material";
import { createStyles, makeStyles } from "@mui/styles";
import { Schema } from "mongoose";
import { useEffect, useState } from "react";
import ingredientApi from "../api/ingredientApi";
import { useAppDispatch } from "../app/hook";
import LoadingLottie from "../components/LoadingLottie";
import SearchBar from '../components/SearchBar';
import { getRecipesByIngredients } from "../features/recipes/recipeReducer";
import { Ingredient } from "../models";

const useStyles = makeStyles(() => (
    createStyles({
        home: {
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '600px',
            width: '100%',
            textAlign: 'center',
        },
        background: {
            height: '100vh',
            width: '100%',
            position: 'absolute',
            background: 'url("./images/background.jpg")',
            top: 0,
            left: 0,
            zIndex: -1,
            filter: 'blur(10px)'
        }
    })
))

export default function HomePage() {
    const [searchOptions, setSearchOptions] = useState<Ingredient[]>([]);
    const classes = useStyles();
    const dispatch = useAppDispatch();

    useEffect(() => {
        const fetchData = async () => {
            const { data } = await ingredientApi.getAll();
            setSearchOptions(data);
        };

        fetchData();
    }, [])

    const handleSearch = (ingredientArr: Schema.Types.ObjectId[]) => {
        dispatch(getRecipesByIngredients(ingredientArr));
    }

    return (
        <>
            {searchOptions.length > 0 ?
                <>
                    <Box className={classes.home}>
                        <SearchBar searchOptions={searchOptions} onSearch={handleSearch}/>
                    </Box>
                    <Box className={classes.background}></Box>
                </>
                : <LoadingLottie />
            }
            )
        </>
    );
}

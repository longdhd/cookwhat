import { keyframes } from '@emotion/react';
import ExpandCircleDownIcon from '@mui/icons-material/ExpandCircleDown';
import { Box, styled } from "@mui/material";
import { createStyles, makeStyles } from "@mui/styles";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ingredientApi from "../api/ingredientApi";
import { useAppDispatch } from "../app/hook";
import LoadingLottie from "../components/LoadingLottie";
import SearchBar from '../components/SearchBar';
import { getRecipesByIngredients } from "../features/recipes/recipeSlice";
import { Ingredient } from "../models";

const bounce = keyframes`
    0% {
   top: 87%;
  }

  10% {
   top: 87.5%;
  }

  40% {
   top: 89.5%;
  }

  50% {
   top: 90%;
  }

  60% {
   top: 89.5%;
  }

  90% {
   top: 87.5%;
  }

  100% {
   top: 87%;
  }
`;

const useStyles = makeStyles(() => (
    createStyles({
        searchBarContainer: {
            height: '640px',
            position: 'relative'
        },
        searchBar: {
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100%',
            width: '100%',
            textAlign: 'center',
        },
        banner: {
            height: '100%',
            width: '100%',
            position: 'absolute',
            background: 'url("./images/background.jpg")',
            backgroundSize: 'cover',
            top: 0,
            left: 0,
            zIndex: -1,
            filter: 'blur(16px)'
        },
        scrollDown: {
            position: 'absolute',
            left: '50%',
            top: '90%',
            color: '#fff',
            animation: `${bounce} 1.4s infinite ease`
        }
    })
))

const BounceBox = styled("div")({
    animation: `${bounce} 1.4s infinite ease`
});

export default function HomePage() {
    const [searchOptions, setSearchOptions] = useState<Ingredient[]>([]);
    const dispatch = useAppDispatch();
    const classes = useStyles();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            const { data } = await ingredientApi.getAll();
            setSearchOptions(data);
        };

        fetchData();
    }, [])

    const handleSearch = async (ingredientArr: Ingredient[]) => {
        await dispatch(getRecipesByIngredients(ingredientArr));
        // navigate("/recipes?getRecipesByIngredients")
    }

    return (
        <>
            {searchOptions.length > 0 ?
                <Box className={classes.searchBarContainer}>
                    <Box className={classes.searchBar}>
                        <SearchBar searchOptions={searchOptions} onSearch={handleSearch} />
                    </Box>
                    <Box className={classes.banner}></Box>
                    <BounceBox className={classes.scrollDown}>
                        <ExpandCircleDownIcon
                            fontSize="large"
                        />
                    </BounceBox>
                </Box>
                : <LoadingLottie />
            }
        </>
    );
}

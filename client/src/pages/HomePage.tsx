import { Box } from "@mui/material";
import { createStyles, makeStyles } from "@mui/styles";
import { useEffect, useState } from "react";
import ingredientApi from "../api/ingredientApi";
import LoadingLottie from "../components/LoadingLottie";
import SearchBar from '../components/SearchBar';
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

    useEffect(() => {
        const fetchData = async () => {
            const { data } = await ingredientApi.getAll();
            setSearchOptions(data);
        };

        fetchData();
    }, [])
    return (
        <>
            {searchOptions.length > 0 ?
                <>
                    <Box className={classes.home}>
                        <SearchBar searchOptions={searchOptions} />
                    </Box>
                    <Box className={classes.background}></Box>
                </>
                : <LoadingLottie />
            }
            )
        </>
    );
}

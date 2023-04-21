import { Box } from "@mui/material";
import { createStyles, makeStyles } from "@mui/styles";
import { useEffect, useState } from "react";
import ingredientApi from "../api/ingredientApi";
import SearchBar from '../components/SearchBar'
import { Ingredient } from "../models";

const useStyles = makeStyles(() => (
    createStyles({
        home: {
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height:'600px',
            width:'100%',
            textAlign:'center'
        }
    })
))

export default function HomePage() {
    const [searchOptions, setSearchOptions] = useState<Array<Ingredient>>([]);

    useEffect(() => {
        let isApiSubsried = true;
        const fetchData = async () => {
            const response = await ingredientApi.getAll();
            setSearchOptions(response);
        };

        if (isApiSubsried) fetchData();

        return () => {
            isApiSubsried = false;
        }
    }, [])
    const classes = useStyles();
    return (
        <Box className={classes.home}>
            {searchOptions.length > 0 && <SearchBar searchOptions={searchOptions} />}
        </Box>
    );
}

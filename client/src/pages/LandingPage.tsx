import { Box, Button, Typography } from '@mui/material';
import { createStyles, makeStyles } from '@mui/styles';
import { useEffect, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import ingredientApi from '../api/ingredientApi';
import logo from '../assets/images/logo.png'
import SearchBar from '../components/SearchBar';
import { Ingredient } from '../models';
import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt';
import { Theme } from '@mui/system';
import { useAppDispatch } from '../app/hook';
import { recipeActions } from '../features/recipes/recipeSlice';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            position: 'relative',
            height: '100vh',
            width: '100%',
            background: 'url("./images/background.png")',
            backgroundSize: 'cover',
            [theme.breakpoints.down('sm')]: {
                backgroundPosition: '40% 0%',
            },
            backgroundRepeat: 'no-repeat',
            overflow: 'auto',
            '&:after':
            {
                content: "",
                display: 'table',
                clear: 'both'
            }
        },
        column: {
            width: '50%',
            [theme.breakpoints.down('md')]: {
                width: '75%'
            },
            float: 'left',
            height: '100%'
        },
        container: {
            display: 'grid',
            gridTemplateRows: '1fr 2fr 2fr',
            gap: '2%',
            height: '100%',
            padding: '12px 24px',
            [theme.breakpoints.down('md')]: {
                padding: '6px 0px',
                gap: '16px'
            },
        },
        logoContainer: {
            display: 'flex',
            alignItems: 'center',
            letterSpacing: '4px',
        },
        logo: {
            height: '160px',
            [theme.breakpoints.up('md')]: {
                height: '200px',
            },
        }
        ,
        intro: {
            paddingLeft: '48px',
            paddingRight: '24px',
            [theme.breakpoints.down('md')]: {
                paddingLeft: '24px',
            },
            color: '#fff',
        }
    })
)
export default function LandingPage() {
    const classes = useStyles();
    const [searchOptions, setSearchOptions] = useState<Ingredient[]>([]);
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            const { data } = await ingredientApi.getAll();
            setSearchOptions(data);
        };

        fetchData();
    }, [])

    const handleSearch = async (ingredientArr: Ingredient[]) => {
        await dispatch(recipeActions.setIngredientArr(ingredientArr));
        navigate("/recipes");
    }

    return (
        <Box className={classes.root}>
            <Box className={classes.column}>
                <Box className={classes.container}>
                    <Box className={classes.logoContainer}>
                        <img className={classes.logo} src={logo} alt='logo'></img>
                    </Box>

                    <Box className={classes.intro}>
                        <Typography variant='h4' sx={{
                            lineHeight: '48px',
                            textTransform: 'uppercase',
                            letterSpacing: '8px',
                            fontSize: {
                                xs: 18,
                                md: 32
                            }
                        }}>Chop, Chop, Chew</Typography>
                        <Typography sx={{
                            textAlign: 'justify',
                            lineHeight: '40px',
                            color: '#C5CAD0',
                            mt: {
                                xs: 0,
                                md: 2
                            },
                            fontSize: {
                                xs: 14,
                                md: 18
                            },
                            fontFamily: 'Noto Sans Medium'
                        }}>Welcome to our cooking recipe website, where cooking is not just a task, but a ninja adventure! Our easy-to-follow recipes will have you slicing and dicing like a true culinary ninja. Our team of ninja chefs will guide you through every step, from chopping to plating. So, get ready to unleash your inner ninja and cook up a storm!</Typography>
                    </Box>

                    <Box sx={{
                        paddingLeft: {
                            xs: '24px',
                            md: '48px'
                        }
                    }}>
                        <SearchBar searchOptions={searchOptions} onSearch={handleSearch} />
                        <NavLink to='/recipes' style={{ color: '#83200D', fontSize: '24px', textDecoration: 'none' }}>
                            <Typography variant="h5" sx={{
                                mt: 4, display: 'flex', alignItems: 'center', fontSize: {
                                    xs: 18,
                                    md: '1.5rem',
                                    letterSpacing: 2
                                }
                            }}>Roam Through Recipe Land<ArrowRightAltIcon fontSize='large' /></Typography>
                        </NavLink>
                        <NavLink to='/recipes' style={{ color: '#83200D', fontSize: '24px', textDecoration: 'none' }}>
                            <Typography variant="h5" sx={{
                                mt: 2, display: 'flex', alignItems: 'center', fontSize: {
                                    xs: 18,
                                    md: '1.5rem',
                                    letterSpacing: 2
                                }
                            }}>Explore AI Chef's Choice <ArrowRightAltIcon fontSize='large' /></Typography>
                        </NavLink>
                    </Box>
                </Box>
            </Box>
        </Box>
    );
}

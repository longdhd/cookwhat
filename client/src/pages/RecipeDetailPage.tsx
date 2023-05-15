import { Box, Typography } from '@mui/material';
import { makeStyles, createStyles } from '@mui/styles';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import recipeApi from '../api/recipeApi';
import { Recipe } from '../models';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import SoupKitchenIcon from '@mui/icons-material/SoupKitchen';

const useStyles = makeStyles(() => (
    createStyles({
        root: {
            display: 'block',
            position: 'relative',
            height: '100%',
            width: '100%',
            minHeight: '100vh',
        },
        main: {
            background: '#1a1618',
            color: '#f4f3e6',
            padding: '36px',
            overflow: 'auto',
            marginRight: '50%',
            '& > h6': {
                position: 'relative',
                '&::after': {
                    content: "''",
                    position: 'absolute',
                    background: '#f4f3e6',
                    width: '44%',
                    height: '1px',
                    top: '40px',
                    left: 0
                }
            }
        },
        side: {
            width: '50%',
            height:'100vh',
            display:'grid',
            gridTemplateRows:'1fr 1fr',
            position:'fixed',
            top:0,
            right:0
        },
        image: {
            height:'100%'
        },
        intro: {
            background: '#f4f3e6',
            padding: '24px',
            height:'100%'
        }
    })
))

export default function RecipeDetailPage() {
    const classes = useStyles();
    const { recipeId } = useParams();
    const [recipe, setRecipe] = useState<Recipe>()
    useEffect(() => {
        const fetchData = async () => {
            const result = await recipeApi.getRecipebyId(recipeId as string);
            setRecipe(result);
        }

        fetchData();
    }, [])
    return (
        <Box className={classes.root}>
            <Box className={classes.main}>
                <Typography variant='h6' mt={1} sx={{ textTransform: 'capitalize' }}>
                    Preparation
                </Typography>
                <p style={{ marginTop: 28, fontFamily: 'Noto Sans Medium', textAlign: 'justify' }}>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris ut efficitur libero. Fusce vitae eros a justo ullamcorper tincidunt. Nulla eu neque lacus. Sed ut enim quam. Duis molestie volutpat tempor. Vivamus eget tellus sit amet ipsum porttitor viverra id sit amet est. Sed ac porta enim. Aliquam cursus lectus non lacus pellentesque, non bibendum dolor pellentesque. Sed finibus aliquam augue non sagittis. Cras eleifend odio non lacus tristique hendrerit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec pellentesque nibh vitae lacus vestibulum mollis. Nam sodales orci sem, ut hendrerit metus placerat at. Nulla sit amet scelerisque tortor. Mauris.
                </p>

                <Typography variant='h6' mt={4} sx={{ textTransform: 'capitalize' }}>
                    Cooking
                </Typography>
                <p style={{ marginTop: 28, fontFamily: 'Noto Sans Medium', textAlign: 'justify' }}>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque vulputate enim nibh, at commodo tellus feugiat at. Suspendisse luctus scelerisque libero a scelerisque. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla eu orci ornare nunc varius egestas. Praesent at libero et diam congue blandit in ac nisi. Vivamus sit amet sapien et ex egestas tempor sed vitae purus. Aliquam erat volutpat. Sed ullamcorper ipsum tellus, quis varius enim commodo vulputate. Mauris diam felis, varius tincidunt molestie vitae, euismod in tortor. Curabitur laoreet finibus purus et luctus. Pellentesque aliquam sed velit sed commodo. Suspendisse molestie, ex non pharetra finibus, nibh massa sagittis ligula, eget gravida urna lorem ut odio. Duis ac venenatis sem. Pellentesque ante dolor, tristique sit amet venenatis quis, molestie at dui. Nulla purus odio, consequat sed aliquam ornare, fermentum ac massa. Donec vel laoreet sapien.

                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent dignissim eros vulputate purus sagittis, vitae porta nibh tincidunt. Aenean eu porttitor eros, sed ornare arcu. Sed gravida vehicula pellentesque. Aliquam porttitor nisl diam, a facilisis enim auctor a. Pellentesque volutpat sit amet urna quis blandit. Curabitur et tincidunt augue. Nam sapien eros, lacinia a vestibulum nec, fermentum id tellus. Maecenas maximus sollicitudin eros, et interdum turpis. Pellentesque velit arcu, aliquet in blandit ac, faucibus id enim. Vivamus congue lacus eu ante tempor aliquet. Vestibulum eu dolor eget nibh tempor rutrum in ut eros. Donec lobortis felis nec dolor ultrices posuere sit amet vitae quam. Donec id cursus sapien. Vivamus vel porta augue.

                    Proin vitae lobortis elit. Morbi ut ex condimentum, porta orci a, pulvinar nibh. Nam vulputate velit eu sapien hendrerit accumsan eget vel lorem. Vivamus risus nibh, varius egestas volutpat quis, euismod elementum erat. Nullam tempus malesuada lacus, quis porta enim imperdiet consequat. Donec sed posuere massa. Suspendisse quis orci in tortor fermentum fringilla. Nulla pulvinar pharetra lorem, eget mollis mauris.

                    Curabitur venenatis egestas ex eu condimentum. Proin nisi orci, pellentesque suscipit malesuada ut, lacinia nec nibh. Sed sagittis molestie urna. Nullam at condimentum neque, nec sagittis mi. In sit amet ornare sapien. In leo nulla, sagittis eget tincidunt at, venenatis eu ipsum. In sem arcu, imperdiet a mi nec, elementum rutrum eros. Vivamus eget neque ultrices, ultrices lacus non, aliquet nunc. Quisque a sem risus. Cras blandit viverra fermentum. Maecenas convallis gravida diam. Integer suscipit sagittis lorem, quis semper mauris aliquet non. Quisque vehicula urna egestas, fringilla lorem ac, porttitor est. Integer tempus urna tellus, sed pellentesque mi accumsan nec. Etiam a felis mi. Nullam sodales, sem sed pharetra rhoncus, arcu lorem egestas mi, id luctus dui est eu est.

                    Etiam imperdiet nisl quis nulla gravida, scelerisque iaculis urna pulvinar. Duis bibendum accumsan erat. Fusce et tincidunt eros. Nunc dictum massa mi, a gravida sapien euismod id. Integer vestibulum, quam ac laoreet ornare, odio nisl cursus urna, sed vulputate justo lectus eu nibh. Maecenas placerat ipsum non tincidunt commodo. Nunc luctus rutrum ante, sed volutpat erat mattis nec.
                </p>

                <Typography variant='h6' mt={4} sx={{ textTransform: 'capitalize' }}>
                    Tips
                </Typography>
                <p style={{ marginTop: 28, fontFamily: 'Noto Sans Medium', textAlign: 'justify' }}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris ut efficitur libero. Fusce vitae eros a justo ullamcorper tincidunt. Nulla eu neque lacus. Sed ut enim quam. Duis molestie volutpat tempor. Vivamus eget tellus sit amet ipsum porttitor viverra id sit amet est. Sed ac porta enim. Aliquam cursus lectus non lacus pellentesque, non bibendum dolor pellentesque. Sed finibus aliquam augue non sagittis. Cras eleifend odio non lacus tristique hendrerit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec pellentesque nibh vitae lacus vestibulum mollis. Nam sodales orci sem, ut hendrerit metus placerat at. Nulla sit amet scelerisque tortor. Mauris.
                </p>
            </Box>
            <Box className={classes.side}>
                <Box className={classes.image} sx={{
                    background: `url(${recipe?.img})`,
                    backgroundPosition: '50% 50%',
                    backgroundSize: 'cover'
                }}></Box>
                <Box className={classes.intro}>
                    <Typography variant='h4' sx={{ color: '#950f16', textTransform: 'capitalize', fontFamily: 'Noto Sans Medium' }}>
                        {recipe?.title}
                    </Typography>
                    <Typography mt={1} variant='subtitle1' sx={{
                        fontFamily: 'Noto Sans Medium',
                        display: 'flex',
                        alignItems: 'center'
                    }}><AccessTimeIcon fontSize='small' />&nbsp;&nbsp;{recipe?.duration} mins</Typography>
                    <Typography variant='subtitle1' sx={{
                        fontFamily: 'Noto Sans Medium',
                        display: 'flex',
                        alignItems: 'center'
                    }}><SoupKitchenIcon fontSize='small' />&nbsp;&nbsp;Easy</Typography>

                    <Typography variant='h6' mt={1} sx={{ color: '#950f16', textTransform: 'capitalize', fontFamily: 'Noto Sans Medium' }}>
                        Ingredients
                    </Typography>
                    <ul style={{
                        paddingInlineStart: '24px',
                        marginBlockStart: '4px',
                        fontFamily: 'Noto Sans Medium'
                    }}>
                        {recipe?.ingredients.map(ing => (
                            <li>{ing.title}</li>
                        ))}
                    </ul>
                </Box>
            </Box>
        </Box>
    );
}

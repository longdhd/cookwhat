import AccessTimeOutlinedIcon from '@mui/icons-material/AccessTimeOutlined';
import LabelOutlinedIcon from '@mui/icons-material/LabelOutlined';
import { Box } from '@mui/material';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { createStyles, makeStyles } from '@mui/styles';
import { Recipe } from '../models';
export interface RecipeItemProps {
    recipe: Recipe
}

const useStyles = makeStyles(() => (
    createStyles({
        card: {
            maxWidth: 345,
            boxShadow: 'none !important',
            borderRadius: '8px !important'
        },
        cardContent: {
            padding: '16px 8px !important',

        },
        cardImg: {
            position: 'relative',
            width: 'inherit',
            overflow: 'hidden',
            cursor: 'pointer',

            '&:hover': {
                '& > div': {
                    transform: 'translateY(-75%)'
                },
                '&:after': {
                    transform: 'translateY(-75%)'
                }
            },
            '&:after': {
                width: 'inherit',
                height: '100%',
                position: 'absolute',
                background: 'linear-gradient(to bottom, rgba(0,0,0,0), rgba(0,0,0,0.9))',
                content: "''",
                left: 0,
                right: 0,
                bottom: '-100%',
                transition: 'all 0.8s ease-in-out',
            }
        },
        cardImgHoverText: {
            position: 'absolute',
            width: '100%',
            height: '100%',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            bottom: '-100%',
            zIndex: 1,
            transition: 'all 0.8s ease-in-out',
        },
        button: {
            background: '#f32326 !important',
            height: '100%',
            outline: '1px solid #bb232d',
        }
    })
))

export default function RecipeItem({ recipe }: RecipeItemProps) {
    const classes = useStyles();
    return (
        <Card className={classes.card}>
            <CardMedia
                sx={{ height: 240 }}
                image={recipe.img}
                className={classes.cardImg}
            >
                <Box className={classes.cardImgHoverText}>
                    <Typography variant='subtitle1' sx={{ color: '#fff', fontFamily: 'Noto Sans Medium' }}>
                        {recipe.ingredients.map(item => (
                            <span key={item.title}>{item.title},&nbsp;</span>
                        ))}
                    </Typography>
                </Box>
            </CardMedia>
            <CardContent className={classes.cardContent}>
                <Box sx={{ display: 'grid', gridTemplateRows: 'auto 1fr', gridTemplateColumns: '3fr 1fr', gridTemplateAreas: `"title title" "content button"`, fontFamily: 'Noto Sans Medium' }}>
                    <Typography gutterBottom variant="h5" component="div" noWrap sx={{ textTransform: 'capitalize', gridArea: 'title', fontFamily: 'Noto Sans Medium' }}>
                        {recipe.title}
                    </Typography>
                    <Box sx={{ gridArea: 'button' }}>
                        <Button size="small" className={classes.button} variant='contained'>Explore</Button>
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'flex-start', flexDirection: 'column', gridArea: 'content', gap: 1 }}>
                        <Box sx={{ display: 'flex', alignItems: 'center' }}><AccessTimeOutlinedIcon sx={{ fill: '#000' }} />&nbsp;&nbsp;{recipe.duration} mins</Box>
                        <Box sx={{ display: 'flex', alignItems: 'center' }}><LabelOutlinedIcon sx={{ fill: '#000' }} />&nbsp;&nbsp;Breakfast</Box>
                    </Box>
                </Box>
            </CardContent>
        </Card>
    );
}

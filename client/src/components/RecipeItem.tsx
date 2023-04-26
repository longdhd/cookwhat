import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Recipe } from '../models';

export interface RecipeItemProps {
    recipe: Recipe
}

export default function RecipeItem({ recipe }: RecipeItemProps) {
    return (
        <Card sx={{ maxWidth: 345 }}>
            <CardMedia
                sx={{ height: 140 }}
                image={recipe.img}
                title={recipe.title}
            />
            <CardContent>
                <Typography gutterBottom variant="h6" component="div" noWrap sx={{ textTransform: 'capitalize' }}>
                    {recipe.title}
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ fontFamily: 'Noto Sans Medium', overflow: "hidden", textOverflow: 'ellipsis', WebkitLineClamp: 3, display: '-webkit-box', WebkitBoxOrient: 'vertical' }}>
                    {recipe.desc}
                </Typography>
            </CardContent>
            <CardActions>
                <Button size="small">Share</Button>
                <Button size="small">Learn More</Button>
            </CardActions>
        </Card>
    );
}

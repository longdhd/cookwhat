import { Box } from '@mui/material';
import { createStyles, makeStyles } from '@mui/styles';
import RecipesPage from '../../pages/RecipesPage';
import Header from '../Header';
import Sidebar from '../Sidebar';

const useStyles = makeStyles(() => (
    createStyles({
        root: {
            height: '100%',
            width: '100%',
            position: 'relative',
            overflow: 'auto',
            display: 'grid',
            gridTemplateRows: 'auto 1fr',
            gridTemplateColumns: '360px 1fr',
            gridTemplateAreas: `"header header" "sidebar main"`,
            minHeight: '100vh',
            background:'#2C2D30'
        },
        header: {
            gridArea:'header'   
        },
        main: {
            gridArea: 'main',
            borderTopLeftRadius:'16px',
            background:'#E1E1E3'
        },
        sidebarContainer: {
            gridArea:'sidebar',
            background:'#E1E1E3',
        },
        sidebar: {
            borderBottomRightRadius:'16px',
            background:'#2C2D30',
            height:'100%',
        }
    })
))

export default function RecipeLayout() {
    const classes = useStyles();
    return (
        <Box className={classes.root}>
            <Box className={classes.header}>
                <Header />
            </Box>
            <Box className={classes.main}>
                <RecipesPage />
            </Box>
            <Box className={classes.sidebarContainer}>
                <Box className={classes.sidebar}>
                    <Sidebar />
                </Box>
            </Box>
        </Box>
    );
}

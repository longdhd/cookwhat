import { Box } from '@mui/material';
import { createStyles, makeStyles } from '@mui/styles';
import RecipesPage from '../../pages/RecipesPage';
import Header from '../Header';
import Sidebar from '../Sidebar';
import { Theme } from '@mui/system';


const useStyles = makeStyles((theme: Theme) => (
    createStyles({
        root: {
            height: '100%',
            width: '100%',
            position: 'relative',
            overflow: 'hidden',
            display: 'grid',
            gridTemplateRows: 'auto 1fr',
            gridTemplateColumns: '360px 1fr',
            gridTemplateAreas: `"header header" "sidebar main"`,
            minHeight: '100vh',
            background: '#1a1618',
            [theme.breakpoints.down('sm')]: {
                gridTemplateColumns: '0px 1fr',
            }
        },
        header: {
            gridArea: 'header'
        },
        main: {
            gridArea: 'main',
            borderTopLeftRadius: '16px',
            background: '#f4f3e6',
            height: '100%',
            overflow: 'auto'
        },
        sidebarContainer: {
            gridArea: 'sidebar',
            background: '#f4f3e6',
            [theme.breakpoints.down('sm')]: {
                display: 'none',
            }
        },
        sidebar: {
            borderBottomRightRadius: '16px',
            background: '#1a1618',
            height: '100%',
        }
    })
))

export default function RecipeLayout() {
    const classes = useStyles();
    return (
        <Box className={classes.root}>
            <Box className={classes.header} component="header">
                <Header />
            </Box>
            <Box className={classes.main} component="main">
                <RecipesPage />
            </Box>
            <Box className={classes.sidebarContainer} component="nav">
                <Box className={classes.sidebar}>
                    <Sidebar />
                </Box>
            </Box>
        </Box>
    );
}

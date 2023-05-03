import { Box, Typography } from '@mui/material';
import { createStyles, makeStyles } from '@mui/styles';
import logo from '../assets/images/logo.png';

const useStyles = makeStyles(() => (
    createStyles({
        headerContainer: {
            display: 'inline-flex',
            height: '160px',
            width: '100%',
            background: '#2C2D30',
            padding: '0 24px',
            flexFlow:'row nowrap',
            alignItems:'center',
            '& > *':{
                flexGrow: 1,
                color:'#fff',
                letterSpacing: 2
            }
        },
        logo: {
            background:`url(${logo})`,
            backgroundSize:'cover',
            backgroundRepeat:'no-repeat',
            backgroundPositionY:'45%',
            height:'100%',
        }
    })
))
export default function Header() {
    const classes = useStyles();
    return (
        <Box className={classes.headerContainer}>
            <Typography variant='h4' align='left'>COOKING NINJA</Typography>
            <Box className={classes.logo}></Box>
            <Typography variant='h4' align='right'>CHOP, CHOP, CHEW</Typography>
        </Box>
    );
}

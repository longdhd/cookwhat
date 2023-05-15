import { Box, Typography } from '@mui/material';
import { createStyles, makeStyles } from '@mui/styles';
import { Theme } from '@mui/system';
import logo from '../assets/images/logo.webp';

const useStyles = makeStyles((theme: Theme) => (
    createStyles({
        headerContainer: {
            display: 'inline-flex',
            height: '160px',
            width: '100%',
            background: '#1a1618',
            padding: '0 24px',
            flexFlow:'row nowrap',
            alignItems:'center',
            '& > *':{
                flexGrow: 1,
                color:'#fff',
                letterSpacing: 2
            },
            [theme.breakpoints.down('lg')]: {
                '& > *:not(:nth-child(2n))':{
                    display:'none'
                }
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

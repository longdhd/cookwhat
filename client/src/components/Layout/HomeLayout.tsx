import { Box } from '@mui/material';
import { makeStyles, createStyles } from '@mui/styles';
import * as React from 'react';
import { Outlet } from 'react-router-dom';
import Header from '../Header';

export interface HomeLayoutProps {
}

const useStyles = makeStyles(() => (
    createStyles({
        root: {
            position:'relative',
            height:'100vh'
        },
        header: {},
        main: {
            height:'100%',
            width:'100%',
            position:'relative',
        },
        footer: {},
        background: {
            height: '100vh',
            width: '100%',
            position:'absolute',
            background:'url("./images/background.jpg")',
            top: 0,
            left: 0,
            zIndex:-1,
            filter:'blur(10px)'
        }
    })
))

export default function HomeLayout(props: HomeLayoutProps) {
    const classes = useStyles();
    return (
        <Box sx={{
            height: '100%',
            width: '100%',
            position:'relative',
            overflowY:'hidden'
        }}>
            <Box className={classes.root}>
                <Box className={classes.header}>
                    <Header />
                </Box>
                <Box className={classes.main}>
                    <Outlet />
                </Box>
                <Box className={classes.footer}></Box>
            </Box>
            <Box className={classes.background}></Box>
        </Box>
    );
}

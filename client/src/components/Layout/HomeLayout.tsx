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
        
    })
))

export default function HomeLayout(props: HomeLayoutProps) {
    const classes = useStyles();
    return (
        <Box sx={{
            height: '100%',
            width: '100%',
            position:'relative',
            overflowX:'hidden'
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
        </Box>
    );
}

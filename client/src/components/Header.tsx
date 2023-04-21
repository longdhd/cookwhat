import { Box, Menu, MenuItem } from '@mui/material';
import AppBar from '@mui/material/AppBar';
import Button from '@mui/material/Button';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { createStyles, makeStyles } from '@mui/styles';
import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import logo from '../assets/images/logo.png';
import MenuIcon from '@mui/icons-material/Menu';

const useStyles = makeStyles(() => (
    createStyles({
        link: {}
    })
))

export default function Header() {
    const [showMobileMenu, setShowMobileMenu] = useState(false);
    const mobileMenu = ["All Recipes", "Most Picked", "Recommend"];
    return (
        <Box>
            <AppBar position="static">
                <Toolbar>
                    <img src={logo} height={50} alt="logo" />
                    <Typography variant="h5" component="div" sx={{ flexGrow: 0.6, marginLeft: 1 }}>
                        Cooking Ninja
                    </Typography>
                    <Typography component="div" sx={{ flexGrow: 0.1, display: { xs: 'none', md: 'flex' } }}>
                        <NavLink to="/recipes" style={{ textDecoration: 'none', color: 'white' }}>
                            <Button color="inherit">All Recipes</Button>
                        </NavLink>
                    </Typography>
                    <Typography component="div" sx={{ flexGrow: 0.1, display: { xs: 'none', md: 'flex' } }}>
                        <NavLink to="/recipes" style={{ textDecoration: 'none', color: 'white' }}>
                            <Button color="inherit">Most Picked</Button>
                        </NavLink>
                    </Typography>
                    <Typography component="div" sx={{ flexGrow: 0.1, display: { xs: 'none', md: 'flex' } }}>
                        <NavLink to="/recipes" style={{ textDecoration: 'none', color: 'white' }}>
                            <Button color="inherit">Recommended</Button>
                        </NavLink>
                    </Typography>
                    <Box component="div" 
                        sx={{ display: { xs: 'flex', md: 'none' }, flexGrow: 0.4, justifyContent: 'flex-end' }} 
                        onClick={() => setShowMobileMenu(!showMobileMenu)}
                    >
                        <MenuIcon fontSize={'large'} />
                        <Menu
                            open={showMobileMenu}
                            sx={{ mt: '32px' }}
                            anchorOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                        >
                            {mobileMenu.map(item => (
                                <MenuItem>
                                    <Typography textAlign="center">{item}</Typography>
                                </MenuItem>
                            ))}
                        </Menu>
                    </Box>
                </Toolbar>
            </AppBar>
        </Box>
    );
}

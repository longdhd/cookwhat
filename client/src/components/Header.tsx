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
        
    })
))

export default function Header() {
    const [showMobileMenu, setShowMobileMenu] = useState(false);
    const mobileMenu = ["All Recipes", "Most Picked", "Recommend"];
    return (
        <AppBar position="static" color='default'>
            <Toolbar>
                <NavLink to="/" style={{ display: 'flex' }}><img src={logo} height={50} alt="logo" /></NavLink>
                <Typography variant="h5" component="div" sx={{ flexGrow: 0.7, marginLeft: 1 }}>
                    <NavLink to="/" style={{ textDecoration: 'none', color: 'black' }}>Cooking Ninja</NavLink>
                </Typography>
                <Typography component="div" sx={{ flexGrow: 0.1, display: { xs: 'none', md: 'flex' } }}>
                    <NavLink to="/recipes" style={{ textDecoration: 'none', color: 'black' }}>
                        <Button color="inherit">All Recipes</Button>
                    </NavLink>
                </Typography>
                <Typography component="div" sx={{ flexGrow: 0.1, display: { xs: 'none', md: 'flex' } }}>
                    <NavLink to="/recipes?_sort=most-picked" style={{ textDecoration: 'none', color: 'black' }}>
                        <Button color="inherit">Most Picked</Button>
                    </NavLink>
                </Typography>
                <Typography component="div" sx={{ flexGrow: 0.1, display: { xs: 'none', md: 'flex' } }}>
                    <NavLink to="/recipes?_sort=recommended" style={{ textDecoration: 'none', color: 'black' }}>
                        <Button color="inherit">Recommended</Button>
                    </NavLink>
                </Typography>
                <Box component="div"
                    sx={{ display: { xs: 'flex', md: 'none' }, flexGrow: 0.3, justifyContent: 'flex-end' }}
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
                        {mobileMenu.map((item, idx) => (
                            <MenuItem key={idx}>
                                <Typography textAlign="center">{item}</Typography>
                            </MenuItem>
                        ))}
                    </Menu>
                </Box>
            </Toolbar>
        </AppBar>
    );
}

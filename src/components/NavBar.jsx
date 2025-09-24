import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import DocumentScannerIcon from '@mui/icons-material/DocumentScanner';
import { NavLink } from 'react-router-dom';
import ThemeToggle from "./ThemeToggle.jsx";

const navItems = [
    { path: '/', name: 'Home' },
    { path: '/myforms', name: 'MyForms' },
    { path: '/about', name: 'About' },
    { path: '/contact', name: 'Contact' },
];

const settings = ['Profile', 'Logout'];

export default function NavBar() {
    const [anchorElNav, setAnchorElNav] = React.useState(null);
    const [anchorElUser, setAnchorElUser] = React.useState(null);

    const handleOpenNavMenu = (event) => setAnchorElNav(event.currentTarget);
    const handleOpenUserMenu = (event) => setAnchorElUser(event.currentTarget);
    const handleCloseNavMenu = () => setAnchorElNav(null);
    const handleCloseUserMenu = () => setAnchorElUser(null);

    return (
        <AppBar position="static" color="white">
            <Container maxWidth="xl">
                <Toolbar disableGutters>
                    <DocumentScannerIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
                    <Typography
                        variant="h6"
                        noWrap
                        component={NavLink}
                        to="/"
                        sx={{
                            mr: 2,
                            display: { xs: 'none', md: 'flex' },
                            fontFamily: 'monospace',
                            fontWeight: 700,
                            letterSpacing: '.3rem',
                            color: 'black',
                            textDecoration: 'none',
                        }}
                    >
                        SL2GEN
                    </Typography>


                    <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
                        <IconButton
                            size="large"
                            aria-label="open navigation"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            onClick={handleOpenNavMenu}
                            color="inherit"
                        >
                            <MenuIcon />
                        </IconButton>


                        <Menu
                            id="menu-appbar"
                            anchorEl={anchorElNav}
                            anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
                            transformOrigin={{ vertical: 'top', horizontal: 'left' }}
                            keepMounted
                            open={Boolean(anchorElNav)}
                            onClose={handleCloseNavMenu}
                            sx={{ display: { xs: 'block', md: 'none' } }}
                        >
                            {navItems.map((item) => (
                                <MenuItem key={item.path} onClick={handleCloseNavMenu}>
                                    <NavLink
                                        to={item.path}
                                        className={({ isActive }) => (isActive ? 'active' : undefined)}
                                        style={{ textDecoration: 'none', width: '100%' }}
                                    >
                                        <Typography
                                            sx={{
                                                transition: 'box-shadow 0.3s ease-in-out',
                                                '&:hover': {
                                                    boxShadow: '0px 6px 15px -2px rgba(255, 165, 0, 0.7)',
                                                    background: 'linear-gradient(to bottom, rgba(255,165,0,0.15), transparent)',
                                                    insetShadow: 'inset 0 -6px 10px rgba(255,165,0,0.6)',
                                                },
                                                textAlign: 'center',
                                                color: 'black',
                                                '&.active': { color: 'orange', fontWeight: 700 },
                                            }}
                                        >
                                            {item.name}
                                        </Typography>
                                    </NavLink>
                                </MenuItem>
                            ))}
                        </Menu>
                    </Box>


                    <DocumentScannerIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
                    <Typography
                        variant="h5"
                        noWrap
                        component={NavLink}
                        to="/"
                        sx={{
                            mr: 2,
                            display: { xs: 'flex', md: 'none' },
                            flexGrow: 1,
                            fontFamily: 'monospace',
                            fontWeight: 700,
                            letterSpacing: '.3rem',
                            color: 'inherit',
                            textDecoration: 'none',
                        }}
                    >
                        SL2GEN
                    </Typography>



                    <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' }, gap: 1 }}>
                        {navItems.map((item) => (
                            <Button
                                key={item.path}
                                component={NavLink}
                                to={item.path}
                                className={({ isActive }) => (isActive ? 'active' : undefined)}
                                sx={{
                                    my: 2,
                                    color: 'black',
                                    display: 'block',
                                    transition: 'box-shadow 0.3s ease-in-out',
                                    '&:hover': {
                                        boxShadow: '0px 6px 15px -2px rgba(255, 165, 0, 0.7)',
                                        background: 'linear-gradient(to bottom, rgba(255,165,0,0.15), transparent)',
                                        insetShadow: 'inset 0 -6px 10px rgba(255,165,0,0.6)',
                                    },
                                    '&.active': { color: 'orange', fontWeight: 700 },
                                }}
                            >
                                {item.name}
                            </Button>
                        ))}
                    </Box>

                    <Box sx={{ flexGrow: 0 }}>
                        <Tooltip title="Open settings">
                            <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                                <Avatar alt="Igor Leandro" src="/src/assets/images/avatar.png" />
                            </IconButton>
                        </Tooltip>
                        <Menu
                            sx={{ mt: '45px' }}
                            id="menu-appbar"
                            anchorEl={anchorElUser}
                            anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                            transformOrigin={{ vertical: 'top', horizontal: 'right' }}
                            keepMounted
                            open={Boolean(anchorElUser)}
                            onClose={handleCloseUserMenu}
                        >
                            {settings.map((setting) => (
                                <MenuItem key={setting} onClick={handleCloseUserMenu}>
                                    <Typography sx={{ textAlign: 'center' }}>{setting}</Typography>
                                </MenuItem>
                            ))}
                        </Menu>
                    </Box>

                </Toolbar>
            </Container>
        </AppBar>
    );
}

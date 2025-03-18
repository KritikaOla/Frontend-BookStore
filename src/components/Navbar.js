
import * as React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Badge from '@mui/material/Badge';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import AccountCircle from '@mui/icons-material/AccountCircle';
import SearchIcon from '@mui/icons-material/Search';
import InputBase from '@mui/material/InputBase';
import { styled, alpha } from '@mui/material/styles';

const drawerWidth = 240;

const navItems = [
  { name: 'Books', path: '/books' },
  { name: 'Manga', path: '/manga' },
  { name: 'Contact', path: '/contact' },
  { name: 'Orders', path: '/orders' },
];

// Styled Components for the search bar
const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: theme.spacing(2),
  marginRight: theme.spacing(2),
  width: '100%',
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  width: '100%',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // Padding for the search icon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
  },
}));

export default function Navbar() {
  console.log('Navbar is rendering');

  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [searchText, setSearchText] = React.useState('');
  const [cartItemCount, setCartItemCount] = React.useState(0); // ✅ dynamic count
  const navigate = useNavigate();

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  const handleSearchChange = (event) => {
    setSearchText(event.target.value);
  };

  const handleSearchKeyPress = (event) => {
    if (event.key === 'Enter') {
      handleSearch();
    }
  };

  const handleSearch = () => {
    const trimmedSearch = searchText.trim();

    if (trimmedSearch !== '') {
      navigate(`/result?q=${encodeURIComponent(trimmedSearch)}`);
      setSearchText('');
    }
  };

  // ✅ Dynamic cart count effect
  React.useEffect(() => {
    const updateCartCount = () => {
      const storedCartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
      setCartItemCount(storedCartItems.length);
    };

    // Listen for storage events (e.g., across tabs)
    window.addEventListener('storage', updateCartCount);

    // Initial load
    updateCartCount();

    // Cleanup listener on unmount
    return () => {
      window.removeEventListener('storage', updateCartCount);
    };
  }, []);

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center' }}>
      <Typography variant="h6" sx={{ my: 2 }}>
        BookStore
      </Typography>
      <Divider />
      <List>
        {navItems.map((item) => (
          <ListItem key={item.name} disablePadding>
            <ListItemButton
              component={Link}
              to={item.path}
              sx={{ textAlign: 'center' }}
            >
              <ListItemText primary={item.name} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />

      <AppBar component="nav" position="fixed">
        <Toolbar sx={{ display: 'flex', alignItems: 'center' }}>

          {/* Mobile Menu Icon */}
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: 'none' } }}
          >
            <MenuIcon />
          </IconButton>

          {/* Brand Name / Logo */}
          <Typography
            variant="h6"
            component={Link}
            to="/"
            sx={{
              textDecoration: 'none',
              color: 'inherit',
              fontWeight: 'bold',
              mr: 2,
              display: { xs: 'none', sm: 'block' },
            }}
          >
            Online BookStore
          </Typography>

          {/* Search Bar */}
          <Box sx={{ flexGrow: 1 }}>
            <Search>
              <SearchIconWrapper>
                <SearchIcon />
              </SearchIconWrapper>
              <StyledInputBase
                placeholder="Search…"
                inputProps={{ 'aria-label': 'search' }}
                value={searchText}
                onChange={handleSearchChange}
                onKeyPress={handleSearchKeyPress}
              />
            </Search>
          </Box>

          {/* Desktop Navigation Links */}
          <Box sx={{ display: { xs: 'none', sm: 'block' }, ml: 2 }}>
            {navItems.map((item) => (
              <Button
                key={item.name}
                component={Link}
                to={item.path}
                sx={{ color: '#fff' }}
              >
                {item.name}
              </Button>
            ))}
          </Box>

          {/* Cart & Profile Icons */}
          <Box sx={{ display: 'flex', alignItems: 'center', ml: 2 }}>
            <IconButton component={Link} to="/cart" color="inherit">
              <Badge badgeContent={cartItemCount} color="error">
                <ShoppingCartIcon />
              </Badge>
            </IconButton>

            <IconButton component={Link} to="/login" color="inherit">
              <AccountCircle />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>

      {/* Drawer for Mobile Nav */}
      <Box component="nav">
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{ keepMounted: true }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': {
              boxSizing: 'border-box',
              width: drawerWidth,
            },
          }}
        >
          {drawer}
        </Drawer>
      </Box>
    </Box>
  );
}

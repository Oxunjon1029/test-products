import React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Badge from '@mui/material/Badge';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import MenuIcon from '@mui/icons-material/Menu';
import { useDispatch, useSelector } from 'react-redux';
import {
  clearBadgeNumber,
  selectBadgeAmount,
} from '../features/cart/cartSlice';
import { useNavigate } from 'react-router';
const HomeHeaderToolbar = () => {
  const badgeCount = useSelector(selectBadgeAmount);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position='fixed'>
        <Toolbar>
          <IconButton
            size='large'
            edge='start'
            color='inherit'
            aria-label='open drawer'
            sx={{ mr: 2 }}>
            <MenuIcon />
          </IconButton>
          <Typography
            variant='h6'
            noWrap
            component='div'
            sx={{ display: { xs: 'none', sm: 'block' } }}>
            Products
          </Typography>

          <Box sx={{ flexGrow: 1 }} />
          <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
            <IconButton
              onClick={() => {
                navigate('/cart');
                dispatch(clearBadgeNumber());
              }}
              size='large'
              aria-label='show 17 new notifications'
              color='inherit'>
              <Badge badgeContent={badgeCount ? badgeCount : 0} color='error'>
                <ShoppingCartIcon />
              </Badge>
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default HomeHeaderToolbar;

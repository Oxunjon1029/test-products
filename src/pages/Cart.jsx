import React from 'react';
import {
  Typography,
  Container,
  Card,
  CardContent,
  Button,
  Grid,
  Breadcrumbs,
  Box,
} from '@mui/material';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { useDispatch, useSelector } from 'react-redux';
import {
  clearCart,
  selectProductsInsideCart,
} from '../features/cart/cartSlice';
import { Link } from 'react-router-dom';
const Cart = () => {
  const products = useSelector(selectProductsInsideCart);
  const dispatch = useDispatch();
  const handleClearCart = () => {
    dispatch(clearCart());
  };
  return (
    <Container maxWidth='xl'>
      <Breadcrumbs>
        <Link to='/'>Home</Link>
        <Typography color='text.primary'>Cart</Typography>
      </Breadcrumbs>
      <Typography variant='h4' sx={{ textAlign: 'center' }} gutterBottom>
        Shopping Cart
      </Typography>
      <Grid container spacing={2}>
        {products?.map((product) => (
          <Grid item xs={12} sm={6} md={4} key={product.id}>
            <Card raised sx={{ height: '870px' }}>
              <Carousel>
                {product?.images?.map((imageUrl, index) => (
                  <div key={imageUrl}>
                    <img src={imageUrl} alt={`${product.title}-${index}`} />
                  </div>
                ))}
              </Carousel>
              <CardContent>
                <Typography variant='h6'>{product.title}</Typography>
                <Typography variant='body2' color='textSecondary'>
                  {product.description}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          marginTop: '20px',
          gap: '20px',
        }}>
        <Button sx={{ width: '50%' }} variant='contained' color='primary'>
          Buy
        </Button>
        <Button variant='contained' color='secondary' onClick={handleClearCart}>
          Clear Cart
        </Button>
      </Box>
    </Container>
  );
};

export default Cart;

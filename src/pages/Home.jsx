import React, { useEffect, useState } from 'react';
import { Box } from '@mui/material';
import EnhancedTable from '../components/EnhancedTable';
import HomeHeaderToolbar from '../components/HomeHeaderToolbar';
import { useGetAllProductsQuery } from '../features/api/productsApi';
import { useDispatch } from 'react-redux';
import { addBadgeAmount, pushProductsToCart } from '../features/cart/cartSlice';
const Home = () => {
  const [products, setAllProducts] = useState([]);
  const { data, isSuccess } = useGetAllProductsQuery();
  const dispatch = useDispatch();
  useEffect(() => {
    if (isSuccess) {
      setAllProducts(data?.products);
    }
  }, [isSuccess, data]);

  const handleFilterProductsByTitle = (title) => {
    if (title !== '') {
      const filteredProducts = products?.filter((product) =>
        product?.title?.toLowerCase().includes(title)
      );
      setAllProducts(filteredProducts);
    } else {
      setAllProducts(data?.products);
    }
  };

  const handleAddToCart = (product) => {
    const productAddedToCart = products?.find(
      (item) => item?.id === product?.id
    );
    dispatch(pushProductsToCart(productAddedToCart));
    dispatch(addBadgeAmount());
  };
  return (
    <Box sx={{ height: '100vh' }}>
      <HomeHeaderToolbar />

      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          width: '98%',
          margin: '20px auto',
        }}>
        <EnhancedTable
          rows={products}
          handleFilterProductsByTitle={handleFilterProductsByTitle}
          handleAddToCart={handleAddToCart}
        />
      </Box>
    </Box>
  );
};

export default Home;

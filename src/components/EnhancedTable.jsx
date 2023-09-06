import React from 'react';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import EnhancedTableToolbar from './EnhancedTableToolbar';
import EnhancedTableHead from './EnhancedTableHead';
import Paper from '@mui/material/Paper';
import { IconButton } from '@mui/material';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}
function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {
  const stabilizedThis = array?.map((el, index) => [el, index]);
  stabilizedThis?.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) {
      return order;
    }
    return a[1] - b[1];
  });
  return stabilizedThis?.map((el) => el[0]);
}
const EnhancedTable = ({
  rows,
  handleFilterProductsByTitle,
  handleAddToCart,
}) => {
  const [order, setOrder] = React.useState('asc');
  const [orderBy, setOrderBy] = React.useState('title');
  const [page, setPage] = React.useState(0);

  const [rowsPerPage, setRowsPerPage] = React.useState(20);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const visibleRows = React.useMemo(
    () =>
      stableSort(rows, getComparator(order, orderBy))?.slice(
        page * rowsPerPage,
        page * rowsPerPage + rowsPerPage
      ),
    [order, orderBy, page, rowsPerPage, rows]
  );
  return (
    <Box sx={{ width: '100%', marginTop: '70px' }}>
      <Paper sx={{ width: '100%', mb: 2 }} elevation={8}>
        <EnhancedTableToolbar
          handleFilterProductsByTitle={handleFilterProductsByTitle}
        />
        <TableContainer>
          <Table sx={{ minWidth: 750 }} aria-labelledby='tableTitle'>
            <EnhancedTableHead
              order={order}
              orderBy={orderBy}
              onRequestSort={handleRequestSort}
              rowCount={rows?.length}
            />
            <TableBody>
              {visibleRows?.map((row, index) => {
                const labelId = `enhanced-table-checkbox-${index}`;

                return (
                  <TableRow
                    hover
                    tabIndex={-1}
                    key={row.title}
                    sx={{ cursor: 'pointer' }}>
                    <TableCell>{row?.id}</TableCell>
                    <TableCell id={labelId} sx={{ width: '20%' }}>
                      {row.title}
                    </TableCell>
                    <TableCell sx={{ width: '40%' }}>
                      {row.description}
                    </TableCell>
                    <TableCell sx={{ width: '10%' }}>{row.price}</TableCell>
                    <TableCell sx={{ width: '10%' }}>
                      {row.discountPercentage}
                    </TableCell>
                    <TableCell sx={{ width: '10%' }}>{row.rating}</TableCell>
                    <TableCell sx={{ width: '10%' }}>{row.stock}</TableCell>
                    <TableCell sx={{ width: '20%' }}>{row.brand}</TableCell>
                    <TableCell sx={{ width: '20%' }}>{row.category}</TableCell>
                    <TableCell align='right' sx={{ width: '20%' }}>
                      <IconButton
                        variant='contained'
                        onClick={() => handleAddToCart(row)}>
                        <AddShoppingCartIcon color='primary' />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[20, 25, 50]}
          component='div'
          count={rows?.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </Box>
  );
};

export default EnhancedTable;

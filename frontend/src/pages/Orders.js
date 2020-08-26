import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
// redux
import { useSelector, useDispatch } from 'react-redux';
import { listOrders, deleteOrder } from '../redux/actions/orderActions';
// mui
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Button from '@material-ui/core/Button';
// icons
import DeleteIcon from '@material-ui/icons/Delete';

const Orders = () => {
  const orderList = useSelector((state) => state.orderList);
  const { orders, loading } = orderList;
  const orderDelete = useSelector((state) => state.orderDelete);
  const { success: successDelete } = orderDelete;
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(listOrders());
    return () => {};
  }, [successDelete]);

  const deleteHandler = (order) => {
    dispatch(deleteOrder(order._id));
  };
  return (
    <TableContainer component={Paper}>
      <Table style={{ padding: 5 }} stickyHeader>
        <TableHead>
          <TableRow>
            <TableCell align='center'>ID</TableCell>
            <TableCell align='right'>Date</TableCell>
            <TableCell align='right'>Total</TableCell>
            <TableCell align='right'>Paid</TableCell>
            <TableCell align='right'>Delivered</TableCell>
            <TableCell align='center'>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {loading ? (
            <h4>Loading..</h4>
          ) : (
            orders.map((order) => {
              return (
                <TableRow key={order._id} hover>
                  <TableCell align='right'>{order._id}</TableCell>
                  <TableCell align='right'>{order.createdAt}</TableCell>
                  <TableCell align='right'>{order.totalPrice}</TableCell>
                  <TableCell align='right'>
                    {order.isPaid ? 'Yes' : 'No'}
                  </TableCell>
                  <TableCell align='right'>
                    {order.isDelivered ? 'Yes' : 'No'}
                  </TableCell>
                  <TableCell align='center'>
                    <Link
                      to={'/order/' + order._id}
                      className='button secondary'
                    >
                      Details
                    </Link>
                    <br />
                    <Button onClick={() => deleteHandler(order)}>
                      <DeleteIcon />
                    </Button>
                  </TableCell>
                </TableRow>
              );
            })
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default Orders;

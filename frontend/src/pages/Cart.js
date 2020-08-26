import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
// redux
import { useSelector, useDispatch } from 'react-redux';
import { addToCart, removeFromCart } from '../redux/actions/cartActions';
// mui
import Grid from '@material-ui/core/Grid';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import ListItemText from '@material-ui/core/ListItemText';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

const Cart = (props) => {
  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;
  const productId = props.match.params.id;
  const qty = props.location.search
    ? Number(props.location.search.split('=')[1])
    : 1;
  const dispatch = useDispatch();

  const removeHandler = (productId) => {
    dispatch(removeFromCart(productId));
  };

  const checkOutHandler = () => {
    props.history.push('/signin?redirect=shipping');
  };

  useEffect(() => {
    if (productId) {
      dispatch(addToCart(productId, qty));
    }
    return () => {};
  }, []);

  return (
    <Grid container>
      <Grid item xs={9}>
        <TableContainer component={Paper} style={{ padding: 10 }}>
          <Table>
            {cartItems.length < 1 ? (
              <caption>Your cart is empty.</caption>
            ) : (
              <caption>List of items in your cart.</caption>
            )}
            <TableHead>
              <TableRow>
                <Typography style={{ marginLeft: 15 }} variant='h4'>
                  Cart
                </Typography>
              </TableRow>
            </TableHead>
            <TableBody>
              {cartItems.map((item) => (
                <TableRow key={item.product}>
                  <TableCell>
                    <img
                      src={item.image}
                      alt={item.name}
                      style={{ height: 150 }}
                    />
                  </TableCell>
                  <TableCell component={Link} to={`/product/${item.product}`}>
                    {item.name}
                  </TableCell>
                  <TableCell>${item.price}</TableCell>
                  <TableCell>
                    <select
                      value={item.qty}
                      onChange={(e) =>
                        dispatch(addToCart(item.product, e.target.value))
                      }
                    >
                      {[...Array(item.countInStock).keys()].map((x) => (
                        <option key={x + 1} value={x + 1}>
                          {x + 1}
                        </option>
                      ))}
                    </select>
                  </TableCell>
                  <TableCell>
                    <Button
                      variant='contained'
                      onClick={() => removeHandler(item.product)}
                    >
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Grid>

      <Grid item xs={3}>
        <Paper style={{ padding: 5, marginLeft: 40 }}>
          <div style={{ padding: 5, marginBottom: 10 }}>
            <b> Sub Total</b> <br />
            {cartItems.reduce((a, c) => a + c.qty, 0)} items :
            <b> ${cartItems.reduce((a, c) => a + c.qty * c.price, 0)}</b>
          </div>

          <Button
            color='secondary'
            fullWidth
            variant='contained'
            onClick={checkOutHandler}
            disabled={cartItems.length < 1}
          >
            Check Out
          </Button>
        </Paper>
      </Grid>
    </Grid>
  );
};

export default Cart;

import React, { useEffect } from 'react';
// mui
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
// redux
import { useSelector, useDispatch } from 'react-redux';
import { createOrder } from '../redux/actions/orderActions';

const PlaceOrder = (props) => {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);
  const { cartItems, shipping, payment } = cart;
  const orderCreate = useSelector((state) => state.orderCreate);
  const { loading, order, success, error } = orderCreate;

  if (!payment) {
    props.history.push('payment');
  } else if (!shipping.address) {
    props.history.push('shipping');
  }

  const itemsPrice = cartItems.reduce((a, c) => a + c.qty * c.price, 0);
  const shippingPrice = itemsPrice > 100 ? 0 : 10;
  const taxPrice = itemsPrice * 0.15;
  const totalPrice = itemsPrice + shippingPrice + taxPrice;

  const placeOrderHandler = () => {
    dispatch(
      createOrder({
        orderItems: cartItems,
        shipping,
        payment,
        itemsPrice,
        shippingPrice,
        taxPrice,
        totalPrice
      })
    );
  };

  useEffect(() => {
    if (success) {
      props.history.push(`/order/${order._id}`);
    }
    return () => {};
  }, [success]);

  return (
    <Grid container>
      <Grid item xs={8}>
        <div>
          <h4>Shipping To</h4>
          {shipping.address} {', '}
          {shipping.city} {', '}
          {shipping.country} <br />
          {shipping.postalCode}
        </div>
        <div>
          <h4>Payment Method</h4>
          {payment}
        </div>
        <div>
          <h4>Items</h4>
          <table
            style={{
              border: '1px solid #dddddd',
              width: '100%',
              margin: 10,
              padding: 10
            }}
          >
            {cartItems.map((item) => {
              return (
                <tr style={{ border: '1px solid #dddddd' }}>
                  <td>
                    <img
                      src={item.image}
                      alt='imaage'
                      style={{ height: 100, width: 100 }}
                    />
                  </td>
                  <td>
                    <b>{item.name}</b>
                  </td>
                  <td>
                    <b> ${item.price}</b>
                  </td>
                  <td>{item.qty}</td>
                  <td>{item.brand}</td>
                </tr>
              );
            })}
          </table>
        </div>
      </Grid>

      <Grid item xs>
        <Paper style={{ padding: 5, marginLeft: 40 }}>
          <div
            style={{
              padding: 5,
              margin: 10,
              marginBottom: 10,
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-evenly'
            }}
          >
            <b>Items Price : {itemsPrice}</b> <br />
            <b>Tax Price : {taxPrice} </b>
            <br />
            <b>Shipping Price : {shippingPrice}</b>
            <br />
            <br />
            <b>Total Price : {totalPrice}</b>
          </div>

          <Button
            color='secondary'
            fullWidth
            variant='contained'
            onClick={placeOrderHandler}
          >
            Place Order
          </Button>
        </Paper>
      </Grid>
    </Grid>
  );
};

export default PlaceOrder;

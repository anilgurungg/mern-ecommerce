import React, { useEffect, Fragment } from 'react';
import { Link } from 'react-router-dom';
import PaypalButton from '../components/PaypalButton';
// redux
import { useSelector, useDispatch } from 'react-redux';
import { detailsOrder, payOrder } from '../redux/actions/orderActions';
// mui
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import Button from '@material-ui/core/Button';

const Order = (props) => {
  const dispatch = useDispatch();
  const orderPay = useSelector((state) => state.orderPay);
  const {
    loading: loadingPay,
    error: errorPay,
    success: successPay
  } = orderPay;
  useEffect(() => {
    if (successPay) {
      props.history.push('/profile');
    } else {
      dispatch(detailsOrder(props.match.params.id));
    }

    return () => {};
  }, [successPay]);

  const handleSuccessPayment = (paymentDetails) => {
    dispatch(payOrder(order, paymentDetails));
  };

  const orderDetails = useSelector((state) => state.orderDetails);
  const { order, loading } = orderDetails;

  return (
    <>
      {loading ? (
        <p>Loading</p>
      ) : (
        <Fragment>
          <Grid container>
            <Grid item xs={7}>
              <table
                style={{
                  border: '1px solid #dddddd',
                  width: '100%',
                  margin: 10,
                  padding: 10
                }}
              >
                {order.orderItems.map((item) => {
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
            </Grid>
            <Grid item xs />
            <Grid item xs={4}>
              <Card style={{ padding: 5 }}>
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
                  <b>Items Price : {order.itemsPrice}</b>
                  <b>Tax Price : {order.taxPrice} </b>
                  <b>Shipping Price : {order.shippingPrice}</b>
                  <b>Total Price : {order.totalPrice}</b> <br />
                  <b>Shipping</b>
                  {order.shipping.address}, {order.shipping.city},
                  {order.shipping.postalCode}, {order.shipping.country},{' '}
                  {order.isDelivered
                    ? 'Delivered at ' + order.deliveredAt
                    : 'Not Delivered.'}{' '}
                  <br /> <br />
                  <b>Payment</b>
                  Payment Method: {order.payment.paymentMethod}
                  <b>
                    {order.isPaid ? 'Paid at ' + order.paidAt : 'Not Paid.'}
                  </b>
                  <br />
                  <Button color='secondary' variant='contained'>
                    Pay
                  </Button>
                  {/* <PaypalButton
                    amount={order.totalPrice}
                    onSuccess={handleSuccessPayment}
                  /> */}
                </div>
              </Card>
            </Grid>
          </Grid>
        </Fragment>
      )}
    </>
  );
};

export default Order;

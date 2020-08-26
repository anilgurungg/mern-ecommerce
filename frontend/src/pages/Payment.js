import React, { useState, useEffect } from 'react';

// redux
import { useDispatch } from 'react-redux';
import { savePayment } from '../redux/actions/cartActions';
// mui
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

import Button from '@material-ui/core/Button';

const Payment = (props) => {
  const [paymentMehod, setPaymentMethod] = useState('');

  const dispatch = useDispatch();

  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(savePayment(paymentMehod));
    props.history.push('placeorder');
  };

  return (
    <Grid container>
      <Grid item sm />
      <Grid item>
        <Typography variant='h2'>Select Payment</Typography>
        <div style={{ padding: 10 }}>
          <form noValidate onSubmit={onSubmit}>
            <input
              type='radio'
              name='paymentMehod'
              id='paymentMethod'
              value='paypal'
              onChange={(e) => setPaymentMethod(e.target.value)}
            ></input>
            <label for='paymentMethod'>Paypal</label>

            <input
              type='radio'
              name='paymentMehod'
              id='paymentMethod'
              value='Cash On Delivery'
              onChange={(e) => setPaymentMethod(e.target.value)}
            ></input>
            <label for='paymentMethod'>Cash on Delivery</label>
            <br />
            <Button type='submit' variant='contained' color='primary'>
              Continue
            </Button>

            <br />
          </form>
        </div>
      </Grid>
      <Grid item sm />
    </Grid>
  );
};

export default Payment;

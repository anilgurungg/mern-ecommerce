import React, { useState } from 'react';
// redux
import { useDispatch } from 'react-redux';
import { saveShipping } from '../redux/actions/cartActions';
// mui
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

const Shipping = (props) => {
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [country, setCountry] = useState('');

  const dispatch = useDispatch();

  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(saveShipping({ address, city, postalCode, country }));
    props.history.push('payment');
  };

  return (
    <Grid container>
      <Grid item sm />
      <Grid item>
        <Typography variant='h2'>Shipping</Typography>
        <form noValidate onSubmit={onSubmit}>
          <TextField
            name='address'
            type='text'
            label='Address'
            fullWidth
            onChange={(e) => setAddress(e.target.value)}
          />

          <TextField
            name='city'
            type='text'
            label='City'
            fullWidth
            onChange={(e) => setCity(e.target.value)}
          />

          <TextField
            name='postalCode'
            type='text'
            label='Postal Code'
            fullWidth
            onChange={(e) => setPostalCode(e.target.value)}
          />
          <TextField
            name='country'
            type='text'
            label='Country'
            fullWidth
            onChange={(e) => setCountry(e.target.value)}
          />

          <Button type='submit' variant='contained' color='primary'>
            Continue
          </Button>
          <br />
        </form>
      </Grid>
      <Grid item sm />
    </Grid>
  );
};

export default Shipping;

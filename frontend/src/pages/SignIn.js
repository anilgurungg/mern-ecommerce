import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
// redux
import { useSelector, useDispatch } from 'react-redux';
import { signin } from '../redux/actions/userActions';
// mui
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

const SignIn = (props) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const dispatch = useDispatch();

  const userSignIn = useSelector((state) => state.userSignIn);
  const { loading, userInfo, error } = userSignIn;

  const redirect = props.location.search
    ? props.location.search.split('=')[1]
    : '/';
  useEffect(() => {
    if (userInfo) {
      props.history.push(redirect);
    }

    return () => {};
  }, [userInfo]);

  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(signin(email, password));
  };

  return (
    <Grid container>
      <Grid item sm />
      <Grid
        item
        style={{
          display: 'flex',

          flexDirection: 'column',
          alignItems: 'center'
        }}
      >
        <Typography variant='h2'>Login</Typography>
        <form noValidate onSubmit={onSubmit} style={{ textAlign: 'center' }}>
          <TextField
            id='email'
            name='email'
            type='email'
            label='Email'
            fullWidth
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            id='password'
            name='password'
            type='password'
            label='Password'
            fullWidth
            onChange={(e) => setPassword(e.target.value)}
            style={{ marginBottom: 10 }}
          />
          {error && (
            <Typography variant='body2' color='red'>
              {error}
            </Typography>
          )}

          <div style={{ alignItems: 'center' }}>
            <Button
              type='submit'
              variant='contained'
              color='primary'
              style={{ margin: 'auto' }}
            >
              Login
            </Button>
            <br />
            <small>
              Register <Link to='/register'>here</Link>
            </small>
          </div>
        </form>
      </Grid>
      <Grid item sm />
    </Grid>
  );
};

export default SignIn;

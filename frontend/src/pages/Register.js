import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
// redux
import { useSelector, useDispatch } from 'react-redux';
import { register } from '../redux/actions/userActions';
// mui
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

const Register = (props) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const dispatch = useDispatch();

  const userRegister = useSelector((state) => state.userRegister);
  const { loading, userInfo, error } = userRegister;

  useEffect(() => {
    if (userInfo) {
      props.history.push('/');
    }

    return () => {};
  }, [userInfo]);

  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(register(name, email, password));
  };

  return (
    <Grid container>
      <Grid item sm />
      <Grid item>
        <Typography variant='h2'>Create Account</Typography>
        <form noValidate onSubmit={onSubmit}>
          <TextField
            id='name'
            name='name'
            type='text'
            label='Name'
            fullWidth
            onChange={(e) => setName(e.target.value)}
          />
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
          />
          {error && (
            <Typography variant='body2' color='red'>
              {error}
            </Typography>
          )}
          <Button
            type='submit'
            variant='contained'
            color='primary'
            disabled={loading}
          >
            Register
          </Button>
          <br />
          <small>
            Signin <Link to='/signin'>here</Link>
          </small>
        </form>
      </Grid>
      <Grid item sm />
    </Grid>
  );
};

export default Register;

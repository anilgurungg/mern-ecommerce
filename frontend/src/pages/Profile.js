import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
// redux
import { useSelector, useDispatch } from 'react-redux';
import { logout, update } from '../redux/actions/userActions';
import { listMyOrders } from '../redux/actions/orderActions';
// mui
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

const Profile = (props) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const dispatch = useDispatch();

  const userSignIn = useSelector((state) => state.userSignIn);
  const { userInfo } = userSignIn;
  const myOrderList = useSelector((state) => state.myOrderList);
  const { orders, loading } = myOrderList;

  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(update({ userId: userInfo._id, name, email, password }));
  };

  const handleLogout = () => {
    dispatch(logout());
    props.history.push('signin');
  };

  useEffect(() => {
    if (userInfo) {
      setName(userInfo.name);
      setEmail(userInfo.email);
    }
    dispatch(listMyOrders());
    return () => {};
  }, [userInfo]);

  return (
    <Grid container spacing={5}>
      <Grid item xs={3} component={Paper} style={{ marginTop: 18 }}>
        <div
          style={{
            padding: 3,

            margin: '25px 7px 25px 7px'
          }}
        >
          <Typography variant='h5'>Edit Profile Details</Typography>
          <br />
          <form onSubmit={onSubmit}>
            <TextField
              id='name'
              name='name'
              type='text'
              value={name}
              label='Name'
              fullWidth
              autoComplete='off'
              onChange={(e) => setName(e.target.value)}
            />
            <TextField
              id='email'
              name='email'
              type='email'
              value={email}
              label='Email'
              fullWidth
              onChange={(e) => setEmail(e.target.value)}
            />
            <TextField
              id='password'
              name='password'
              type='password'
              label='Password'
              value={password}
              fullWidth
              onChange={(e) => setPassword(e.target.value)}
              style={{ marginBottom: 5 }}
            />
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                margin: '10px auto 10px auto'
              }}
            >
              <Button type='submit' variant='contained' color='primary'>
                Submit
              </Button>
              <Button
                variant='contained'
                color='secondary'
                onClick={handleLogout}
              >
                Logout
              </Button>
            </div>
          </form>
        </div>
      </Grid>

      <Grid item xs={9}>
        {/* Table */}
        <TableContainer component={Paper}>
          <Table style={{ padding: 5, width: '100%' }} stickyHeader>
            <TableHead>
              <TableRow>
                <TableCell size='small'>ID</TableCell>
                <TableCell align='right'>Date</TableCell>
                <TableCell align='right'>Total</TableCell>
                <TableCell align='right'>Paid</TableCell>
                <TableCell align='right'>Delivered</TableCell>
                <TableCell align='right'>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {loading ? (
                <h4>Loading..</h4>
              ) : (
                orders.map((order) => {
                  return (
                    <TableRow key={order._id} hover>
                      <TableCell size='small' align='right'>
                        {order._id}
                      </TableCell>
                      <TableCell align='right'>{order.createdAt}</TableCell>
                      <TableCell align='right'>{order.totalPrice}</TableCell>
                      <TableCell align='right'>
                        {order.isPaid ? 'Yes' : 'No'}
                      </TableCell>
                      <TableCell align='right'>
                        {order.isDelivered ? 'Yes' : 'No'}
                      </TableCell>
                      <TableCell align='right'>
                        <Link to={`/order/${order._id}`}>Details</Link>
                      </TableCell>
                    </TableRow>
                  );
                })
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Grid>
    </Grid>
  );
};

export default Profile;

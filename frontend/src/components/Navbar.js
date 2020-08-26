import React, { useState } from 'react';
import { Link } from 'react-router-dom';
// redux
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../redux/actions/userActions';
// mui
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Drawer from '@material-ui/core/Drawer';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import List from '@material-ui/core/List';
import Tooltip from '@material-ui/core/Tooltip';
import Divider from '@material-ui/core/Divider';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import ListItem from '@material-ui/core/ListItem';
// mui icons
import MenuIcon from '@material-ui/icons/Menu';
import ShoppingCart from '@material-ui/icons/ShoppingCart';

const Navbar = (props) => {
  const [open, setOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const dispatch = useDispatch();
  const userSignIn = useSelector((state) => state.userSignIn);
  const { userInfo } = userSignIn;

  const logoutHandler = () => {
    dispatch(logout());
    props.history.push('/signin');
  };

  return (
    <>
      <AppBar elevation={0}>
        <Toolbar style={{ display: 'flex' }}>
          <IconButton
            edge='start'
            color='inherit'
            onClick={() => setOpen(true)}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant='h6'
            component={Link}
            to='/'
            style={{ color: 'white', textDecoration: 'none', flex: 1 }}
          >
            Luga Wholesale
          </Typography>

          <div>
            <Button color='inherit' component={Link} to='/cart'>
              <Tooltip title='Cart'>
                <ShoppingCart />
              </Tooltip>
            </Button>
            {userInfo ? (
              <>
                <Button
                  color='inherit'
                  onClick={(e) => setAnchorEl(e.currentTarget)}
                >
                  {userInfo.name}
                </Button>
                <Menu
                  anchorEl={anchorEl}
                  keepMounted
                  open={Boolean(anchorEl)}
                  onClose={() => setAnchorEl(null)}
                >
                  <MenuItem component={Link} to='/profile'>
                    My Profile
                  </MenuItem>
                  {userInfo.isAdmin && (
                    <>
                      <MenuItem component={Link} to='/products'>
                        Products
                      </MenuItem>
                      <MenuItem component={Link} to='/orders'>
                        Orders
                      </MenuItem>
                    </>
                  )}
                  {/* <MenuItem onclick={logoutHandler}>Logout</MenuItem> */}
                </Menu>
              </>
            ) : (
              <Button color='inherit' component={Link} to='/signin'>
                Login
              </Button>
            )}
          </div>
        </Toolbar>
      </AppBar>
      <Drawer open={open} onClose={() => setOpen(false)}>
        <List style={{ width: 250 }}>
          <ListItem>Categories </ListItem>
          <Divider />
          <ListItem component={Link} to='/category/Pants' button>
            Pants
          </ListItem>
          <ListItem component={Link} to='/category/Shirts' button>
            Shirts
          </ListItem>
          <ListItem component={Link} to='/category/Shoes' button>
            Shoes
          </ListItem>
        </List>
      </Drawer>
    </>
  );
};

export default Navbar;

import React from 'react';
import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
// components
import Navbar from './components/Navbar';
import Footer from './components/Footer';
// mui
import { ThemeProvider as MuiThemeProvider } from '@material-ui/core/styles';
import createMuiTheme from '@material-ui/core/styles/createMuiTheme';
import themeFile from './util/theme';
// pages
import Home from './pages/Home';
import Cart from './pages/Cart';
import Products from './pages/Products';
import Product from './pages/Product';
import SignIn from './pages/SignIn';
import Register from './pages/Register';
import Profile from './pages/Profile';
import Shipping from './pages/Shipping';
import Payment from './pages/Payment';
import Order from './pages/Order';
import Orders from './pages/Orders';
import PlaceOrder from './pages/PlaceOrder';

const theme = createMuiTheme(themeFile);

function App() {
  return (
    <MuiThemeProvider theme={theme}>
      <Router>
        <Navbar />
        <div className='container'>
          <Switch>
            <Route exact path='/' component={Home} />
            <Route path='/cart/:id?' component={Cart} />
            <Route path='/product/:id' component={Product} />
            <Route path='/products' component={Products} />
            <Route path='/order/:id' component={Order} />
            <Route path='/orders' component={Orders} />
            <Route path='/placeorder' component={PlaceOrder} />
            <Route path='/products' component={Products} />
            <Route path='/profile' component={Profile} />
            <Route path='/signin' component={SignIn} />
            <Route path='/shipping' component={Shipping} />
            <Route path='/payment' component={Payment} />
            <Route path='/register' component={Register} />
            <Route path='/category/:id' component={Home} />
          </Switch>
        </div>
        <Footer />
      </Router>
    </MuiThemeProvider>
  );
}

export default App;

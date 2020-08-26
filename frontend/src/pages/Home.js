import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
//redux
import { useSelector, useDispatch } from 'react-redux';
import { listProducts } from '../redux/actions/productActions';
// mui
import withStyles from '@material-ui/core/styles/withStyles';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';

const styles = (theme) => ({
  searchContainer: {
    display: 'flex',
    width: '60%',
    margin: 'auto',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  search: {
    height: 35,
    width: 300,
    border: 'none',
    boxShadow: '1px 1px 1px 1px grey',
    borderRadius: '4px',
    marginRight: 10,
    flex: 2,
    flexBasis: '25%',
    textAlign: 'center',
    '&:focus': {
      outline: 'none'
    }
  },
  selector: {
    height: 35,
    width: 100,
    padding: 1,
    border: 'none',
    boxShadow: '1px 1px 1px 1px grey',
    borderRadius: '4px',
    marginLeft: 10,
    textAlign: 'center',
    flex: 2,
    '&:focus': {
      outline: 'none'
    }
  },
  button: {
    flex: 1,
    margin: 'auto 10px auto 10px',
    border: 'none',
    boxShadow: '1px 1px 1px 1px grey',
    borderRadius: '4px'
  },
  productContainer: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    margin: 10,
    padding: 10,
    height: 450,
    alignItems: 'center'
  },
  name: {
    marginTop: 7,
    textDecoration: 'none'
  },
  brand: {
    color: 'grey'
  },

  separator: {
    width: '100%'
  }
});

const Home = (props) => {
  const { classes } = props;

  const [searchKeyword, setSearchKeyword] = useState('');
  const [sortOrder, setSortOrder] = useState('');

  const category = props.match.params.id ? props.match.params.id : '';
  const productList = useSelector((state) => state.productList);
  const { products, loading } = productList;
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(listProducts(category));
    return () => {};
  }, [category]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(listProducts(category, searchKeyword, sortOrder));
  };

  const sortHandler = (e) => {
    setSortOrder(e.target.value);
    dispatch(listProducts(category, searchKeyword, sortOrder));
  };

  return (
    <>
      <div>
        <form onSubmit={submitHandler} className={classes.searchContainer}>
          <input
            className={classes.search}
            type='text'
            placeholder='Search products'
            onChange={(e) => setSearchKeyword(e.target.value)}
          />
          <Button
            color='inherit'
            variant='contained'
            type='Submit'
            className={classes.button}
          >
            Submit
          </Button>
          <label>Sort By</label>
          <select className={classes.selector} onChange={sortHandler}>
            <option>default </option>
            <option>highest </option>
            <option>lowest </option>
          </select>
        </form>
      </div>

      {loading ? (
        <h1>Loading...</h1>
      ) : (
        <Grid container style={{ marginTop: 20 }} spacing={4}>
          {products.map((product) => {
            return (
              <Grid item xs={6} sm={4} key={product._id}>
                <Card className={classes.productContainer}>
                  <div
                    style={{
                      height: 320,
                      width: 250,
                      display: 'flex'
                    }}
                  >
                    <Link
                      to={`/product/${product._id}`}
                      style={{ margin: 'auto' }}
                    >
                      <img
                        src={product.image}
                        alt={product.name}
                        style={{
                          maxHeight: 320,
                          maxWidth: 250
                        }}
                      />
                    </Link>
                  </div>
                  <Typography
                    variant='h5'
                    align='center'
                    className={classes.name}
                    component={Link}
                    to={`/product/${product._id}`}
                  >
                    {product.name}
                  </Typography>

                  <Typography variant='body2' className={classes.brand}>
                    {product.brand}
                  </Typography>
                  <Typography variant='h6'>${product.price}</Typography>
                </Card>
              </Grid>
            );
          })}
        </Grid>
      )}
    </>
  );
};

export default withStyles(styles)(Home);

import React from 'react';
import { Link } from 'react-router-dom';
//redux
import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import { PRODUCT_REVIEW_SAVE_RESET } from '../redux/types';
import {
  detailsProduct,
  saveProductReview
} from '../redux/actions/productActions';
// mui
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import TextField from '@material-ui/core/TextField';

const Product = (props) => {
  const classes = { props };
  const dispatch = useDispatch();

  const [qty, setQty] = useState(1);
  const [comment, setComment] = useState('');

  const userSignIn = useSelector((state) => state.userSignIn);
  const { userInfo } = userSignIn;
  const productDetails = useSelector((state) => state.productDetails);
  const { product, loading, error } = productDetails;
  const productReviewSave = useSelector((state) => state.productReviewSave);
  const { success: productReviewSaveSuccess } = productReviewSave;

  useEffect(() => {
    if (productReviewSaveSuccess) {
      alert('Review submitted successfully');
      setComment('');
      dispatch({ type: PRODUCT_REVIEW_SAVE_RESET });
    }

    dispatch(detailsProduct(props.match.params.id));
    return () => {};
  }, [productReviewSaveSuccess]);

  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(
      saveProductReview(props.match.params.id, {
        name: userInfo.name,
        comment: comment
      })
    );
  };

  const handleCart = () => {
    props.history.push(`/cart/${props.match.params.id}?qty=${qty}`);
  };

  return (
    !loading && (
      <>
        <Grid container spacing={1}>
          <Grid item xs={5}>
            <Grid container justify='center' alignItems='center'>
              <img
                src={product.image}
                alt='product'
                style={{ maxWidth: 400, maxHeight: 550, align: 'center' }}
              />
            </Grid>
          </Grid>
          <Grid item xs={4}>
            <Typography variant='h4' style={{ textDecoration: 'bold' }}>
              {product.name}
            </Typography>

            <Typography variant='b1'>
              Brand: <b> {product.brand}</b>
            </Typography>
            <br />
            <Typography variant='b1'>
              Price: <b> ${product.price}</b>
            </Typography>
            <br />
            <br />
            <Typography variant='b2'>{product.description}</Typography>
          </Grid>
          <Grid item xs={3}>
            <br />
            <Grid container justify='center' alignItems='center'>
              <Paper variant='outlined' style={{ height: 200, width: '90%' }}>
                <List>
                  <ListItem>
                    Price: <b> ${product.price}</b>
                  </ListItem>
                  <ListItem>
                    Status:
                    <b>
                      {product.countInStock > 0 ? (
                        <span>In Stock</span>
                      ) : (
                        <span>Out Of Stock</span>
                      )}
                    </b>
                  </ListItem>
                  <ListItem>
                    Qty:{' '}
                    <select
                      value={qty}
                      onChange={(e) => {
                        setQty(e.target.value);
                      }}
                    >
                      {[...Array(product.countInStock).keys()].map((x) => (
                        <option key={x + 1} value={x + 1}>
                          {x + 1}
                        </option>
                      ))}
                    </select>
                  </ListItem>

                  {product.countInStock > 0 && (
                    <ListItem alignItems='center'>
                      <Button
                        color='secondary'
                        variant='contained'
                        fullWidth
                        onClick={handleCart}
                      >
                        Add to cart
                      </Button>
                    </ListItem>
                  )}
                </List>
              </Paper>
            </Grid>
          </Grid>
        </Grid>
        <Grid container style={{ marginTop: 20 }} spacing={5}>
          <Grid item xs>
            <br />
            <Typography variant='h5'>User Reviews</Typography>
            <br />
            <Paper elevation={1} style={{ padding: 10 }}>
              <List>
                {product.reviews.length < 1 ? (
                  <ListItem>
                    <Typography variant='body2'>No Reviews</Typography>
                  </ListItem>
                ) : (
                  <>
                    {product.reviews.map((review) => (
                      <ListItemText key={review._id}>
                        <Typography variant='body1'>
                          <b>{review.name}</b>
                        </Typography>
                        <Typography variant='body2'>
                          {review.createdAt.substring(0, 10)}
                        </Typography>
                        <Typography variant='body1'>
                          {review.comment}
                        </Typography>
                        <br />
                      </ListItemText>
                    ))}
                  </>
                )}
              </List>
            </Paper>
          </Grid>
          <Grid item xs>
            <List>
              <ListItem>
                <Typography variant='h5'>Write a review</Typography>
              </ListItem>
              <ListItem>
                {userInfo ? (
                  <form onSubmit={onSubmit} style={{ width: '100%' }}>
                    <TextField
                      type='text'
                      multiline
                      rows={10}
                      variant='outlined'
                      fullWidth
                      onChange={(e) => setComment(e.target.value)}
                      style={{
                        '&:focus': {
                          outline: 'none'
                        }
                      }}
                    />
                    <Grid container justify='center' alignItems='center'>
                      <Grid item alignItems='center'>
                        <Button
                          type='submit'
                          color='secondary'
                          variant='contained'
                          style={{ marginTop: 5 }}
                        >
                          Add
                        </Button>
                      </Grid>
                    </Grid>
                  </form>
                ) : (
                  <p>Please sign in to continue</p>
                )}
              </ListItem>
            </List>
          </Grid>
        </Grid>
      </>
    )
  );
};

export default Product;

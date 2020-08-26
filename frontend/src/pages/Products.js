import React, { useState, useEffect, Fragment } from 'react';
import axios from 'axios';
// redux
import { useSelector, useDispatch } from 'react-redux';
import {
  listProducts,
  saveProduct,
  deleteProduct
} from '../redux/actions/productActions';

// mui
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
// mui icons
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';

const Products = () => {
  const dispatch = useDispatch();

  const productList = useSelector((state) => state.productList);
  const { loading, products } = productList;
  const productSave = useSelector((state) => state.productSave);
  const { loading: loadingSave, success: successSave, error } = productSave;
  const productDelete = useSelector((state) => state.productDelete);
  const { loading: loadingDelete, success: successDelete } = productDelete;

  const [open, setOpen] = useState(false);
  const [id, setId] = useState('');
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [image, setImage] = useState('');
  const [brand, setBrand] = useState('');
  const [category, setCategory] = useState('');
  const [countInStock, setCountInStock] = useState('');
  const [description, setDescription] = useState('');
  const [uploading, setUploading] = useState(false);

  const modalOpen = (product) => {
    setId(product._id);
    setName(product.name);
    setPrice(product.price);
    setImage(product.image);
    setBrand(product.brand);
    setCategory(product.category);
    setDescription(product.description);
    setCountInStock(product.countInStock);
    setOpen(true);
  };

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      saveProduct({
        _id: id,
        name,
        price,
        image,
        brand,
        category,
        description,
        countInStock
      })
    );
  };

  const deleteHandler = (productId) => {
    dispatch(deleteProduct(productId));
  };

  const uploadFileHandler = (e) => {
    const file = e.target.files[0];
    const bodyFormData = new FormData();
    bodyFormData.append('image', file);
    setUploading(true);
    axios
      .post('/api/uploads', bodyFormData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })
      .then((response) => {
        setImage(response.data);
        setUploading(false);
      })
      .catch((err) => {
        console.log(err);
        setUploading(false);
      });
  };

  useEffect(() => {
    if (successSave) {
      setOpen(false);
    }

    dispatch(listProducts());
    return () => {};
  }, [successSave, successDelete]);

  return (
    <>
      <div
        style={{
          display: 'flex',
          marginBottom: 10
        }}
      >
        <Typography
          variant='h4'
          style={{
            flex: 1
          }}
        >
          Products
        </Typography>
        <Button variant='contained' color='primary' onClick={modalOpen}>
          Create Product
        </Button>
      </div>

      {/* Dailog */}
      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>Create Product</DialogTitle>
        <DialogContent>
          <form onSubmit={submitHandler}>
            <TextField
              autoFocus
              id='name'
              label='Name'
              type='text'
              value={name}
              onChange={(e) => setName(e.target.value)}
              autoComplete='off'
            />
            <br />
            <input
              type='text'
              name='image'
              value={image}
              id='image'
              onChange={(e) => setImage(e.target.value)}
            ></input>
            <input type='file' onChange={uploadFileHandler}></input>
            {uploading && <div>Uploading...</div>}
            <br />
            <TextField
              autoFocus
              id='brand'
              label='Brand'
              type='text'
              value={brand}
              onChange={(e) => setBrand(e.target.value)}
              autoComplete='off'
            />
            <br />
            <TextField
              autoFocus
              id='price'
              label='Price'
              type='number'
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              autoComplete='off'
            />
            <br />
            <TextField
              autoFocus
              id='category'
              label='Category'
              type='text'
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              autoComplete='off'
            />
            <br />
            <TextField
              autoFocus
              id='description'
              label='Description'
              type='text'
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              multiline
              rows={4}
              fullWidth
              autoComplete='off'
            />
            <br />
            <TextField
              autoFocus
              id='countInStock'
              label='Stock Count'
              type='number'
              value={countInStock}
              onChange={(e) => setCountInStock(e.target.value)}
              fullWidth
              autoComplete='off'
            />

            <Button type='submit'>Submit</Button>
          </form>
        </DialogContent>
      </Dialog>
      {/* Table */}
      <TableContainer component={Paper}>
        <Table style={{ padding: 5 }} stickyHeader>
          <TableHead>
            <TableRow>
              <TableCell size='small'>ID</TableCell>
              <TableCell align='right'>Name</TableCell>
              <TableCell align='right'>Image</TableCell>
              <TableCell align='right'>Brand</TableCell>
              <TableCell align='right'>Price</TableCell>
              <TableCell align='right' size='small'>
                Description
              </TableCell>
              <TableCell align='right'>Count In stock</TableCell>
              <TableCell align='right'></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {loading ? (
              <p>Loading</p>
            ) : (
              products.map((product) => (
                <TableRow key={product._id} hover>
                  <TableCell size='small' align='right'>
                    {product._id}
                  </TableCell>
                  <TableCell align='right'>{product.name}</TableCell>
                  <TableCell align='right'>
                    <img
                      src={product.image}
                      alt='product'
                      style={{ height: 100 }}
                    />
                  </TableCell>
                  <TableCell align='right'>{product.brand}</TableCell>
                  <TableCell align='right'>{product.price}</TableCell>
                  <TableCell align='right' size='small'>
                    {product.description}
                  </TableCell>
                  <TableCell align='right'>{product.countInStock}</TableCell>
                  <TableCell align='right'>
                    <Button
                      color='primary'
                      variant='contained'
                      style={{ margin: 5 }}
                      onClick={() => modalOpen(product)}
                    >
                      <EditIcon />
                    </Button>
                    <Button
                      style={{ margin: 5 }}
                      color='secondary'
                      variant='contained'
                      onClick={() => deleteHandler(product._id)}
                    >
                      <DeleteIcon />
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default Products;

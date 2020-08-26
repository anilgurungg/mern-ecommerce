import express from 'express';
import Order from '../models/orderModel';
import { isAuth, isAdmin } from '../util';

const router = express.Router();

// Get all orders
router.get('/', isAuth, async (req, res) => {
  const orders = await Order.find({}).populate('user');
  res.send(orders);
});

// GEt own orders
router.get('/mine', isAuth, async (req, res) => {
  const orders = await Order.find({ user: req.user._id });
  res.send(orders);
});

// find one order
router.get('/:id', isAuth, async (req, res) => {
  const order = await Order.findOne({ _id: req.params.id });
  if (order) {
    res.send(order);
  } else {
    res.status(404).send({ message: 'Order not found' });
  }
});

// delete order
router.delete('/:id', isAuth, isAdmin, async (req, res) => {
  const order = await Order.findOne({ _id: req.params.id });
  if (order) {
    const deletedOrder = await order.remove();
    res.send(deletedOrder);
  } else {
    res.status(404).send('Order Not Found.');
  }
});

// create new order
router.post('/', isAuth, async (req, res) => {
  const newOrder = new Order({
    orderItems: req.body.orderItems,
    user: req.user._id,
    shipping: req.body.shipping,
    payment: req.body.payment,
    itemsPrice: req.body.itemsPrice,
    taxPrice: req.body.taxPrice,
    shippingPrice: req.body.shippingPrice,
    totalPrice: req.body.totalPrice
  });
  const newOrderCreated = await newOrder.save();
  if (newOrderCreated) {
    return res
      .status(201)
      .send({ message: 'Order created successfully', data: newOrderCreated });
  } else {
    return res.status(500).send({ message: 'Error creating order' });
  }
});

// set order as paid
router.put('/:id/pay', async (req, res) => {
  const order = await Order.findById(req.params.id);
  if (order) {
    order.isPaid = true;
    order.paidAt = Date.now();
    order.payment = {
      paymentMethod: 'Paypal'
    };

    const updatedOrder = await order.save();
    res.send({ message: 'Order paid successfully', order: updatedOrder });
  } else {
    res.status(404).send({ message: 'Order not found' });
  }
});

export default router;

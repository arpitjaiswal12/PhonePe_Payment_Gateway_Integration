const express = require('express');
const { createOrder, paymentStatus } = require('../controllers/paymentController.js');
const router = express.Router();

// Route for creating an order
router.post('/create-order', createOrder);

// Route for checking payment status
router.post('/status/:id', paymentStatus);

module.exports = router;

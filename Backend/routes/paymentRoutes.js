const express = require('express');
const { createOrder, paymentStatus } = require('../controllers/paymentController.js');
const router = express.Router();

// Route for creating an order
router.post('/create-order', createOrder);

// Route for checking payment status
router.get('/status/:transactionID', paymentStatus);

module.exports = router;

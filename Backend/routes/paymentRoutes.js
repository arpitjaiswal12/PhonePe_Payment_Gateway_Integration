const express = require('express');
const { createOrder, paymentStatus } = require('../controllers/paymentController.js');
const router = express.Router();

router.post('/create-order', createOrder);
router.post('/status', paymentStatus);

module.exports = router;

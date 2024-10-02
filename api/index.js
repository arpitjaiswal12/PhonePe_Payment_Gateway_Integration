const express = require('express');
const axios = require('axios');
const crypto = require('crypto');
const cors = require('cors');
const { v4: uuidv4 } = require('uuid');

const app = express();
app.use(express.json());
app.use(cors());

const MERCHANT_KEY = "48b460bd-1463-497b-a621-8f9f73e193cd";
const MERCHANT_ID = "M22MU4WHSIF5F";

const MERCHANT_BASE_URL = "https://api.phonepe.com/apis/hermes/pg/v1/pay";
const MERCHANT_STATUS_URL = "https://api.phonepe.com/apis/hermes/pg/v1/status";

const redirectUrl = "http://192.168.0.182:8000/status";
const successUrl = "http://192.168.0.182:5173/payment-success";
const failureUrl = "http://192.168.0.182:5173/payment-failure";

// Create Order Endpoint
app.post('/create-order', async (req, res) => {
    const { name, mobileNumber, amount } = req.body;
    const orderId = uuidv4();

    const paymentPayload = {
        merchantId: MERCHANT_ID,
        merchantUserId: name,
        mobileNumber: mobileNumber,
        amount: amount * 100, // Convert to paise
        merchantTransactionId: orderId,
        redirectUrl: `${redirectUrl}/?id=${orderId}`,
        redirectMode: 'POST',
        paymentInstrument: {
            type: 'PAY_PAGE'
        }
    };

    const payload = Buffer.from(JSON.stringify(paymentPayload)).toString('base64');
    const keyIndex = 1;
    const string = payload + '/pg/v1/pay' + MERCHANT_KEY;
    const sha256 = crypto.createHash('sha256').update(string).digest('hex');
    const checksum = sha256 + '###' + keyIndex;

    const option = {
        method: 'POST',
        url: MERCHANT_BASE_URL,
        headers: {
            accept: 'application/json',
            'Content-Type': 'application/json',
            'X-VERIFY': checksum
        },
        data: {
            request: payload
        }
    };

    try {
        const response = await axios.request(option);
        if (response.data && response.data.data && response.data.data.instrumentResponse) {
            const redirectUrl = response.data.data.instrumentResponse.redirectInfo.url;
            console.log(response.data);
            res.status(200).json({ msg: "OK", url: redirectUrl });
        } else {
            throw new Error('Unexpected response structure');
        }
    } catch (error) {
        console.error("Error in payment:", error.response ? error.response.data : error.message);
        res.status(500).json({ error: 'Failed to initiate payment' });
    }
});

// Payment Endpoint
app.post('/pay', async (req, res) => {
    const { merchantId, transactionId, merchantUserId, amount, merchantOrderId, mobileNumber, message, email, shortName, paymentScope, deviceContext } = req.body;

    // Simulate payment processing
    console.log("Processing Payment:", req.body);

    // Here you can implement actual payment logic
    // For now, we will respond with a success message
    res.status(200).json({ success: true, message: "Payment processed successfully", data: req.body });
});

// Status Endpoint
app.post('/status', async (req, res) => {
    const merchantTransactionId = req.query.id;

    const keyIndex = 1;
    const string =  `/pg/v1/status/${MERCHANT_ID}/${merchantTransactionId}` + MERCHANT_KEY;
    const sha256 = crypto.createHash('sha256').update(string).digest('hex');
    const checksum = sha256 + '###' + keyIndex;
    // console.log("Request Payload:", paymentPayload);
    console.log("Checksum:", checksum);
    // console.log("Request Options:", option);
    
    const option = {
        method: 'GET',
        url: `${MERCHANT_STATUS_URL}/${MERCHANT_ID}/${merchantTransactionId}`,
        headers: {
            accept: 'application/json',
            'Content-Type': 'application/json',
            'X-VERIFY': checksum,
            'X-MERCHANT-ID': MERCHANT_ID
        },
    };

    try {
        const response = await axios.request(option);
        if (response.data && response.data.success) {
            return res.redirect(successUrl);
        } else {
            return res.redirect(failureUrl);
        }
    } catch (error) {
        console.error("Error fetching payment status:", error.response ? error.response.data : error.message);
        return res.redirect(failureUrl);
    }
});

// Start the server
app.listen(8000, () => {
    console.log('Server is running on port 8000');
});
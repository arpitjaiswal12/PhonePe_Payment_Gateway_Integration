const axios = require('axios');
const crypto = require('crypto');
const { v4: uuidv4 } = require('uuid');
const { MERCHANT_KEY, MERCHANT_ID, MERCHANT_BASE_URL, MERCHANT_STATUS_URL, redirectUrl, successUrl, failureUrl,generateChecksum } = require('../utils/phonePeUtils.js');

// Create Order Controller
exports.createOrder = async (req, res) => {
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
        paymentInstrument: { type: 'PAY_PAGE' }
    };

    const payload = Buffer.from(JSON.stringify(paymentPayload)).toString('base64');
    const checksum = generateChecksum(payload, '/pg/v1/pay');

    const option = {
        method: 'POST',
        url: MERCHANT_BASE_URL,
        headers: { accept: 'application/json', 'Content-Type': 'application/json', 'X-VERIFY': checksum },
        data: { request: payload }
    };

    try {
        const response = await axios.request(option);
        if (response.data?.data?.instrumentResponse) {
            const redirectUrl = response.data.data.instrumentResponse.redirectInfo.url;
            res.status(200).json({ msg: "OK", url: redirectUrl });
        } else {
            throw new Error('Unexpected response structure');
        }
    } catch (error) {
        console.error("Error in payment:", error.response ? error.response.data : error.message);
        res.status(500).json({ error: 'Failed to initiate payment' });
    }
};

// Status Controller
exports.paymentStatus = async (req, res) => {
    const merchantTransactionId = req.query.id;
    const checksum = generateChecksum(`/pg/v1/status/${MERCHANT_ID}/${merchantTransactionId}`);

    const option = {
        method: 'GET',
        url: `${MERCHANT_STATUS_URL}/${MERCHANT_ID}/${merchantTransactionId}`,
        headers: { accept: 'application/json', 'Content-Type': 'application/json', 'X-VERIFY': checksum, 'X-MERCHANT-ID': MERCHANT_ID }
    };

    try {
        const response = await axios.request(option);
        return response.data?.success ? res.redirect(successUrl) : res.redirect(failureUrl);
    } catch (error) {
        console.error("Error fetching payment status:", error.response ? error.response.data : error.message);
        return res.redirect(failureUrl);
    }
};

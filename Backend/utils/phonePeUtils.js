const crypto = require('crypto');

const MERCHANT_KEY = "48b460bd-1463-497b-a621-8f9f73e193cd";
const MERCHANT_ID = "M22MU4WHSIF5F";
const MERCHANT_BASE_URL = "https://api.phonepe.com/apis/hermes/pg/v1/pay";
const MERCHANT_STATUS_URL = "https://api.phonepe.com/apis/hermes/pg/v1/status";
const redirectUrl = "http://192.168.0.182:8000/status";
const successUrl = "http://192.168.0.182:5173/payment-success";
const failureUrl = "http://192.168.0.182:5173/payment-failure";

module.exports = {
    MERCHANT_KEY, MERCHANT_ID, MERCHANT_BASE_URL, MERCHANT_STATUS_URL,
    redirectUrl, successUrl, failureUrl
};

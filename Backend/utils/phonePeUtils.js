const MERCHANT_KEY = "48b460bd-1463-497b-a621-8f9f73e193cd";
const MERCHANT_ID = "M22MU4WHSIF5F";
const MERCHANT_BASE_URL = "https://api.phonepe.com/apis/hermes/pg/v1/pay";
const MERCHANT_STATUS_URL = "https://api-preprod.phonepe.com/apis/pg-sandbox/pg/v1/status/";
const redirectUrl = "https://phone-pe-payment-gateway-integration.vercel.app/status";
const successUrl = "https://phone-pe-payment-gateway-integration.vercel.app/payment-success";
const failureUrl = "https://phone-pe-payment-gateway-integration.vercel.app/payment-failure";

module.exports = {
  MERCHANT_KEY,
  MERCHANT_ID,
  MERCHANT_BASE_URL,
  MERCHANT_STATUS_URL,
  redirectUrl,
  successUrl,
  failureUrl,
};
    
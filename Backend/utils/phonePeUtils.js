const SALT_KEY = "48b460bd-1463-497b-a621-8f9f73e193cd";
// const SALT_KEY = "099eb0cd-02cf-4e2a-8aca-3e6c6aff0399";
const MERCHANT_ID = "M22MU4WHSIF5F";
// const MERCHANT_ID = "PGTESTPAYUAT";
const MERCHANT_BASE_URL = "https://api.phonepe.com/apis/hermes/pg/v1/pay";
// const MERCHANT_BASE_URL = "https://api-preprod.phonepe.com/apis/pg-sandbox/pg/v1/pay";

const MERCHANT_STATUS_URL = "https://api-preprod.phonepe.com/apis/pg-sandbox/pg/v1/status/";
// const redirectUrl = "https://phone-pe-payment-gateway-integration.vercel.app/api/payment/status/:transactionID";
const redirectUrl = "http://localhost:8000/api/payment/status/:transactionID";
// const failureUrl = "https://phone-pe-payment-gateway-integration.vercel.app/api/payment/payment-failure";
// const successUrl = "https://phone-pe-payment-gateway-integration.vercel.app/api/payment/payment-success";
// const redirectUrl = "https://www.blackgrapessoftech.com/api/payment/status";
const successUrl = "https://apprenticeship.blackgrapessoftech.com/payment-success";
const failureUrl = "https://apprenticeship.blackgrapessoftech.com/payment-failure";

module.exports = {
  SALT_KEY,
  MERCHANT_ID,
  MERCHANT_BASE_URL,
  MERCHANT_STATUS_URL,
  redirectUrl,
  successUrl,
  failureUrl,
};
    
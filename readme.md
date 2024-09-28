# Node.js PhonePe Payment Gateway Integration

Welcome to the Node.js Express PhonePe Payment Gateway Integration repository! This project demonstrates the seamless integration of the PhonePe payment gateway into a Node.js and Express application. Follow the comprehensive guide below to set up the payment gateway for User Acceptance Testing (UAT).

## Features

/create-order API: Initiate payments and redirect users to the PhonePe payment flow.
/status: Validate payment status using merchantTransactionId.

## UAT Testing Credentials

For testing purposes in the UAT environment, use the following credentials:

Card number: `378282246310005`
Expiry month: `05`
Expiry year: `26`
CVV: `745`
OTP: `123456`

## How to Run

Clone the project:
`https://github.com/arpitjaiswal12/PhonePe_Payment_Gateway_Integration.git`

Install dependencies:
`npm install`

Run the app in frontend as well in api:
`npm run start`

Open in your browser:
`http://localhost:8000/create-order`


## API Endpoints
**/create-order API**: Initiate payments.
Method: POST
Endpoint: /create-order
Parameters: name, number, amount from req.body

**/status** API: Validate payment status.
Method: POST
Endpoint: /status

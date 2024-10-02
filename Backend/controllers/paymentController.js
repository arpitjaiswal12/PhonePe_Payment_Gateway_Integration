const axios = require("axios");
const crypto = require("crypto");
const { v4: uuidv4 } = require("uuid");
const {
  MERCHANT_KEY,
  MERCHANT_ID,
  MERCHANT_BASE_URL,
  MERCHANT_STATUS_URL,
  redirectUrl,
  successUrl,
  failureUrl,
} = require("../utils/phonePeUtils.js");

// Create Order Controller with improved error handling
exports.createOrder = async (req, res) => {
  try {
    const { name, mobileNumber, amount } = req.body;

    // Validate request body
    if (!name || !mobileNumber || !amount) {
      return res
        .status(400)
        .json({ error: "Missing required fields: name, mobileNumber, amount" });
    }

    const orderId = uuidv4();
    const paymentPayload = {
      merchantId: MERCHANT_ID,
      merchantUserId: name,
      mobileNumber: mobileNumber,
      amount: amount * 100, // Convert to paise
      merchantTransactionId: orderId,
      redirectUrl: `${redirectUrl}/?id=${orderId}`,
      redirectMode: "POST",
      paymentInstrument: { type: "PAY_PAGE" },
    };

    const payload = Buffer.from(JSON.stringify(paymentPayload)).toString(
      "base64"
    );
    const keyIndex = 1;
    const string = payload + "/pg/v1/pay" + MERCHANT_KEY;
    const sha256 = crypto.createHash("sha256").update(string).digest("hex");
    const checksum = sha256 + "###" + keyIndex;

    const option = {
      method: "POST",
      url: MERCHANT_BASE_URL,
      headers: {
        accept: "application/json",
        "Content-Type": "application/json",
        "X-VERIFY": checksum,
      },
      data: { request: payload },
    };

    const response = await axios.request(option);

    if (response.data?.data?.instrumentResponse) {
      const redirectUrl =
        response.data.data.instrumentResponse.redirectInfo.url;
      res.status(200).json({ msg: "OK", url: redirectUrl });
    } else {
      throw new Error("Unexpected response structure from payment gateway");
    }
  } catch (error) {
    console.error("Error creating order:", error);

    // Handle Axios errors (network issues, bad responses)
    if (error.response) {
      return res.status(error.response.status || 500).json({
        error: `Payment Gateway Error: ${
          error.response.data?.message || "Unexpected error"
        }`,
      });
    }

    // Handle other errors
    return res.status(500).json({
      error: `Failed to initiate payment: ${
        error.message || "Internal Server Error"
      }`,
    });
  }
};

// Status Controller with improved error handling
exports.paymentStatus = async (req, res) => {
  try {
    const merchantTransactionId = req.query.id;

    // Validate request query
    if (!merchantTransactionId) {
      return res.status(400).json({ error: "Missing merchant transaction ID" });
    }

    const keyIndex = 1;
    const string = `/pg/v1/status/${MERCHANT_ID}/${merchantTransactionId}` + MERCHANT_KEY;
    const sha256 = crypto.createHash('sha256').update(string).digest('hex');
    const checksum = sha256 + '###' + keyIndex;

    const option = {
      method: "GET",
      url: `${MERCHANT_STATUS_URL}/${MERCHANT_ID}/${merchantTransactionId}`,
      headers: {
        accept: "application/json",
        "Content-Type": "application/json",
        "X-VERIFY": checksum,
        "X-MERCHANT-ID": MERCHANT_ID,
      },
    };

    const response = await axios.request(option);

    if (response.data?.success) {
      return res.redirect(successUrl);
    } else {
      return res.redirect(failureUrl);
    }
  } catch (error) {
    console.error("Error fetching payment status:", error);

    // Handle Axios errors
    if (error.response) {
      return res.status(error.response.status || 500).json({
        error: `Payment Gateway Error: ${
          error.response.data?.message || "Unexpected error"
        }`,
      });
    }

    // Handle other errors
    return res.status(500).json({
      error: `Failed to fetch payment status: ${
        error.message || "Internal Server Error"
      }`,
    });
  }
};

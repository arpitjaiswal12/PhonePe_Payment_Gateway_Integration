const axios = require("axios");
const crypto = require("crypto");
const { v4: uuidv4 } = require("uuid");
const {
  SALT_KEY,
  MERCHANT_ID,
  MERCHANT_BASE_URL,
  MERCHANT_STATUS_URL,
  redirectUrl,
  successUrl,
  failureUrl,
} = require("../utils/phonePeUtils.js");

// Create Order Controller
exports.createOrder = async (req, res) => {
  console.log("creating order")
  try {
    const { name, mobileNumber, amount, transactionID } = req.body;

    // Validate request body
    if (!name || !mobileNumber || !amount) {
      return res
        .status(400)
        .json({ error: "Missing required fields: name, mobileNumber, amount" });
    }

    const MUID = "MUID" + uuidv4();
    const tId =  transactionID || Math.floor(10000 + Math.random() * 10000);
    console.log("transaction ID ", tId );
    const paymentPayload = {
      merchantId: MERCHANT_ID,
      merchantTransactionId: tId,
      merchantUserId: MUID,
      name: name,
      mobileNumber: mobileNumber,
      amount: amount * 100, // Convert to paise
      redirectUrl: `${redirectUrl}/${tId}`,
      redirectMode: "POST",
      paymentInstrument: { type: "PAY_PAGE" },
    };

    // Convert the payload to base64 and generate checksum
    const payload = Buffer.from(JSON.stringify(paymentPayload)).toString(
      "base64"
    );
    const keyIndex = 1;
    const stringToHash = payload + "/pg/v1/pay" + SALT_KEY;
    const sha256 = crypto
      .createHash("sha256")
      .update(stringToHash)
      .digest("hex");
    const checksum = sha256 + "###" + keyIndex;

    // Set the request options
    const options = {
      method: "POST",
      url: MERCHANT_BASE_URL,
      headers: {
        accept: "application/json",
        "Content-Type": "application/json",
        "X-VERIFY": checksum,
      },
      data: { request: payload },
    };

    // Make the request to PhonePe API
    const response = await axios.request(options);

    // If successful, return the redirect URL
    if (response.data?.data?.instrumentResponse) {
      const redirectUrl =
        response.data.data.instrumentResponse.redirectInfo.url;
      res.status(200).json({ msg: "OK", url: redirectUrl });
    } else {
      throw new Error("Unexpected response structure from payment gateway");
    }
  } catch (error) {
    // console.error("Error creating order:", error);

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
      error: `Failed to initiate payment: ${
        error.message || "Internal Server Error"
      }`,
    });
  }
};

// Status Controller
exports.paymentStatus = async (req, res) => {
  try {
    const merchantTransactionId = req.params.id;
    const merchantId = MERCHANT_ID;
    console.log("merchantTransactionId-->>" + merchantTransactionId);
    console.log("merchantId-->" + merchantId);

    // Validate merchantTransactionId
    if (!merchantTransactionId) {
      return res.status(400).json({ error: "Missing merchant transaction ID" });
    }
    if (!merchantId) {
      return res.status(400).json({ error: "Missing merchantID" });
    }

    // Generate the checksum for the status request
    const keyIndex = 1;
    const stringToHash =
      `/pg/v1/status/${merchantId}/${merchantTransactionId}` + SALT_KEY;
    const sha256 = crypto
      .createHash("sha256")
      .update(stringToHash)
      .digest("hex");
    const checksum = sha256 + "###" + keyIndex;
    // console.log(checksum)

    // Set the request options
    const options = {
      method: "GET",
      url: `${MERCHANT_STATUS_URL}/${merchantId}/${merchantTransactionId}`, // Make sure the URL is correct
      headers: {
        accept: "application/json",
        "Content-Type": "application/json",
        "X-VERIFY": checksum,
        "X-MERCHANT-ID": `${merchantId}`,
      },
    };

    // Make the request to PhonePe API
    const response = await axios.request(options);
    // console.log(response.data);

    // Handle success or failure based on the response
    if (response.data?.success) {
      return res.redirect(successUrl);
    } else {
      return res.redirect(failureUrl);
    }
  } catch (error) {
    // console.error("Error fetching payment status:", error);

    // Handle Axios errors
    if (error.response) {
      console.log(error.response)
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

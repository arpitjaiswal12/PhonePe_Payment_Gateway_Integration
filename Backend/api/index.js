const express = require("express");
const cors = require("cors");
const paymentRoutes = require("../routes/paymentRoutes.js");

const app = express();

app.use(
  cors({
    origin: "*",
    credentials: true,
  })
);

// Allowing CORS for all origins
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use((req, res, next) => {
  res.setHeader("Referrer-Policy", "strict-origin-when-cross-origin");
  res.setHeader("Cross-Origin-Opener-Policy", "same-origin");
  next();
});

app.use("/api/payment", paymentRoutes);

// Basic route for testing server
app.get("/", (req, res) => {
  res.send(`
    <html>
  <head>
    <link href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css" rel="stylesheet">
    <style>
      body {
        font-family: 'Helvetica Neue', Arial, sans-serif;
      }
    </style>
  </head>
  <body class="bg-gradient-to-br from-purple-400 to-blue-500 flex flex-col items-center justify-center h-screen">
    <div class="message-container bg-white shadow-lg rounded-lg p-6 text-center mb-4">
      <h1 class="text-4xl font-extrabold text-purple-700 mb-4">🚧 Website Under Maintenance</h1>
      <p class="text-gray-700 text-lg">Thank you for visiting Black Grapes. We are currently improving your experience. We'll be back online soon. Stay tuned!</p>
      <div class="training-section m-6">
        <h2 class="text-xl font-bold text-blue-600 mb-2">📚 Software Training Program</h2>
        <p class="text-gray-600 mb-4">You can visit our Software Training Program for more details:</p>
        <a href="https://apprenticeship.blackgrapessoftech.com/" target="_blank" 
           class="inline-block bg-blue-500 text-white font-semibold py-2 px-4 rounded hover:bg-blue-600 transition duration-200">
           Visit Now
        </a>
      </div>
    </div>

    

    <div class="contact-section bg-white shadow-lg rounded-lg p-8 w-full max-w-md">
      <h2 class="text-3xl font-bold text-purple-600 mb-6">📞 Contacts</h2>
      <div class="flex items-start mb-4">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-purple-600 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h18v18H3V3z"/>
        </svg>
        <div>
          <h3 class="font-semibold text-gray-800">Phone:</h3>
          <p class="text-gray-600">6269414463, 9109913534, 8717854689</p>
        </div>
      </div>

      <div class="flex items-start mb-4">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-purple-600 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 12v4m0 -4V8m0 8H8m8 0H12m4 4H8m8 -4v4m0 -8H8m8 0H12"/>
        </svg>
        <div>
          <h3 class="font-semibold text-gray-800">Email:</h3>
          <p class="text-gray-600">hr.blackgrapesgroup1@gmail.com, hr.blackgrapesgroup2@gmail.com</p>
        </div>
      </div>

      <div class="flex items-start">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-purple-600 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 22V12m0 0L7.5 16.5M12 12l4.5 4.5"/>
        </svg>
        <div>
          <h3 class="font-semibold text-gray-800">Address:</h3>
          <p class="text-gray-600">252-F/H, Scheme No 54, Vijay Nagar, Indore, Madhya Pradesh 452010, India</p>
        </div>
      </div>
    </div>
  </body>
</html>
  `);
});

app.get("/success-payment", (req, res) => {
  res.send(`<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Payment Success</title>
  <script src="https://cdn.tailwindcss.com"></script>
</head>
<body style="font-family: Arial, sans-serif; background-color: #f3f4f6; display: flex; justify-content: center; align-items: center; min-height: 100vh;">

  <div style="background-color: #ffffff; border-radius: 8px; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); padding: 20px; text-align: center; max-width: 400px;">
    <svg xmlns="http://www.w3.org/2000/svg" class="h-20 w-20 text-green-500 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" style="stroke-width: 2;">
      <path stroke-linecap="round" stroke-linejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
    <h1 style="font-size: 1.5rem; font-weight: 700; color: #1f2937;">Payment Successful</h1>
    <p style="font-size: 1rem; color: #6b7280; margin-top: 0.5rem;">
      Thank you for your payment! Your transaction has been completed.
    </p>
    <a href="https://apprenticeship.blackgrapessoftech.com/" style="margin-top: 20px; background-color: #10b981; color: #ffffff; padding: 10px 20px; border-radius: 4px; font-size: 1rem; font-weight: 500; text-decoration: none; display: inline-block; transition: background-color 0.3s ease;">
  Back to Home
</a>
  </div>

</body>
</html>
`);
});

app.get("/faliure-payment", (req, res) => {
  res.send(`<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Payment Failed</title>
  <script src="https://cdn.tailwindcss.com"></script>
</head>
<body style="font-family: Arial, sans-serif; background-color: #f3f4f6; display: flex; justify-content: center; align-items: center; min-height: 100vh;">

  <div style="background-color: #ffffff; border-radius: 8px; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); padding: 20px; text-align: center; max-width: 400px;">
    <svg xmlns="http://www.w3.org/2000/svg" class="h-20 w-20 text-red-500 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" style="stroke-width: 2;">
      <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
    </svg>
    <h1 style="font-size: 1.5rem; font-weight: 700; color: #1f2937;">Payment Failed</h1>
    <p style="font-size: 1rem; color: #6b7280; margin-top: 0.5rem;">
      Unfortunately, your payment was not successful. Please try again or contact support.
    </p>
    <a href="https://apprenticeship.blackgrapessoftech.com/checkout" style="margin-top: 20px; background-color: #ef4444; color: #ffffff; padding: 10px 20px; border-radius: 4px; font-size: 1rem; font-weight: 500; text-decoration: none; display: inline-block; transition: background-color 0.3s ease;">
  Retry Payment
</a>
    
  </div>

</body>
</html>
`);
});

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

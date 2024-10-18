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

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

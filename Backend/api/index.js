const express = require("express");
const cors = require("cors");
const paymentRoutes = require("./routes/paymentRoutes.js");

const app = express();
app.use(express.json());

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
  res.send("Introduction to the backend");
});

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

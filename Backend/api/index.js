const express = require("express");
const cors = require("cors");
const paymentRoutes = require("../routes/paymentRoutes.js");

const app = express();
app.use(express.json());

app.use(
  cors({
    origin: "*",
    credentials: true,
  })
); //imp
app.use(express.urlencoded({extended: false}));
app.use(express.json());

app.use("/api/payment", paymentRoutes);

app.get("/", (req, res) => {
  res.send("Introduction to the backend");
});

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

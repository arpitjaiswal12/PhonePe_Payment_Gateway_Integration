const express = require('express');
const cors = require('cors');
const paymentRoutes = require('../routes/paymentRoutes.js');

const app = express();
app.use(express.json());
app.use(cors());

app.use('/api/payment', paymentRoutes);

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

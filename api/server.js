const express = require('express');
const axios = require('axios');
const crypto = require('crypto');
const cors = require("cors");
const { v4: uuidv4 } = require('uuid');

const app = express();

app.use(express.json());
app.use(cors());

app.listen(8000, () => {
  console.log('Server is running on port 8000');
});

require('dotenv').config();

const express = require('express');
const cors = require('cors');
const port = process.env.PORT;

const app = express();

// Connect DB
const db = require('./config/db');
db.connect();

// Body parser middleware
app.use(
    express.urlencoded({
        extended: true,
    }),
);
app.use(express.json());

// CORS
app.use(cors());

// Route
const router = require('./route');

app.use('/api/v1', router);


app.listen(port, "10.6.48.227", () => {
  console.log(`Server listening on ${port}`);
});

require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require('body-parser');
const cors = require('cors'); // Import the cors middleware

const usersRoutes = require('./routes/users');

// Create an Express app
const app = express();

app.use(cors())


// app.use(cors({
//   origin: 'http://localhost:3000', // Update with your frontend URL
//   credentials: true, // Allow sending cookies with the request
// }));

// Body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

MONGO_URI = process.env.MONGO_URI;

// Set up the MongoDB connection
mongoose
  .connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.error("Error connecting to MongoDB:", err);
  });

  // Use routes
app.use( '/api/users', usersRoutes);


// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

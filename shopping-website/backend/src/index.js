const express = require('express');
const morgan = require('morgan');
const apiRouter = require('./routes/api');
const mongoose = require('mongoose');
const productRouter = require('./routes/product');
const newsRouter = require('./routes/news');





const app = express();


const PORT = 3000;

// Middleware for logging HTTP requests
app.use(morgan('dev'));

// Middleware for parsing JSON requests
app.use(express.json());
app.use('/api', productRouter)
app.use('/api/news', newsRouter)
const mongoURI = "mongodb+srv://kushagramrai:cSeadr9zJbZV27D7@cluster0.v9pgu.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"

// Connect to MongoDB Atlas
mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("Connected to MongoDB Atlas"))
  .catch(err => console.error("Error connecting to MongoDB Atlas:", err));




app.use('/api', apiRouter);

// Basic route
app.get('/', (req, res) => {
    res.send('Hello, World!');
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

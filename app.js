
const express = require('express')
const morgan = require('morgan');
const path = require('path');

const dotenv = require('dotenv');

const app =express();
const toursroutes = require('./routes/tourRoutes')
const usersroutes = require('./routes/userRoutes')



const connectDB = require('./config/db');


// Load env vars
dotenv.config({ path: './config/config.env' });

// Connect to database
connectDB();

app.use(express.json())

app.use(express.static(`${__dirname}/public`));



// 1) MIDDLEWARES
if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
  }

  app.use('/api/v1/tours', toursroutes);
  app.use('/api/v1/users', usersroutes);


  const PORT = process.env.PORT || 3000;

  const server = app.listen(
    PORT,
    console.log(
      `Server running in ${process.env.NODE_ENV} mode on port ${PORT}`
    )
  );
  
  // Handle unhandled promise rejections
  process.on('unhandledRejection', (err, promise) => {
    console.log(`Error: ${err.message}`);
    // Close server & exit process
    // server.close(() => process.exit(1));
  });
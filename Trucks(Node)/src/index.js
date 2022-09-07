const express = require('express');
const morgan = require('morgan');

const app = express();
const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://Pidhorodetskyi:lock1234@cluster0.vh1l6r0.mongodb.net/uber?retryWrites=true&w=majority',);

const { trucksRouter } = require('./routers/trucksRouter');
const { usersRouter } = require('./routers/usersRouter');
const { authRouter } = require('./routers/authRouter');
const { authMiddleware } = require('./middleware/authMiddleware');
const { loadsRouter } = require('./routers/loadsRouter');

app.use(express.json());
app.use(morgan('tiny'));

app.use('/api/trucks', authMiddleware, trucksRouter);
app.use('/api/users', authMiddleware, usersRouter);
app.use('/api/loads', authMiddleware, loadsRouter);
app.use('/api/auth', authRouter);

const start = async () => {
  try {
    app.listen(8080);
  } catch (err) {
    console.error(`Error on server startup: ${err.message}`);
  }
};

start();

// ERROR HANDLER
function errorHandler(err, req, res) {
  console.error(err);
  res.status(500).send({ message: 'string500' });
}

app.use(errorHandler);

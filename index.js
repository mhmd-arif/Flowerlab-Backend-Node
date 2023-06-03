import process from 'process';
import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';

import getenv from './src/helpers/getenv.js';
import errorHandler from './src/middlewares/errorHandler.js';

import usersRouter from "./src/routes/usersRoute.js";
import authRouter from "./src/routes/authRoute.js";
import flowerRouter from "./src/routes/flowersRoute.js";

const app = express();

const PORT = process.env.PORT;
const MONGO_URI = getenv('MONGO_URI');

mongoose
  .connect(MONGO_URI)
  .then(() => console.log('Connected to mongodb'))
  .catch((err) => {
    console.error(`Can't connect to mongodb`);
    console.error(err);
    process.exit(1);
  });

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

app.get('/', (req, res) => {
  res.send('flowerlab rest api');
});

app.use('/auth', authRouter);
app.use('/users', usersRouter);
app.use('/flowers', flowerRouter);

app.use(errorHandler);

app.listen(PORT, () => console.info(`Server running on ${PORT}`));

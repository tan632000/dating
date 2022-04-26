/* eslint-disable no-console */
require('dotenv').config();
const path = require('path');
const fs = require('fs');
const express = require('express');
const jwt = require('jsonwebtoken');

const app = express();
const router = express.Router();
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const cors = require('cors');
const authRouter = require('./routes/auth');

app.use(cors());
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
const db = require('./model');

const { User } = db;

app.get('/', (req, res) => {
    res.redirect('/login');
});
app.use('/auth', authRouter);
app.use('/api/v1', require('./middleware/authorization'), router);

db.sequelize.sync();

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});

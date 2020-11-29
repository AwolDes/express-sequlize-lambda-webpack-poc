const dotenv = require('dotenv');
const express = require('express');
const cors = require('cors');
const { OrgRouter } = require('./routes/organisations');

dotenv.config();

const app = express();

const corsOptions = {
  origin: '*',
  optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
};

app.use(cors(corsOptions));

app.use('/organisations', OrgRouter);

export const getServer = async () => app;

export default app;

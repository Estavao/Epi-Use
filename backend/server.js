const express = require("express");
const mongoose = require('mongoose'); 
const cors = require('cors')
const bodyParser = require("body-parser");
const router = require('./routes/router');
require('dotenv/config')

const app = express();

app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ limit: '10mb', extended: true }));

const corsOptions = {
  origin: '*',
  credentials: true,
  optionSuccessStatus: 200
}

app.use(cors(corsOptions))
app.use('/Employee', router);

const dbOptions = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

mongoose.connect(process.env.DB_URI, dbOptions)
  .then(() => console.log('DB Connected!'))
  .catch((err) => {
    console.error(err);
    process.exit(1); 
  });

const port = process.env.PORT || 4000;
const Server = app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

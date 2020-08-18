const express = require('express');
const upload = require('express-fileupload');
const cors = require('cors');
const bodyParser = require('body-parser');
const logger = require('morgan');
const app = express();

app.use(upload());
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(logger('dev'));

// add routes
require('./routes/api.js')(app);

// start app 
const port = process.env.PORT || 3000;

app.listen(port, () =>
  console.log(`App is listening on port ${port}.`)
);
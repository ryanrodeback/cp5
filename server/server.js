const express = require('express');
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));

const mongoose = require('mongoose');

// connect to the database
mongoose.connect('mongodb://localhost:27017/stockDB', {
  useNewUrlParser: true
});

const cookieParser = require("cookie-parser");
app.use(cookieParser());


const users = require("./users.js");
app.use("/api/users", users.routes);

const photos = require("./photos.js");
app.use("/api/photos", photos.routes);

const comments = require("./comments.js");
app.use("/api/comments", comments.routes);

const stock = require("./stock.js");
app.use("/api/stock", stock.routes);

app.listen(3001, () => console.log('Server listening on port 3001!'));
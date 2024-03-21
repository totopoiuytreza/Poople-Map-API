var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var bodyParser = require('body-parser');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var cors = require('cors')

var app = express();
const PORT = process.env.PORT || 5555;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors({
    "origin": process.env.FRONT_DOMAIN_NAME,
    "methods": "GET,PATCH,POST,PUT,DELETE,OPTIONS",
    "allowedHeaders": "X-Requested-With,Content-Type,Authorization",
}))

app.listen(PORT, (error) =>{
  if(!error)
      console.log("Server is Successfully Running, and App is listening on port "+ PORT)
  else 
      console.log("Error occurred, server can't start", error);
  }
);

app.use('/', indexRouter);
app.use('/users', usersRouter);

/* BEGIN db initialization */
const Sequelize = require('./db.connection');
const connection = Sequelize.connection;
/* END db initialization */


try{ 
  connection.authenticate()
}
catch(error){
  console.log("Unable to connect to the database:", error);
}


module.exports = app;

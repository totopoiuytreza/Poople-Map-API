var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors');
require('dotenv').config();


/* Initialize all router */
var indexRouter = require('./routes/index');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(cors({
  origin: '*'
}));

app.listen(3001, () => {
  console.log("Example app listening at port 3001!");

})

/* Use all router */
app.use('/', indexRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

/* BEGIN db initialization */
const Sequelize = require("./db.connection");
const connection = Sequelize.connection;


/* END db initialization */

/* Synchronize database and add relationships */
const User = require("./models/user.model.js")(connection, Sequelize.library);
const Session = require("./models/session.model.js")(connection, Sequelize.library);
const Location = require("./models/location.model.js")(connection, Sequelize.library);
const Rating = require("./models/rating.model.js")(connection, Sequelize.library);

User.sync({force: false}, {alter: true});
Session.sync({ force: false, alter: true });
Location.sync({force: false}, {alter: true});
Rating.sync({ force: false, alter: true });

Rating.belongsTo(Location, {as: "location", foreignKey: "id_location", onDelete: 'cascade'});
Location.belongsTo(User, {as: "user", foreignKey: "id_user", onDelete: 'cascade'});
Session.belongsTo(User, {as: "user", foreignKey: "id_user", onDelete: 'cascade'});

module.exports = app;

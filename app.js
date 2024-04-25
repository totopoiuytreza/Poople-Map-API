var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors');
require('dotenv').config();


/* Initialize all router */
var userRouter = require('./routes/user');
var locationRouter = require('./routes/location');
var ratingRouter = require('./routes/rating');
var authRouter = require('./routes/auth');

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

app.listen(3000, () => {
  console.log("Example app listening at port 3000!");

})

/* Use all router */
app.use('/user', userRouter);
app.use('/location', locationRouter);
app.use('/rating', ratingRouter);
app.use('/auth', authRouter);


app.get('/', (req, res) => { return res.send('Hello! Welome to the Poople-map API !') })

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

Rating.belongsTo(Location, {as: "locations", foreignKey: "id_location", onDelete: 'cascade'});
Location.belongsTo(User, {as: "users", foreignKey: "id_user", onDelete: 'cascade'});
Session.belongsTo(User, {as: "users", foreignKey: "id_user", onDelete: 'cascade'});

module.exports = app;

var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var passport = require("passport");
var session = require('express-session');
var mongoose = require('mongoose');

// Connect to mongo
mongoose.connect('mongodb+srv://b03902130:leo19941227@webprog2019-ikmvq.mongodb.net/midterm?retryWrites=true', {
	useNewUrlParser: true
});
db = mongoose.connection;
db.on('error', error => {
	console.log(error)
});

var authRouter = require("./routes/auth");
var axiosRouter = require("./routes/axios");

var app = express();

if (process.argv[2] === "double") {
	app.locals.double = true;
	console.log("debug mode: double servers");
}
else {
	app.locals.double = false;
	console.log("single server mode");
}

// only for development
var cors = require('cors');
app.use(cors({
  origin: ['http://localhost:1227'],
	methods: ['GET', 'POST'],
	credentials: true // enable set cookie
}));

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(session({ secret: "meowmeowmeowmeowmeow", resave: false, saveUninitialized: false }));
// app.use(express.static(path.join(__dirname, "../frontend/build/")));
app.use(express.static(path.join(__dirname, "public/")));

app.use(passport.initialize());
require("./config/passport");

app.use("/auth", authRouter);
app.use("/axios", axiosRouter);
app.get('*', function(req, res){
	res.status(200).sendfile(path.join(__dirname, "public/index.html"));
});

// catch 404 and forward to error handler
app.use(function (req, res, next) {
	next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
	// set locals, only providing error in development
	res.locals.message = err.message;
	res.locals.error = req.app.get("env") === "development" ? err : {};

	// render the error page
	res.status(err.status || 500);
	res.render("error");
});

module.exports = app;

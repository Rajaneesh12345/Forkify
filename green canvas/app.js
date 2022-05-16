const path = require("path");
const express = require("express");
const expressLayouts = require("express-ejs-layouts");
const formRouter = require("./routes/formRouter");
const {
	globalErrorHandler,
	AppError,
} = require("./controllers/errorController");

const app = express();

// Body parser, reading data from body into req.body
app.use(express.json());
app.use(express.urlencoded({ extended: true, limit: "10kb" }));

//static files
// app.use(express.static(path.join(__dirname, "docs")));
app.use(express.static(path.join(__dirname, "public")));

app.use(expressLayouts);
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use("/", formRouter);
app.all("*", (req, res, next) => {
	next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

app.use(globalErrorHandler);

module.exports = app;

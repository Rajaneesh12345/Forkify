// Errors
class AppError extends Error {
	constructor(message, statusCode) {
		super(message);

		this.statusCode = statusCode;
		this.status = `${statusCode}`.startsWith("4") ? "fail" : "error";
		Error.captureStackTrace(this, this.constructor);
	}
}

const handleCastErrorDB = err => {
	const message = `Invalid ${err.path}: ${err.value}.`;
	return new AppError(message, 400);
};

// for emails in data
const handleDuplicateFieldsDB = err => {
	const value = err.errmsg.match(/(["'])(\\?.)*?\1/)[0];
	console.log(value);

	const message = `Duplicate field value: ${value}. Please use another value!`;
	return new AppError(message, 400);
};

// validation errors
const handleValidationErrorDB = err => {
	const errors = Object.values(err.errors).map(el => el.message);

	const message = `Invalid input data. ${errors.join(". ")}`;
	return new AppError(message, 400);
};

// message displayed in development mode
const sendErrorDev = (err, req, res) => {
	if (req.originalUrl.startsWith("/")) {
		return res.status(err.statusCode).json({
			status: err.status,
			error: err,
			message: err.message,
			stack: err.stack,
		});
	}
	return res.status(err.statusCode).render("error", {
		title: "Something went wrong!",
		msg: err.message,
	});
};

const globalErrorHandler = (err, req, res, next) => {
	err.statusCode = err.statusCode || 500;
	err.status = err.status || "error";

	sendErrorDev(err, req, res);
};

module.exports = { globalErrorHandler, AppError };

const mongoose = require("mongoose");
const validator = require("validator");
// Amount, Full Name, Date, Time, Items/Particulars Description, Phone, Email

const formSchema = new mongoose.Schema({
	firstName: {
		type: String,
		required: [true, "Please enter your first name"],
	},
	lastName: {
		type: String,
	},
	date: {
		type: Date,
		default: Date.now,
	},
	description: {
		type: String,
		maxlength: 100,
	},
	phone: {
		type: Number,
		minlength: 10,
		maxlength: 10,
		required: [true, "Please enter your mombile number"],
	},
	email: {
		type: String,
		required: [true, "Please provide your email"],
		unique: true,
		lowercase: true,
		validate: [validator.isEmail, "Please provide a valid email"],
	},
	amount: {
		type: Number,
	},
});
// formSchema.pre("save", async function (next) {
// 	next();
// });

module.exports = mongoose.model("Form", formSchema);

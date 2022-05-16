const express = require("express");

const formController = require("../controllers/formController");
const pdfkit = require("../controllers/pdfController");
const router = express.Router();

router
	.route("/")
	.get(formController.renderForm)
	.post(formController.submitForm, formController.viewForm);

router.route("/download").post(pdfkit.pdfMake);

module.exports = router;

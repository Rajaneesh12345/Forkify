const express = require("express");

const formController = require("../controllers/formController");
const router = express.Router();

router
	.route("/")
	.get(formController.renderForm)
	.post(formController.submitForm, formController.viewForm);

router.route("/download").post(formController.pdfOptions);

module.exports = router;

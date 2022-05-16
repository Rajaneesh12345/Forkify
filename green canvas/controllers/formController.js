const Form = require("../models/formModel");
const pdf = require("html-pdf");
const ejs = require("ejs");
const path = require("path");

exports.renderForm = async (req, res, next) => {
	res.render("formPage", {
		title: "Billing", //page title
		action: "/", //post action for the form
		fields: [
			{
				name: "firstName",
				label: "First Name",
				type: "text",
				property: "required",
			}, //first field for the form
			{ name: "lastName", label: "Last Name", type: "text" },
			{ name: "email", label: "Email", type: "email", property: "required" },
			{ name: "phone", label: "Phone", type: "number", property: "required" },
			{ name: "amount", label: "amount", type: "number", property: "required" },
			// { name: "description", type: "textarea", property: "required" }, //another field for the form
		],
	});
};

exports.submitForm = async (req, res, next) => {
	const forms = await Form.create({
		firstName: req.body.firstName,
		lastName: req.body.lastName,
		email: req.body.email,
		phone: req.body.phone,
		amount: req.body.amount,
		description: req.body.description,
	});
	req.id = forms._id;
	next();
	// console.log("hell man", req.body);
};
exports.viewForm = async (req, res, next) => {
	const form = await Form.findById(req.id);
	// console.log(form);
	res.render("resultPage", {
		title: "download",
		action: "/download",
		form,
	});
};

// exports.pdfOptions = (req, res, next) => {
// 	const filename = Date.now() + "_doc" + ".pdf";
// 	// console.log(req.body, filename);
// 	ejs.renderFile(
// 		path.join(__dirname, "../views/", "index.ejs"),
// 		{ file: req.body },
// 		(err, data) => {
// 			if (err) {
// 				res.send(err);
// 			} else {
// 				let options = {
// 					format: "A4",
// 					orientation: "portrait",
// 					// border: {
// 					// 	top: req.body.margin + "px",
// 					// 	bottom: req.body.margin + "px",
// 					// 	left: req.body.margin + "px",
// 					// 	right: req.body.margin + "px",
// 					// },
// 				};
// 				if (req.body.header === "on")
// 					options.header = {
// 						height: "25mm",
// 						contents: `<div style="text-align: center;font-size:${
// 							req.body.font_size + "px"
// 						}">${
// 							req.body.header_text ? req.body.header_text : "Your Invoice"
// 						}</div><hr class="m-5" />`,
// 					};
// 				if (req.body.footer === "on") {
// 					options.footer = {
// 						height: "45mm",
// 						contents: `<footer class="mt-5 container m-3 text-center" style="font-size:${
// 							req.body.font_size + "px"
// 						}">${
// 							req.body.footer_text ? req.body.footer_text : "The end amma"
// 						}</footer>`,
// 					};
// 				}
// 				pdf
// 					.create(data, options)
// 					.toFile(`./public/files/${filename}`, function (err, data) {
// 						if (err) res.send(err);
// 						else {
// 							const filepath = "http://localhost:8000/files/" + filename;
// 							// console.log(filepath);
// 							res.render("download.ejs", {
// 								title: "Download",
// 								path: filepath,
// 							});
// 						}
// 					});
// 			}
// 		}
// 	);
// };

// exports.finalDownload = (req, res, next) => {
// 	res.render("download.ejs", {
// 		title: "Download",
// 	});
// };

// var pdf = require("html-pdf");
// import aws from "aws-sdk";
// const s3 = new aws.S3();

// pdf.create(html).toStream(function (err, stream) {
// 	stream.pipe(fs.createWriteStream("foo.pdf"));
// 	const params = {
// 		Key: "foo.pdf",
// 		Body: stream,
// 		Bucket: "Bucket Name",
// 		ContentType: "application/pdf",
// 	};
// 	s3.upload(params, (err, res) => {
// 		if (err) {
// 			console.log(err, "err");
// 		}
// 		console.log(res, "res");
// 	});
// });

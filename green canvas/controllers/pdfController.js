const PdfPrinter = require("pdfmake");
const fs = require("fs");

const fonts = {
	Roboto: {
		normal: "./fonts/roboto/Roboto-Regular.ttf",
		bold: "./fonts/roboto/Roboto-Medium.ttf",
		italics: "./fonts/roboto/Roboto-Italic.ttf",
		bolditalics: "./fonts/roboto/Roboto-MediumItalic.ttf",
	},
	Helvetica: {
		normal: "./fonts/helvetica/Helvetica.ttf",
		bold: "./fonts/helvetica/Helvetica-Bold.ttf",
		// italics: "./fonts/helvetica/Helvetica-Italic.ttf",
		// bolditalics: "./fonts/helvetica/Helvetica-MediumItalic.ttf",
	},
	Times: {
		normal: "./fonts/times/OPTITimes-Roman.otf",
		// bold: "./fonts/times/OPTITimes-Roman-Bold.otf",
	},
};
// const fonts = {
// 	Courier: {
// 		normal: "Courier",
// 		bold: "Courier-Bold",
// 		italics: "Courier-Oblique",
// 		bolditalics: "Courier-BoldOblique",
// 	},
// 	Helvetica: {
// 		normal: "Helvetica",
// 		bold: "Helvetica-Bold",
// 		italics: "Helvetica-Oblique",
// 		bolditalics: "Helvetica-BoldOblique",
// 	},
// 	Times: {
// 		normal: "Times-Roman",
// 		bold: "Times-Bold",
// 		italics: "Times-Italic",
// 		bolditalics: "Times-BoldItalic",
// 	},
// };
// const req = require("express/lib/request");

exports.pdfMake = (req, res, next) => {
	// console.log(req.body);
	const font = req.body.font_family;
	const printer = new PdfPrinter(fonts);
	const milliSec = Date.now();
	const dateNow = `${new Date(milliSec)}`;
	const ar = dateNow.split(" ");
	const date = `${ar[1]} ${ar[2]}, ${ar[3]}`;
	const fileName = milliSec + ".pdf";

	const docDefinition = {
		// pageSize: "A5",
		// pageOrientation: "landscape",
		// pageMargins: [req.body.margin * 1],
		content: [
			{
				alignment: "center",
				margin: [20, 40],
				columns: [
					{
						width: "*",
						text: [{ text: "Billed Date", style: "blue" }, `\n${date}`],
					},
					{
						width: "*",
						text: [
							{ text: "Invoice Number", style: "blue" },
							`\n${fileName.split(".")[0]}`,
						],
					},
					{
						width: "*",
						text: [
							{ text: "Amount Paid (Rs.)", style: "blue" },
							`\n${req.body.amount}`,
						],
					},
				],
			},
			{
				margin: [20, 50, 20, 20],
				alignment: "left",
				columns: [
					{ width: "20%", text: "First Name:", style: "blue" },
					{ width: "*", text: `${req.body.firstName}`, style: "right" },
					{ width: "20%", text: "Last Name:", style: "blue" },
					{ width: "*", text: `${req.body.lastName}`, style: "right" },
				],
			},
			{
				margin: [20, 0, 20, 20],
				alignment: "left",
				columns: [
					{ width: "20%", text: "E-mail:", style: "blue" },
					{ width: "*", text: `${req.body.email}` },
				],
			},
			{
				margin: [20, 0, 20, 20],
				alignment: "left",
				columns: [
					{ width: "20%", text: "Phone (+91):", style: "blue" },
					{ width: "*", text: `${req.body.phone}` },
				],
			},
			{
				margin: [20, 0, 20, 20],
				columns: [
					{ width: "20%", text: "Description:", style: "blue" },
					{ text: `${req.body.description}` },
				],
			},
		],
		styles: {
			blue: {
				// bold: true,
				color: "blue",
				fontSize: 16,
			},
			footer: {
				alignment: "center",
				fontSize: 12,
			},
			header: {
				alignmnet: "center",
				// bold: true,
				fontSize: 20,
				// margin: [20, 20, 20, 30],
			},
		},
		defaultStyle: {
			// columnGap:10,
			fontSize: req.body.font_size,
			font: req.body.font_family,
		},
	};
	if (req.body.header === "on") {
		docDefinition.header = {
			text: req.body.header_text ? req.body.header_text : "INVOICE",
			style: "header",
			margin: [30, 20, 30, 40],
		};
	}
	if (req.body.footer === "on") {
		docDefinition.footer = {
			text: req.body.footer_text ? req.body.footer_text : "The end",
			style: "footer",
		};
	}
	const options = {};

	const pdfDoc = printer.createPdfKitDocument(docDefinition, options);
	pdfDoc.pipe(fs.createWriteStream(`./public/files/${fileName}`));
	pdfDoc.end();

	res.render("download", {
		title: "download",
		path: `./files/${fileName}`,
	});
};

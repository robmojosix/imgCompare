const express = require("express");
const bodyParser = require("body-parser");

const removeStaticFolderPath = require("../utils/removeStaticFolderPath");

const app = express();
const port = 1800;

exports.default = mismatchImages => {
	app.use(express.static(process.cwd() + "/dist"));

	app.use(
		bodyParser.urlencoded({
			extended: true
		})
	);

	app.use(bodyParser.json());

	app.set("views", process.cwd() + "/views");

	app.set("view engine", "ejs");

	const data = JSON.stringify(removeStaticFolderPath(mismatchImages)) || [];

	app.get("/", (req, res) => res.render("index", {data}));

	app.put("/update-files", (req, res) => {
		// console.log("123", req.body.files);
		res.status(200).send("File Updated!");
	});

	app.listen(port, () => console.log(`Example app listening on port ${port}!`));
};

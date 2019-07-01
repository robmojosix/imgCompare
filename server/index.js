const express = require("express");
const bodyParser = require("body-parser");

const compare = require("../commands/compare");
const removeStaticFolderPath = require("../utils/removeStaticFolderPath");
const addStaticFolderPath = require("../utils/addStaticFolderPath");
const updateImages = require("../utils/updateImages");

const config = require(process.cwd() + "/imgCompare.config.js");

const app = express();
const port = 1800;

exports.default = () => {
	app.use(express.static(process.cwd() + "/dist"));
	app.use(express.static(process.cwd() + config.directory));

	app.use(
		bodyParser.urlencoded({
			extended: true
		})
	);

	app.use(bodyParser.json());

	app.set("views", process.cwd() + "/views");

	app.set("view engine", "ejs");

	app.get("/", (req, res) => {
		compare().then(mismatchImages => {
			const data = JSON.stringify(removeStaticFolderPath(mismatchImages)) || [];
			res.render("index", {data});
		});
	});

	app.put("/update-files", (req, res) => {
		const imagesToUpdate = addStaticFolderPath(req.body.files);
		updateImages(imagesToUpdate);
		res.status(200).send("File Updated!");
	});

	app.listen(port, () => console.log(`Example app listening on port ${port}!`));
};

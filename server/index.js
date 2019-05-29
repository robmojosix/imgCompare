const express = require("express");
const app = express();
const port = 1800;

exports.default = mismatchImages => {
	app.use(express.static(process.cwd() + "/dist"));

	app.set("views", process.cwd() + "/views");

	app.set("view engine", "ejs");

	const data = JSON.stringify(mismatchImages) || [];

	app.get("/", (req, res) => res.render("index", {data}));

	app.put("/update-file", (req, res) => {
		res.status(200).send("File Updated!");
	});

	app.listen(port, () => console.log(`Example app listening on port ${port}!`));
};

const express = require("express");
const app = express();
const port = 1800;

app.use(express.static(process.cwd() + "/dist"));

app.get("/", (req, res) => res.render(process.cwd() + "/dist/index.html"));

app.put("/update-file", (req, res) => {
	res.status(200).send("File Updated!");
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));

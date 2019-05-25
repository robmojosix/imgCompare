const express = require("express");
const path = require("path");
const app = express();
const url = require("url");
const port = 1800;

app.use(express.static(process.cwd() + "/dist/client"));

app.get("/", (req, res) => res.sendFile(process.cwd() + "/dist/index.html"));

app.get("/update-file", (req, res) => {
  // const url_parts = url.parse(request.url, true);
  // const merchanttoken = url_parts.merchanttoken;

  res.status(200).send("File Updated!");
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));

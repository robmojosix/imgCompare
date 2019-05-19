const express = require("express");
const path = require("path");

module.exports = config => {
  const app = express();
  const port = 2222;

  app.use(express.static(process.cwd() + config.directory));
  app.get("/", (req, res) => res.send("Hello World!"));

  app.listen(port, () => console.log(`Example app listening on port ${port}!`));
};

const express = require("express");
const path = require("path");

module.exports = (config, mismatchImages) => {
  const app = express();
  const port = 2222;

  app.use(express.static(process.cwd() + "/public"));
  app.use(express.static(process.cwd() + config.directory));
  app.get("/", (req, res) =>
    res.sendFile(path.join(process.cwd() + "/client/index.html"))
  );

  app.listen(port, () => console.log(`Example app listening on port ${port}!`));
};

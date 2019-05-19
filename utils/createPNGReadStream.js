const fs = require("fs");
const PNG = require("pngjs").PNG;

module.exports = function createPNGReadStream(path) {
  return new Promise((resolve, reject) => {
    const imgStream = fs
      .createReadStream(path)
      .pipe(new PNG())
      .on("parsed", d => {
        resolve(imgStream);
      });
  });
};

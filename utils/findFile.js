var path = require("path"),
  fs = require("fs");

var foundFiles = [];

module.exports = function findFilesByExt(startPath, filter) {
  if (!fs.existsSync(startPath)) {
    console.log("no dir ", startPath);
    return;
  }

  var files = fs.readdirSync(startPath);
  for (var i = 0; i < files.length; i++) {
    var filename = path.join(startPath, files[i]);
    var stat = fs.lstatSync(filename);
    if (stat.isDirectory()) {
      findFilesByExt(filename, filter); //recurse
    } else if (filename.indexOf(filter) >= 0) {
      foundFiles.push(filename);
    }
  }

  return foundFiles;
};

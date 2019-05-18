const fs = require("fs-extra"),
  PNG = require("pngjs").PNG,
  pixelmatch = require("pixelmatch"),
  findFilesByExt = require("./utils/findFile");

const incomingPath = __dirname + "/tests/snapshots/incoming/";
const basePath = __dirname + "/tests/snapshots/base/";
const deltaPath = __dirname + "/tests/snapshots/delta/";

let filesRead = 0;
let img1;
let img2;
let deltaImagePath = "";

const filesToCompare = findFilesByExt(incomingPath, ".png");

const genericFailCb = err => {
  if (err) {
    console.log("error", err);
    throw err;
  }
};

function makeDirsFromPath(path) {
  const allDirsPath = path.substring(0, path.lastIndexOf("/") + 1);
  fs.mkdirsSync(allDirsPath, genericFailCb);
}

filesToCompare.map(incomingImagePath => {
  const filePath = incomingImagePath.split(incomingPath)[1];
  const baseImagePath = basePath + filePath;
  deltaImagePath = deltaPath + filePath;

  if (!fs.existsSync(baseImagePath)) {
    makeDirsFromPath(baseImagePath);
    fs.copyFile(incomingImagePath, baseImagePath, genericFailCb);
    return;
  } else {
    // all needs to be sync
    compare(incomingImagePath, baseImagePath);
  }
});

function compare(path1, path2) {
  img1 = fs
    .createReadStream(path1)
    .pipe(new PNG())
    .on("parsed", imagesLoaded);

  img2 = fs
    .createReadStream(path2)
    .pipe(new PNG())
    .on("parsed", imagesLoaded);
}

function imagesLoaded() {
  if (++filesRead < 2) return;
  filesRead = 0;
  comparator();
}

function comparator() {
  var diff = new PNG({ width: img1.width, height: img1.height });

  pixelmatch(img1.data, img2.data, diff.data, img1.width, img1.height, {
    threshold: 0.1
  });

  makeDirsFromPath(deltaImagePath);

  diff.pack().pipe(fs.createWriteStream(deltaImagePath));
}

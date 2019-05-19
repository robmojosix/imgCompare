const fs = require("fs-extra"),
  PNG = require("pngjs").PNG,
  pixelmatch = require("pixelmatch"),
  findFilesByExt = require("./utils/findFile"),
  createPNGReadStream = require("./utils/createPNGReadStream");

const incomingPath = __dirname + "/tests/snapshots/incoming/";
const basePath = __dirname + "/tests/snapshots/base/";
const deltaPath = __dirname + "/tests/snapshots/delta/";

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
  const deltaImagePath = deltaPath + filePath;

  if (!fs.existsSync(baseImagePath)) {
    makeDirsFromPath(baseImagePath);
    fs.copyFile(incomingImagePath, baseImagePath, genericFailCb);
    return;
  } else {
    compare(incomingImagePath, baseImagePath, deltaImagePath);
  }
});

function compare(incomingPath, basePath, deltaImagePath) {
  const incomingImageBuffer = createPNGReadStream(incomingPath);
  const baseImageBuffer = createPNGReadStream(basePath);

  Promise.all([incomingImageBuffer, baseImageBuffer]).then(function(images) {
    const [incomingImage, baseImage] = images;
    comparator(images, deltaImagePath);
  });
}

function comparator(images, deltaImagePath) {
  const [incomingImage, baseImage] = images;

  const diff = new PNG({
    width: incomingImage.width,
    height: incomingImage.height
  });

  const mismatch = pixelmatch(
    incomingImage.data,
    baseImage.data,
    diff.data,
    incomingImage.width,
    incomingImage.height,
    {
      threshold: 0.1
    }
  );

  if (mismatch) {
    const mismatchFilePath = deltaImagePath.split(deltaPath)[1];
    console.log(
      `Incoming image ${incomingPath}${mismatchFilePath} is different from original!!!`
    );
  }

  makeDirsFromPath(deltaImagePath);

  diff.pack().pipe(fs.createWriteStream(deltaImagePath));
}

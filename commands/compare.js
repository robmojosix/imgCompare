const fs = require("fs-extra"),
  PNG = require("pngjs").PNG,
  pixelmatch = require("pixelmatch"),
  findFilesByExt = require("../utils/findFile"),
  createPNGReadStream = require("../utils/createPNGReadStream");

let compareConfig = {};

const misMatchFilePaths = [];

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

function compare(incomingImagePath, baseImagePath, deltaImagePath) {
  return new Promise(function(resolve, reject) {
    const incomingImageBuffer = createPNGReadStream(incomingImagePath);
    const baseImageBuffer = createPNGReadStream(baseImagePath);

    const imagePaths = {
      incoming: incomingImagePath,
      base: baseImagePath,
      delta: deltaImagePath
    };

    Promise.all([incomingImageBuffer, baseImageBuffer])
      .then(function(images) {
        comparator(images, imagePaths);
      })
      .then(() => {
        resolve();
      })
      .catch(err => console.log(err));
  });
}

function comparator(images, imagePaths) {
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
    const mismatchFilePath = imagePaths.delta.split(
      compareConfig.directory + compareConfig.deltaPath
    )[1];

    misMatchFilePaths.push(imagePaths);

    console.log(
      `Incoming image ${compareConfig.directory +
        compareConfig.incomingPath}${mismatchFilePath} is different from original!!!`
    );
  }

  makeDirsFromPath(imagePaths.delta);

  diff.pack().pipe(fs.createWriteStream(imagePaths.delta));
}

module.exports = config => {
  compareConfig = config;
  const incomingPath = process.cwd() + config.directory + config.incomingPath;
  const basePath = process.cwd() + config.directory + config.basePath;
  const deltaPath = process.cwd() + config.directory + config.deltaPath;

  const filesToCompare = findFilesByExt(incomingPath, ".png");

  const comparePromises = [];

  filesToCompare.map(incomingImagePath => {
    const filePath = incomingImagePath.split(incomingPath)[1];
    const baseImagePath = basePath + filePath;
    const deltaImagePath = deltaPath + filePath;

    if (!fs.existsSync(baseImagePath)) {
      makeDirsFromPath(baseImagePath);
      fs.copyFile(incomingImagePath, baseImagePath, genericFailCb);
      return;
    } else {
      comparePromises.push(
        compare(incomingImagePath, baseImagePath, deltaImagePath)
      );
    }
  });

  return Promise.all(comparePromises).then(function() {
    return misMatchFilePaths;
  });
};

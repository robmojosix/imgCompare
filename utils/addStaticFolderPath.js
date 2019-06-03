const config = require("../package.json");

module.exports = function addStaticFolderPath(imgPaths) {
	const returnObject = {};

	Reflect.ownKeys(imgPaths).forEach(key => {
		returnObject[key] = config.staticFiles.staticPath + imgPaths[key];
	});
	return returnObject;
};

const config = require("../imgCompare.config.js");

module.exports = function addStaticFolderPath(imgPaths) {
	const returnObject = {};

	Reflect.ownKeys(imgPaths).forEach(key => {
		returnObject[key] = config.directory + imgPaths[key];
	});
	return returnObject;
};

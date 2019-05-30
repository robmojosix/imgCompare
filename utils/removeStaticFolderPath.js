const config = require("../package.json");

module.exports = function removeStaticFolderPath(arrayOfPaths) {
	return arrayOfPaths.map(paths => {
		const returnObject = {};
		Reflect.ownKeys(paths).forEach(key => {
			returnObject[key] = paths[key].split(config.staticFiles.staticPath)[1];
		});
		return returnObject;
	});
};

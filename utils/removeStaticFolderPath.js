const config = require(process.cwd() + "/imgCompare.config.js");

module.exports = function removeStaticFolderPath(arrayOfPaths) {
	return arrayOfPaths.map(paths => {
		const returnObject = {};
		Reflect.ownKeys(paths).forEach(key => {
			returnObject[key] = paths[key].split(config.directory)[1];
		});
		return returnObject;
	});
};

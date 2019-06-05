var fs = require("fs");

module.exports = function updateImages(imagesObject) {
	const {incoming, base, delta} = imagesObject;

	fs.copyFileSync(process.cwd() + incoming, process.cwd() + base, err => {
		if (err) throw err;
	});

	// remove only delta for now
	// fs.unlinkSync(process.cwd() + incoming);
	fs.unlinkSync(process.cwd() + delta);
};

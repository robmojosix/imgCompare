#!/usr/bin/env node
const fs = require("fs-extra");
const chalk = require("chalk");
const argv = require("yargs").argv;
const {spawn} = require("child_process");

const compare = require("../commands/compare");

const requiredConfigPaths = ["directory", "incomingPath", "basePath", "deltaPath"];

const configFileName = "imgCompare.config.js";
const noConfigMessage = `Please include a config file: ${configFileName}`;
const incorrectConfigMessage = `Make sure your config file includes all paths`;
const noArgsMessage = `Please pass an argument: ie: --compare`;
const imageCompareServerStartedMessage = "Regression server started";

function validate(config) {
	requiredConfigPaths.map(path => {
		if (!(path in config)) {
			console.log(chalk.red(incorrectConfigMessage));
			process.exit(1);
		}
	});
}

function getConfig() {
	try {
		const config = require(process.cwd() + `/${configFileName}`);
		validate(config);
		return config;
	} catch (err) {
		console.log(chalk.red(noConfigMessage));
		process.exit(1);
	}
}

function makeRelative(arrayOfPaths) {
	return arrayOfPaths.map(paths => {
		const returnObject = {};
		Reflect.ownKeys(paths).forEach(key => {
			returnObject[key] = paths[key].split(process.cwd())[1];
		});
		return returnObject;
	});
}

const config = getConfig();

if (argv.compare) {
	compare(config).then(mismatchImages => {
		const relativeMismatchImages = makeRelative(mismatchImages);
		const contents = `module.exports = ${JSON.stringify(relativeMismatchImages)};`;

		fs.writeFile("tmp/mismatchImages.js", contents, function(err) {
			if (err) {
				return console.log(err);
			}
		});

		const devServer = spawn("npm", ["run", "server"]);
		devServer.stdout.on("data", function(data) {
			console.log(imageCompareServerStartedMessage);
		});
		devServer.stderr.on("data", function(data) {
			console.log(data);
		});
		devServer.on("close", function(code) {
			console.log(`child process exited with code ${code}`);
		});
	});
} else {
	console.log(chalk.red(noArgsMessage));
}

#!/usr/bin/env node
const chalk = require("chalk");
const argv = require("yargs").argv;
const server = require("../server").default;
const compare = require("../commands/compare");

const noArgsMessage = `Please pass an argument: ie: --compare`;
const noMismatchesMessage = `✅  Image regression tests all passing`;
const mismatchesMessage = `You have image regression failures - starting server...`;

if (argv.compare) {
	compare().then(mismatchImages => {
		if (mismatchImages.length > 0) {
			console.log(chalk.yellow(mismatchesMessage));
			server();
		} else {
			console.log(chalk.green(noMismatchesMessage));
		}
	});
} else {
	console.log(chalk.red(noArgsMessage));
}

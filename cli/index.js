#!/usr/bin/env node
const chalk = require("chalk");
const argv = require("yargs").argv;
const server = require("../server").default;

const noArgsMessage = `Please pass an argument: ie: --compare`;

if (argv.compare) {
	server();
} else {
	console.log(chalk.red(noArgsMessage));
}

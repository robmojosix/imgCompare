#!/usr/bin/env node
const fs = require("fs-extra");
const path = require("path");
const chalk = require("chalk");
const argv = require("yargs").argv;

const compare = require("../commands/compare");
const server = require("../server/index");

const requiredConfigPaths = [
  "directory",
  "incomingPath",
  "basePath",
  "deltaPath"
];

const configFileName = "imgCompare.config.js";
const noConfigMessage = `Please include a config file: ${configFileName}`;
const incorrectConfigMessage = `Make sure your config file includes all paths`;
const noArgsMessage = `Please pass an argument: compare || server`;

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

const config = getConfig();

if (argv.compare) {
  compare(config);
} else if (argv.server) {
  server(config);
} else {
  console.log(chalk.red(noArgsMessage));
}

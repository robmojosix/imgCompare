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
const noArgsMessage = `Please pass an argument: ie: --compare`;

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
  const mismatch = compare(config).then(mismatchImages => {
    server(config, mismatchImages);
  });
} else {
  console.log(chalk.red(noArgsMessage));
}

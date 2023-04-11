#!/usr/bin/env node
import genDiff from '../src/genDiff.js'
import { program } from 'commander';

program
    .description('Compares two configuration files and shows a difference.')
    .version('1.0.0', '-V, --version', 'output the version number')
    .arguments('<filepath1> <filepath2>')
    .option('-f, --format <type>', 'output format')
    .action((filepath1, filepath2) => {
        console.log(genDiff(filepath1, filepath2));
    });
program.parse();

console.log("data")
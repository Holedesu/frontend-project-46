#!/usr/bin/env node

import { program } from 'commander';
import calcDiff from '../index.js';

program
  .description('Compares two configuration files and shows a difference.')
  .version('1.0.0')
  .option('-f, --format <type>', 'output format')
  .arguments('<filepath1> <filepath2>')
  .action((filepath1, filepath2) => {
    console.log(calcDiff(filepath1, filepath2, program.opts().format));
  });

program.parse();

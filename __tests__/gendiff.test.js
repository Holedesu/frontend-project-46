import { describe, test, expect } from '@jest/globals';
import * as path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';
import getDifference from '../src/getDifference.js';
import parser from '../src/parsers.js';
import doFormating from '../src/formating.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const readFile = (filename) => fs.readFileSync(getFixturePath(filename), 'utf-8');

describe('tree structures', () => {
  test('json type', () => {
    const file1 = parser(readFile('file1.json'), 'json');
    const file2 = parser(readFile('file2.json'), 'json');
    expect(getDifference(file1, file2)).toBeInstanceOf(Object);
  });
  test('yaml/yml type', () => {
    const file1 = parser(readFile('file1.yaml'), 'yaml');
    const file2 = parser(readFile('file2.yaml'), 'yaml');
    expect(getDifference(file1, file2)).toBeInstanceOf(Object);
  });
});

describe('formaters', () => {
  test('stylish type', () => {
    const file1 = parser(readFile('file1.json'), 'json');
    const file2 = parser(readFile('file2.json'), 'json');
    const reference = readFile('stylish.txt');
    expect(doFormating(getDifference(file1, file2), 'stylish')).toEqual(reference);
  });

  test('plain type', () => {
    const file1 = parser(readFile('file1.json'), 'json');
    const file2 = parser(readFile('file2.json'), 'json');
    const reference = readFile('plain.txt');
    expect(doFormating(getDifference(file1, file2), 'plain')).toEqual(reference);
  });

  test('json type', () => {
    const file1 = parser(readFile('file1.json'), 'json');
    const file2 = parser(readFile('file2.json'), 'json');
    const reference = readFile('json.txt');
    expect(doFormating(getDifference(file1, file2), 'json')).toEqual(reference);
  });
});

describe('parser', () => {
  test('Have property', () => {
    const json = readFile('file1.json');
    expect(parser(json, 'json')).toHaveProperty('common.setting2', 200);
  });

  test('Not supported format', () => {
    expect(() => parser('txt')).toThrow(Error);
  });
});

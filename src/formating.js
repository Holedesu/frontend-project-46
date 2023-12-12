import makeStylish from './formaters/stylish.js';
import makePlain from './formaters/plain.js';

export default function doFormating(tree, format) {
  if (format === 'plain') return makePlain(tree);
  if (format === 'json') return JSON.stringify(tree);
  if (format === 'stylish') return makeStylish(tree);
  throw new Error(`Format: ${format} is not supported!`);
}

import _ from 'lodash';

const getPropName = (nodeNames) => nodeNames.flat().join('.');

const checkVal = (val) => {
  if (typeof val === 'object') return !val ? 'null' : '[complex value]';
  return typeof val === 'string' ? `'${val}'` : `${val}`;
};

export function makePlainDiff(tree) {
  const iter = (node, path) => node.map((child) => {
    const curPath = getPropName([path, child.key]);
    switch (child.type) {
      case 'nested': {
        return iter(child.children, curPath);
      }
      case 'added': {
        return `Property '${curPath}' was added with value: ${checkVal(child.value)}`;
      }
      case 'removed': {
        return `Property '${curPath}' was removed`;
      }
      case 'changed': {
        return `Property '${curPath}' was updated. From ${checkVal(child.value1)} to ${checkVal(child.value2)}`;
      }
      case 'unchanged': {
        return null;
      }
      default: {
        throw Error('Uncorrect data');
      }
    }
  });
  return iter(tree.children, []);
}

export default function makePlain(data) {
  const result = makePlainDiff(data);
  const flatten = _.flattenDeep(result);
  const filtered = flatten.filter((el) => el);
  return filtered.join('\n');
}

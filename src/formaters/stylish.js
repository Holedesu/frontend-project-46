import _ from 'lodash';

const indent = ' ';
const indentSize = 4;
const currentIndent = (deep) => indent.repeat(indentSize * deep - 2);
const braceIndent = (deep) => indent.repeat(indentSize * deep - indentSize);

const joinStrings = (lines, deep) => [
  '{',
  ...lines,
  `${braceIndent(deep)}}`,
].join('\n');

const stringify = (data, deep) => {
  if ((!_.isObject(data)) || (data === null)) {
    return String(data);
  }
  const keys = _.keys(data);
  const lines = keys.map((key) => `${currentIndent(deep)}  ${key}: ${stringify(data[key], deep + 1)}`);
  return joinStrings(lines, deep);
};

const makeStylish = (tree) => {
  const iter = (node, deep) => {
    switch (node.type) {
      case 'root': {
        const result = node.children.flatMap((child) => iter(child, deep));
        return joinStrings(result, deep);
      }
      case 'nested': {
        const childrenToStr = node.children.flatMap((child) => iter(child, deep + 1));
        return `${currentIndent(deep)}  ${node.key}: ${joinStrings(childrenToStr, deep + 1)}`;
      }
      case 'added': {
        return `${currentIndent(deep)}+ ${node.key}: ${stringify(node.value, deep + 1)}`;
      }
      case 'removed': {
        return `${currentIndent(deep)}- ${node.key}: ${stringify(node.value, deep + 1)}`;
      }
      case 'changed': {
        return [`${currentIndent(deep)}- ${node.key}: ${stringify(node.value1, deep + 1)}`,
          `${currentIndent(deep)}+ ${node.key}: ${stringify(node.value2, deep + 1)}`];
      }
      case 'unchanged': {
        return `${currentIndent(deep)}  ${node.key}: ${stringify(node.value, deep + 1)}`;
      }
      default: {
        throw new Error(`Unknown node type: ${node.type}`);
      }
    }
  };
  return iter(tree, 1);
};

export default makeStylish;

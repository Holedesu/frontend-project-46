import _ from 'lodash';

const getKeys = (data1, data2) => _.sortBy(_.union(_.keys(data1), _.keys(data2)));

const buidTree = (data1, data2) => {
  const keys = getKeys(data1, data2);

  const diff = keys.map((key) => {
    if (!_.has(data1, key)) {
      return { type: 'added', key, value: data2[key] };
    }
    if (!_.has(data2, key)) {
      return { type: 'removed', key, value: data1[key] };
    }
    if (_.isPlainObject(data1[key]) && _.isPlainObject(data2[key])) {
      return { type: 'nested', key, children: buidTree(data1[key], data2[key]) };
    }
    if (_.isEqual(data1[key], data2[key])) {
      return { type: 'unchanged', key, value: data1[key] };
    }
    return {
      type: 'changed', key, value1: data1[key], value2: data2[key],
    };
  });

  return diff;
};

const getDifferenceTree = (data1, data2) => ({
  type: 'root',
  children: buidTree(data1, data2),
});

export default getDifferenceTree;

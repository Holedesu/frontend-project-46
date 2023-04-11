import _ from 'lodash';
import fs from 'fs';
import path from 'path';


const genDiff = (file1, file2) => {
    const getJSONobj = (filepath) => JSON.parse(fs.readFileSync(path.resolve(process.cwd(), filepath), 'utf-8'));
    const routeToFile1 = getJSONobj(file1);
    const routeToFile2 = getJSONobj(file2);
    const keys1 = Object.keys(routeToFile1);
    const keys2 = Object.keys(routeToFile2);
    const keysArr = _.union(keys1, keys2);
    const sortedArr = _.sortBy(keysArr);

    const reduceObj = sortedArr.reduce((acc, keyObj) => {
        if (keyObj in routeToFile1 && !(keyObj in routeToFile2)) {
            acc = {...acc, [`- ${keyObj}`]:routeToFile1[keyObj]};
        }
        else if (keyObj in routeToFile2 && !(keyObj in routeToFile1)) {
            acc = {...acc, [`+ ${keyObj}`]:routeToFile2[keyObj]};
        }
        else if (keyObj in routeToFile2 && keyObj in routeToFile1) {
            if (routeToFile1[keyObj] !== routeToFile2[keyObj]){
                acc = {...acc, [`- ${keyObj}`]:routeToFile1[keyObj]};
            }
            if (routeToFile2[keyObj] !== routeToFile1[keyObj]){
                acc = {...acc, [`+ ${keyObj}`]:routeToFile2[keyObj]};
            } else {
                acc = {...acc, [`  ${keyObj}`]:routeToFile2[keyObj]};
            }
        }
        return acc;
    }, {})

    const keyas = Object.keys(reduceObj);
    let string = '';
    keyas.map((key) => string += `${key}: ${reduceObj[key]}\n`)
    return string.slice(0, -1);
}

export default genDiff;

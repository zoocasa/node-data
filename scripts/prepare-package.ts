import packageJSON from '../package.json';
import { removeKeys } from '@egjiri/node-kit/objects';
import { writeFileSync } from 'fs';

const newPackageJSON = removeKeys(packageJSON, 'scripts', 'devDependencies');
writeFileSync('build/package.json', JSON.stringify(newPackageJSON, null, 2));

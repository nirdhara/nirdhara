const path = require('path');
const writeFileAtomicSync = require('write-file-atomic').sync;

const [packageName] = process.argv.slice(2);
const packagePath = path.resolve(__dirname, `../../apps/${packageName}`);

writeFileAtomicSync(path.resolve(packagePath, 'dist/.yarnrc.yml'), 'nodeLinker: node-modules');

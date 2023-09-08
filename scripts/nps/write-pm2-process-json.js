const path = require('path');
const writeFileAtomicSync = require('write-file-atomic').sync;

const [packageName] = process.argv.slice(2);
const packagePath = path.resolve(__dirname, `../../apps/${packageName}`);

const config = {
  apps: [
    {
      name: packageName,
      script: 'main.js',
      exec_mode: 'cluster',
      instances: 'max',
      log_type: 'json',
    },
  ],
};

writeFileAtomicSync(path.resolve(packagePath, 'dist/pm2-process.json'), JSON.stringify(config));

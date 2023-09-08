const path = require('path');
const writeFileAtomicSync = require('write-file-atomic').sync;

const [packageName] = process.argv.slice(2);
const packagePath = path.resolve(__dirname, `../../apps/${packageName}`);

const newPackageJsonStr = () => {
  // Get the package.json from individual workspace package.
  const packageJson = require(path.resolve(packagePath, `package.json`));

  // Get dependencies
  const dependencies = packageJson.dependencies;
  const localDepsPattern = '^@app/';
  // Remove workspace dependencies which are already bundled.
  const ignoreWorkspaceDeps = Object.entries(dependencies).reduce((acc, [k, v]) => {
    !new RegExp(localDepsPattern).test(k) && (acc[k] = v);
    return acc;
  }, {});

  // Get dev dependencies
  const devDependencies = packageJson.devDependencies;
  // Get dev dependencies which needs to be included in new package.json
  const devDependenciesList = packageJson.scripts.db ? ['prisma'] : [];
  // Filter out to get only required dev dependencies
  const filteredDevDeps = Object.entries(devDependencies).reduce((acc, [k, v]) => {
    if (devDependenciesList.includes(k)) {
      acc[k] = v;
    }
    return acc;
  }, {});

  const newPackageJson = {
    version: packageJson.version,
    ...(packageJson.scripts.db && { scripts: { postinstall: packageJson.scripts.db } }),
    dependencies: ignoreWorkspaceDeps,
    ...(Object.keys(filteredDevDeps).length && { devDependencies: filteredDevDeps }),
  };
  return JSON.stringify(newPackageJson, null, '\t');
};

writeFileAtomicSync(path.resolve(packagePath, 'dist/package.json'), newPackageJsonStr());

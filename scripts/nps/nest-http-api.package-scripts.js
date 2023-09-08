const { series, rimraf, concurrent, copy, crossEnv } = require('@gowravshekar/nps-utils');
const path = require('path');

module.exports = ({ packageName } = {}) => {
  const packagePath = path.resolve(__dirname, `../../apps/${packageName}`);
  return {
    scripts: {
      default: {
        script: crossEnv('NODE_OPTIONS=--enable-source-maps NODE_ENV=development nest build --webpack'),
        description: 'Run in dev mode',
      },
      debug: {
        script: crossEnv('NODE_OPTIONS=--enable-source-maps NODE_ENV=development DEBUG=true nest build --webpack'),
        description: 'Run in dev mode with debug capability',
      },
      build: {
        default: {
          script: series(
            // 'nps test.cov',
            // 'nps test.e2e',
            'nps build.before',
            crossEnv('NODE_ENV=production nest build --webpack'),
            'nps build.after',
          ),
          description: 'Build and zip dist',
        },
        serve: {
          script: series('nps build.before', crossEnv('NODE_ENV=production nest build --webpack'), 'nps serve'),
          description: 'Build and serve dist',
        },
        before: concurrent({
          'removing dist': { script: rimraf('dist') },
          'removing dist.zip': { script: rimraf('dist.zip') },
        }),
        after: series(
          copy(`${path.resolve(packagePath, '../../yarn.lock')} ${path.resolve(packagePath, 'dist/')}`),
          copy(`${path.resolve(packagePath, './.env.development')} ${path.resolve(packagePath, 'dist/')}`),
          `node ${path.resolve(__dirname, 'write-package-json.js')} ${packageName} `,
          `node ${path.resolve(__dirname, 'write-yarnrc-yml.js')} ${packageName} `,
          `node ${path.resolve(__dirname, 'write-pm2-process-json.js')} ${packageName} `,
          'npx bestzip dist.zip dist/',
        ),
      },
      serve: {
        script: crossEnv('NODE_OPTIONS=--enable-source-maps node dist/main'),
        description: 'Serve dist',
      },
      test: {
        default: 'jest --config ./test/jest.config.js',
        watch: 'jest --watch --config ./test/jest.config.js',
        cov: 'jest --coverage --config ./test/jest.config.js',
        debug:
          'node --inspect-brk -r tsconfig-paths/register -r ts-node/register node_modules/.bin/jest --runInBand --config ./test/jest.config.js',
        e2e: 'jest --config ./test/jest-e2e.config.js',
      },
      format: 'prettier --write "src/**/*.ts" "test/**/*.ts"',
      lint: 'eslint "{src,apps,libs,test}/**/*.ts" --fix',
    },
  };
};

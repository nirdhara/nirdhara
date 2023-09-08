module.exports = {
  './{src,test}/**/*.ts': ['eslint --fix --cache', 'prettier --write'],
  '**/*.{ts,js,md,json}': 'prettier --write',
};

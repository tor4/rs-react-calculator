module.exports = {
  parser: 'babel-eslint',
  env: {
    browser: true,
    es6: true,
  },
  extends: [
    'plugin:react/recommended',
    'google',
  ],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 2018,
    sourceType: 'module',
  },
  plugins: [
    'react',
    'no-async-without-await',
  ],
  rules: {
    'require-jsdoc': 0,
    'max-len': [2, {
      code: 120,
      tabWidth: 2,
      ignoreUrls: true,
      ignorePattern: "^(import '|\\} from )"
    }]
  },
};

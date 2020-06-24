module.exports = {
  // 'parser': 'babel-eslint',
  'env': {
    'browser': true,
    'node': true,
    'es6': true
  },
  'parserOptions': {
    'sourceType': 'module'
  },
  'extends': 'semistandard',
  'plugins': [
    'html'
  ],
  'rules': {
    // 'indent': [
    //   'error',
    //   2
    // ],
    // 'linebreak-style': [
    //   'error',
    //   'unix'
    // ],
    // 'quotes': [
    //   1,
    //   'single'
    // ],
    'semi': [
      1,
      'never'
    ],
    // 'no-console': 1,
    // 'space-before-function-paren': 0,
    // 'no-multiple-empty-lines': [
    //   'off'
    // ]
  },
  'globals': {
    '$': true
  }
}

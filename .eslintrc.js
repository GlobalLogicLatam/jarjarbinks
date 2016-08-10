module.exports = {
  "env": {
    "browser": true,
    "commonjs": true,
    "node": true
  },
  "extends": "eslint:recommended",
  "rules": {
    "indent": ["error", "tab"],
    "linebreak-style": ["error", "windows"],
    "quotes": ["error", "single"],
    "semi": ["error", "always"],
    'no-multi-spaces': ['error', {
      'exceptions': {
        'Property': true,
        'VariableDeclarator': true
      }
    }],
    'key-spacing': ['error', {
      'beforeColon': false,
      'afterColon': true
    }]
  },
  "globals": {
    'jQuery': true,
    '$': true,
    'Sammy': true
  }
};
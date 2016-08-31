module.exports = {
  "extends": "idiomatic",
  "env": {
    "browser": true,
    "commonjs": true,
    "node": true,
    'es6': true
  },
  "globals": {
    'jQuery': true,
    '$': true,
    'Sammy': true,
    'Mustache': true,
    'describe': true,
    'beforeEach': true,
    '$j': true,
    'it': true,
    'expect': true
  },
  'plugins': [
    'classes'
  ],
  'rules': {
    // Plugins
    'classes/space': 2,
    'classes/name': [2, "class", "method"],
    'classes/constructor': 2,
    'classes/super': 2,
    'classes/style': 2
  }
};

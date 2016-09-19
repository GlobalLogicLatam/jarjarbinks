let path = require( 'path' );

module.exports = {
  resolve: {
    root: [
      path.resolve( './app/' ),
      path.resolve( './app/common/' ),
      path.resolve( './app/mobile/' ),
      path.resolve( './app/desktop/' )
    ],
    alias: {
      jquery: `${__dirname}/bower_components/jquery/dist/jquery.min.js`,
      jquery_validation: `${__dirname}/bower_components/jquery-validation/dist/jquery.validate.min.js`,
      validation_additional_methods: `${__dirname}/bower_components/jquery-validation/dist/additional-methods.min.js`,
      sammy: `${__dirname}/bower_components/sammy/lib/min/sammy-latest.min.js`,
      mustache: `${__dirname}/bower_components/mustache.js/mustache.min.js`
    }
  },
  module: {
    loaders: [
      // Transpile any JavaScript file:
      // { test: /\.js$/, loader: 'webpack-traceur?experimental' }
      { test: /\.mustache$/, loader: 'raw' },
      { test: /\.js$/, exclude: /spec\.js$/, loader: 'istanbul-instrumenter' }
    ]
  },
  entry: './app/init',
  output: {
    filename: 'app.bundle.js'
  }
}

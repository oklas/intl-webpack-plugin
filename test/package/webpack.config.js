var MergePlugin = require("../../");

module.exports = {
  entry: "./index",
  output: {
    filename: "[name].js",
    libraryTarget: 'umd'
  },
  module: {
    loaders: [
      {
        test: /\.(yaml)$/i,
        loaders: [
          MergePlugin.loader({name: 'result.[hash].yaml'}),
          'yaml-loader'
        ]
      }
    ]
  },
  plugins: [
    new MergePlugin({
      search: './src/**/*.yaml',
    })
  ]
};

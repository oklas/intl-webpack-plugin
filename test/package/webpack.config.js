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
        test: /\.(json)$/i,
        loaders: [
          MergePlugin.loader({name: 'result.[hash].json'})
        ]
      }
    ]
  },
  plugins: [
    new MergePlugin({
      search: './src/**/*.json',
    })
  ]
};

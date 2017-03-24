var MergePlugin = require("../../");

module.exports = {
  entry: "./index",
  output: {
    filename: "[name].js",
    libraryTarget: 'umd'
  },
  module: {
    rules: [
      {
        test: /\.(yaml)$/i,
        use: [
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

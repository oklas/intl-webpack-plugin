var JoinPlugin = require("join-webpack-plugin");
const merge = require("merge");

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
          JoinPlugin.loader({name: 'result.[hash].json'})
        ]
      }
    ]
  },
  plugins: [
    new JoinPlugin({
      search: './src/**/*.json',
      join: function(common, addition) {
        return merge.recursive(
          common ? common : {},
          JSON.parse(addition)
        );
      },
      save: function(common) {
        return JSON.stringify(common);
      }
    })
  ]
};

var IntlPlugin = require("../../");

module.exports = {
  entry: "./index",
  target: "node",
  output: {
    filename: "[name].js",
    libraryTarget: 'umd'
  },
  module: {
    rules: [
      {
        test: /\.(i18n|intl|yml|yaml)$/i,
        use: [
          IntlPlugin.loader({name: '[name].[hash].yaml'}),
          'yaml-loader'
        ]
      }
    ]
  },
  plugins: [
    new IntlPlugin({
      search: './src/**/*.yaml',
    })
  ]
};

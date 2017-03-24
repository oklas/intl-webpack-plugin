var JoinPlugin = require('join-webpack-plugin');
var merge = require("merge");

function MergePlugin(options) {

  options.join = function(common, addition) {
    return merge.recursive(
      common ? common : {},
      addition ? JSON.parse(addition) : {}
    );
  };

  options.save = function(common) {
    return JSON.stringify(common);
  };

  JoinPlugin.call(this,options);
}
MergePlugin.prototype = Object.create(JoinPlugin.prototype);

MergePlugin.prototype.loader = JoinPlugin.prototype.loader;
MergePlugin.loader = JoinPlugin.loader;

module.exports = MergePlugin;


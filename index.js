
//! @file
//! @date 2017.01.26
//! @license MIT (in the root of this source tree)
//! @author Serguei Okladnikov <oklaspec@gmail.com>

var JoinPlugin = require('join-webpack-plugin');
var merge = require("merge");

function MergePlugin(options) {

  options.join = function(common, addition) {
    return merge.recursive(
      common ? common : {},
      JSON.parse(addition)
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


var path = require("path");
module.exports = function(dir) {
  var res1, res2;
  res1 = require("./src/data.json");
  res2 = require("./src/target.json");
  if(res1 !== res2) return '"'+res1+'" not equal "'+res2+'"';
  return res1;
};

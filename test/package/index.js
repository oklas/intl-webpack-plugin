var fs = require("fs");
var path = require("path");

function readJsonFile(path) {
  try {
    return JSON.parse(
     fs.readFileSync(path, "utf-8")
    );
  } catch(e){}
  return "";
}

module.exports = function(dir) {
  var res1 = require("./src/component1/ru.intl");
  var res2 = require("./src/component2/ru.i18n");
  if(res1 !== res2) return '"'+res1+'" not equal "'+res2+'"';
  var ru = readJsonFile(res1);
  if(!ru) return "file '"+res1+"' does not exists";
  ru = ru.ru;
  if(!ru) return "key 'ru' does not exists";
  if(ru['must.be.flatten'] != "Привет!") return "flatten is not applied";
  return 'result ok';
};

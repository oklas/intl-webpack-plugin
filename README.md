[![npm][npm-image]][npm-url]
[![travis-cl][travis-image]][travis-url]
[![coverage][cover-image]][cover-url]

# merge plugin for webpack

Webpack plugin with loader for merge sources

This plugin produce single asset for set of files. There are multiple
assets may be produced with grouping technic. The set of files
may be splitted to groups of set of files that produce group of assets.


- [Install](#install)
- [Webpack configuration](#webpack-configuration)
- [Requiring](#requiring)
- [Plugin configuration](#plugin-configuration)
- [Loader configuration](#loader-configuration)
- [Grouping](#grouping)


## Install

```bash
npm install --save merge-webpack-plugin
```


## Webpack configuration

This example is minimal configuration to merge json to single asset:

``` javascript
var MergePlugin = require("merge-webpack-plugin");
module.exports = {
  module: {
    loaders: [
      {
        test: /\.(json)$/i,
        loaders: [
          MergePlugin.loader(),
          // some preloaders
        ]
      }
    ]
  },
  plugins: [
    new MergePlugin({
      search: './src/**/*.json',
    })
  ]
}
```


## Requiring

``` javascript
var url = require("one-of-files.json");
// or if preloaders specified, for example 'yaml-loader'
var url = require("one-of-files.yaml");
```

This will return public url of file with result of merging.
This will be same url for each file merged together.

Files that need to be merged must be required by `require`
or must be prefetched by configure `search` param of
plugin configuration.


## Plugin configuration

MergePlugin typically created at webpack configuration file and
wait hash of configuration options as its create param:

``` javascript
var MergePlugin = require("merge-webpack-plugin");

var merge = new MergePlugin({
  search: 'glob' || ['globs',...],
  skip: 'substr' || /regexp/ || [ 'substr', /regex/, ...],
  loaderOptions: { ...LOADER_OPTIONS }
});
```

Values is (bold marked is mandatory):

* **`search`** - glob pattern or patterns array to find and prefetch files
  see [glob](https://www.npmjs.com/package/glob) module for reference
* `skip` - substring or regular expression or array to skip some from searched results
* `loaderOptions` - default options for loader of this merge plugin,
  loader options described below

The `search` param is like multi-require with glob patterns.
The `search` param is mandatory but may be empty array.
Only files that requred by `require` function in code
will be loaded in that case.

Any file that does not match to `search` or `skip` param but same
time match to loader section in webpack config and required in code
by function `require` will be loaded and merged anyway.


## Loader configuration

To define loader is better call loader function from same object that
in plugin section. If multiple merge plugin or its subclasses is
used this requirement become mandatory:

``` javascript
var MergePlugin = require("merge-webpack-plugin");
var theMerge = new MergePlugin({...})

{
  module: {
  loaders: [
      theMerge.loader({group:'[name]'}),
      // some more pre loaders
    ],
  }
  plugins: [
     theMerge
  ]
}

```

The class function may be used when only one plugin instance
is passed to config. Therefore it is better to use object
form instead of class form:

``` javascript
var theMerge = new MergePlugin({...})

loaders: [
  // this form valid only for single plugin instance:
  MergePlugin.loader(),
  // to avoid problems better to use always object form:
  theMerge.loader(),
],
```

Loader function wait hash of configuration options as its param:
Default values of loader may be specified in plugin configuration
described above.

Values is:

* `group` - this allow grouping of files to separated assets
  by specifing gropping pattern, refer to interpolateName
  [loader-utils](https://github.com/webpack/loader-utils#interpolatename)
* `name` - same as `group` pattern for specifying destination
  asset file name

Configuration values specified directly in `loader()` override
same values specified as default in plugin configuration.


## Grouping

Files may be groupped by simple criteria. Grouping criteria is
specified in `group` loader param. If `group` param is not
specified than will be only one common group where will be 
all files.

* to group files with same name set group param:

```
[name]
```

* to group files with same ext set group param:

```
[ext]
```

* to group files where in each group will be files from same directory:

```
[path]
```

And any derivative combinations.

Groupping criteria formed by template placeholders described
in `interpolateName()` from [loader-utils](https://github.com/webpack/loader-utils#interpolatename) module.


## LICENSE

#### [MIT](./LICENSE.md)

[npm-image]: https://img.shields.io/npm/v/merge-webpack-plugin.svg
[npm-url]: https://npmjs.com/package/merge-webpack-plugin
[travis-image]: https://travis-ci.org/oklas/merge-webpack-plugin.svg
[travis-url]: https://travis-ci.org/oklas/merge-webpack-plugin
[cover-image]: https://img.shields.io/codecov/c/github/oklas/merge-webpack-plugin.svg
[cover-url]: https://codecov.io/gh/oklas/merge-webpack-plugin
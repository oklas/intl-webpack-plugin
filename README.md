[![npm][npm-image]][npm-url]
[![travis-cl][travis-image]][travis-url]
[![coverage][cover-image]][cover-url]

# Internationalization Plugin for Webpack


- [Install](#install)
- [Webpack configuration](#webpack-configuration)
- [Requiring](#requiring-and-library)
- [Building libraries](#building-libraries)
- [Plugin configuration](#plugin-configuration)
- [Loader configuration](#loader-configuration)
- [Grouping](#grouping)


**Webpack plugin with loader for build locales according to
[component approach](https://github.com/oklas/component-intl)**

This is **[webpack](https://webpack.js.org/)** plugin designed to build
locale assets. Advantages to use:

* **component approach** - merge locales from different application
  volumes or its components or from external libraries
* **acceleration** - minimize download time and amount of traffic
  by loading only the required locale
* **configuration flexibility** - locales sources may be described by the
  list of `require/import` in the js source (due to deep webpack integration)
  or as simple glob path pattern in the wepback configuration file
* **developing flexibility** - immediately locale change updatetion in the
  application under webpack dev server (due to deep webpack integration)
* **make structure flatten** - make struct entries keys flatten (if needed)
  for easier to use the branch path as a string key

This is locale data build tool and it is independent from internationalization
library or framework which may be react-intl or i18n-js or yui-intl
or angular-dynamic-locale or any your favorite internationalization system.
A link to a running demonstration
[application](https://oklas.github.io/component-intl-example/).


## Install

```bash
npm install --save intl-webpack-plugin
```


## Webpack configuration

This example is minimal configuration to merge json to single asset:

``` javascript
  module: {
    rules: [
      { test: /\.(intl|i18n|yml|yaml)$/i,
        use: [
          IntlPlugin.loader(),
          'yaml-loader'
        ]
      },
    ]
  },
  plugins: [
    new IntlPlugin({
      search: [ './src/**/*.intl', './src/**/*.i18n' ]
    })
```


## Requiring

The name of file is locale identificator but this may be changed to
file extestion or to path by configure using
[grouping technique](https://github.com/oklas/join-webpack-plugin#grouping)

In order to require the builded locale asset need at least one file which
name matches name of locale. To change this, it is need to configure the
webpack module loading rules and grouping technique as need.

The locale file may be empty (or an empty hash for json format) because
actually loaded asset will be populated with other joined sources of
current locale.


``` javascript
import en from 'en.intl'
import de from 'de.intl'
import fr from 'fr.intl'
...
```

These imported variables contain public urls of assets with locale assembly.

In order to involve files into locale assebly, files must be required by `require`
function or `import` somewhere in code or described by pattern in `search`
param of plugin configuration.

Refer to
[demonstration application](https://github.com/oklas/component-intl-example)
with internationalization for more details about how to configure application
and how to import library with support internationalization.


## Building libraries

To join locales from library package to application locale assets need to:

* describe locale structure organization and format to load to configure plugin
* export file which require necessary locales to join
* or describe files and how to configure plugin to search locale files

So application developers may identify how to integrate location assets to
application and choose way how to configure plugin to join library package
locales with application locales. More about format and structure organization
described in **[component approach](https://github.com/oklas/component-intl)**

Library package locales may be joined by define pattern in `search` plugin
option or by importing module from library in which library locales enumerated
by calling `require` function or `import`.

Refer to the
[demonstration component library](https://github.com/oklas/component-intl-welcome)
example which demonstrates how to create library with support of
internationalization.


## Plugin configuration

IntlPlugin typically created at the webpack configuration file and
waits hash of configuration options as its creation param:

``` javascript
var IntlPlugin = require("intl-webpack-plugin");

var intlPlugin = new IntlPlugin({
  search: 'glob' || ['globs',...],
  skip: 'substr' || /regexp/ || [ 'substr', /regex/, ...],
  flattenLowness: 1,
  flattenDepth: 2,
  ...loaderOptions
});
```

Options:

* `search` - glob pattern or pattern array to find and prefetch
  see [glob](https://www.npmjs.com/package/glob) module for reference
* `skip` - substring or regular expression or array to skip some from
  the searched results
* `flattenLowness` - the level from which struct will be flatten.
  The default value of `flattenLowness` is **1** which reserved for top level
  key locale name, and any another purpose if it does not intersect with
  the names of locales.
* `flattenDepth` - flattenization depth level. The default value `flattenDepth`
  is not defined which mean depth does not limited and works through the depth,
  to disable flattenization specify value **1** on `flattenDepth`
* `group` - the default `group` loader option, the default value is '[name]'
  to join in groups by file name which is equal to the name of the locale
* `name` - default `name` loader option (define pattern for asset file name)

The `search` param is like multi-require with glob patterns.
Only files that required by `require` function in code
will be loaded in that case.

Any file that do not match to `search` or `skip` param and
match to loader section in webpack config and is required in code
by function `require` or `import` will be loaded and merged anyway.


## Loader configuration

The `loader()` method includes intl loader into loader chain.

``` javascript
var IntlPlugin = require("intl-webpack-plugin");
var theIntl = new IntlPlugin({...})

{
  module: {
  loaders: [
      theIntl.loader({...options}),
      // some more pre loaders
    ],
  }
  plugins: [
     theIntl
  ]
}

```

Preliminary loaders must be applied before intl loader. This means that
intl loader must be final loader in loaders chain.

Loader function waits hash of configuration options as its param.
Default values of loader may be specified in plugin configuration
described above.

Loader options:

* `group` - devides files into separated assets by specifying
  groping pattern. May include template placeholders described
  below in groupping section.
* `name` - specifies destination asset file name. String value
  supportive loader template interpolation placeholders.

Configuration options specified directly in call `loader()` function
override same values specified as default in plugin configuration.


The `loader()` function may be invoked as class function if only one plugin
instance is passed to config. Therefore it is better to use object form
instead of class form:

``` javascript
var theIntl = new IntlPlugin({...})

loaders: [
  // this form valid only for single plugin instance:
  IntlPlugin.loader(),
  // to avoid problems better to use always object form:
  theIntl.loader(),
],
```


## See also

* **[demonstration application](https://github.com/oklas/component-intl-example)** -
  with internationalization as example how to configure application and
  how to import library support internationalization.
* **[demonstration component library](https://github.com/oklas/component-intl-welcome)** -
  example for more details about how to create library with support
  internationalization.
* **[join-webpack-plugin](https://github.com/oklas/join-webpack-plugin)** -
  to join sources by user defined method.
* **[merge-webpack-plugin](https://github.com/oklas/merge-webpack-plugin)** -
  plugin to merge json files to asset (or aseets with grouping)


## LICENSE

#### [MIT](./LICENSE.md)

[npm-image]: https://img.shields.io/npm/v/intl-webpack-plugin.svg
[npm-url]: https://npmjs.com/package/intl-webpack-plugin
[travis-image]: https://travis-ci.org/oklas/intl-webpack-plugin.svg
[travis-url]: https://travis-ci.org/oklas/intl-webpack-plugin
[cover-image]: https://img.shields.io/codecov/c/github/oklas/intl-webpack-plugin.svg
[cover-url]: https://codecov.io/gh/oklas/intl-webpack-plugin
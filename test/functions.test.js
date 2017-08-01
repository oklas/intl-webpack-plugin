var IntlPlugin = require("../");

var fs = require("fs");
var path = require("path");
var expect = require("expect");
var webpack = require("webpack");

var packageDir = path.join(__dirname, "package");
var distDir = path.join(__dirname, "dist");

describe('Test function join', function() {
  it('is merge', function() {
    var intl = new IntlPlugin({
      search: 'none'
    })

    var res = intl.options.join({a:1}, '{"b":2}')
    expect(res.a).toEqual(1)
    expect(res.b).toEqual(2)
  })
})
    
describe('Test function save', function() {
  it('can do full flattenization', function() {
    var intl = new IntlPlugin({
      search: 'none',
      flattenLowness: 0
    })
    var res = JSON.parse(intl.options.save(
      {a: {b1: 'a.b1', b2: {c: 'a.b2.c'}}, aa:[{c:'aa.0.c'}]}
    ))
    expect(res['a.b1']).toEqual('a.b1')
    expect(res['a.b2.c']).toEqual('a.b2.c')
    expect(res['aa.0.c']).toEqual('aa.0.c')
  })

  it('can do flattenization started from some lowness', function() {
    var intl = new IntlPlugin({
      search: 'none',
      flattenLowness: 1,
    })
    var res = JSON.parse(intl.options.save(
      {a: {b1: 'a.b1', b2: {c: 'a.b2.c'}}, aa:[{c:'aa.0.c'}]}
    ))
    expect(res['a']['b1']).toEqual('a.b1')
    expect(res['a']['b2.c']).toEqual('a.b2.c')
    expect(res['aa']['0.c']).toEqual('aa.0.c')
  })

  it('can do flattenization through some depth', function() {
    var intl = new IntlPlugin({
      search: 'none',
      flattenLowness: 0,
      flattenDepth: 2
    })
    var res = JSON.parse(intl.options.save(
      {a: {b1: 'a.b1', b2: {c: 'a.b2.c'}}, aa:[{c:'aa.0.c'}]}
    ))
    expect(res['a.b1']).toEqual('a.b1')
    expect(res['a.b2']['c']).toEqual('a.b2.c')
    expect(res['aa.0']['c']).toEqual('aa.0.c')
  })

  it('flattenization must not split string as array', function() {
    var intl = new IntlPlugin({
      search: 'none',
      flattenLowness: 2,
    })
    var res = JSON.parse(intl.options.save(
      {a: {b1: 'a.b1', b2: {c: 'a.b2.c'}}, aa:[{c:'aa.0.c'}]}
    ))
    expect(res['a']['b1']).toEqual('a.b1')
    expect(res['a']['b2']['c']).toEqual('a.b2.c')
    expect(res['aa']['0']['c']).toEqual('aa.0.c')
  })
})

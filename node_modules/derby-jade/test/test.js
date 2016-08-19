var assert = require("assert");
var fs = require("fs");
var app = {
  viewExtensions: [],
  compilers: {}
}
var dJade = require("../");

describe("Jade compiler", function() {
  it("should compile Derby.js stuff", function() {
    dJade(app);
    var compiler = app.compilers[".jade"];
    var jade = fs.readFileSync(__dirname + "/basic/js.jade", "utf8");
    var html = fs.readFileSync(__dirname + "/basic/result.html", "utf8");
    assert.equal(compiler(jade, __dirname + "/basic/js.jade"), html);
  });

  it("should compile coffee in <script> when 'coffee' option is on", function() {
    dJade(app, {coffee: true});
    var compiler = app.compilers[".jade"];
    var jade = fs.readFileSync(__dirname + "/basic/coffee.jade", "utf8");
    var html = fs.readFileSync(__dirname + "/basic/result.html", "utf8");
    assert.equal(compiler(jade, __dirname + "/basic/coffee.jade"), html);
  });

  it("should do basic extend of a file", function() {
    dJade(app);
    var compiler = app.compilers[".jade"];
    var jade = fs.readFileSync(__dirname
      + "/jadeFeatures/basicExtends/index.jade", "utf8");
    var html = fs.readFileSync(__dirname
      + "/jadeFeatures/basicExtends/result.html", "utf8");
    assert.equal(compiler(jade,
        __dirname + "/jadeFeatures/basicExtends/index.jade"), html);
  });

  it("should support 'block' when extends", function() {
    dJade(app);
    var compiler = app.compilers[".jade"];
    var jade = fs.readFileSync(__dirname
      + "/jadeFeatures/block/index.jade", "utf8");
    var html = fs.readFileSync(__dirname
      + "/jadeFeatures/block/result.html", "utf8");
    assert.equal(compiler(jade,
        __dirname + "/jadeFeatures/block/index.jade"), html);
  });

  it("should pass tricky case", function() {
    dJade(app);
    var compiler = app.compilers[".jade"];
    var jade = fs.readFileSync(__dirname
      + "/jadeFeatures/advanced/index.jade", "utf8");
    var html = fs.readFileSync(__dirname
      + "/jadeFeatures/advanced/result.html", "utf8");
    assert.equal(compiler(jade,
        __dirname + "/jadeFeatures/advanced/index.jade"), html);
  });

  it.skip("should extend file with <script> in it", function() {
    dJade(app);
    var compiler = app.compilers[".jade"];
    var jade = fs.readFileSync(__dirname
      + "/jadeFeatures/scriptExtends/index.jade", "utf8");
    var html = fs.readFileSync(__dirname
      + "/basic/result.html", "utf8");
    assert.equal(compiler(jade,
        __dirname + "/jadeFeatures/scriptExtends/index.jade"), html);
  });

  it("should support BEM shorthand: compile '&' into element name of component", function() {
    dJade(app);
    var compiler = app.compilers[".jade"];
    var jade = fs.readFileSync(__dirname + "/extra/bem/index.jade", "utf8");
    var html = fs.readFileSync(__dirname + "/extra/bem/result.html", "utf8");
    assert.equal(compiler(jade, __dirname + "/extra/bem/index.jade"), html);
  });

  it("should support module mode", function() {
    dJade(app, {globals: {moduleMode: true}});
    var compiler = app.compilers[".jade"];
    var jade = fs.readFileSync(__dirname + "/extra/module/index.jade", "utf8");
    var html = fs.readFileSync(__dirname + "/extra/module/result.html", "utf8");
    assert.equal(compiler(jade, __dirname + "/extra/module/index.jade"), html);
  });


});
var FileWriter = require('../core/Writer').File;
var Transformer = require('../core/Transformer');
var androidTransformer = Transformer.android;
var iosTransformer = Transformer.ios;
var Line = require('../core/Line');
var EOL = require('os').EOL;

exports.test_getTransformedLines_WithAndroidTransformer_ShouldReturnXml = function(test) {

    var writer = new FileWriter('path');
    var result = writer.getTransformedLines([new Line('key', 'value'), new Line('// commentaire'), new Line('key2', 'value2')], androidTransformer);

    test.equal('<string name="key">value</string>' + EOL + '<!-- commentaire -->' + EOL + '<string name="key2">value2</string>', result);

    test.done();
}

exports.test_getTransformedLines_WithiOSTransformer_ShouldReturnInFormat = function(test) {

    var writer = new FileWriter('path');
    var result = writer.getTransformedLines([new Line('key', 'value'), new Line('# commentaire'), new Line('key2', 'value2')], iosTransformer);

    test.equal('"key" = "value";' + EOL + '// commentaire' + EOL + '"key2" = "value2";', result);

    test.done();
}

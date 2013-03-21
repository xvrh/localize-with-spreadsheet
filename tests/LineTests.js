var Line = require('../core/Line');

exports.test_isCommentIsFalseWhenNotComment = function (test) {
    var line = new Line('pas un commentaire', 'une valeur');

    test.equal(false, line.isComment());
    test.done();
};

exports.test_isCommentIsTrueWhenComment = function (test) {
    var line1 = new Line('// un commentaire');
    var line2 = new Line('# un commentaire');

    test.equal(true, line1.isComment());
    test.equal(true, line2.isComment());
    test.done();
};

exports.test_getCommentRemoveCommentStarter = function (test) {
    var line1 = new Line('// un commentaire');
    var line2 = new Line('# un commentaire   ');

    test.equal('un commentaire', line1.getComment());
    test.equal('un commentaire', line2.getComment());
    test.done();
};

exports.test_isEmptyWhenEmpty = function (test) {
    var line1 = new Line(null, null);

    test.equal(true, line1.isEmpty());
    test.equal(false, line1.isComment());
    test.done();
};

exports.test_getFields = function (test) {
    var line1 = new Line('key', 'value');

    test.equal('key', line1.getKey());
    test.equal('value', line1.getValue());
    test.equal(false, line1.isEmpty());
    test.equal(false, line1.isComment());
    test.done();
};
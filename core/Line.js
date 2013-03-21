var COMMENT_STARTERS = ['//', '#'];

var Line = function (key, value) {
    if (!key) {
        key = '';
    }
    key = key.toString();

    var isComment = Line.checkIsComment(key);

    if (isComment) {
        key = Line.normalizeComment(key);
    }

    this._isComment = isComment;
    this._key = key || '';
    this._value = value || '';

}

Line.checkIsComment = function (val) {
    for (var i = 0; i < COMMENT_STARTERS.length; i++) {
        var commentStarter = COMMENT_STARTERS[i];
        if (val.indexOf(commentStarter) == 0) {
            return true;
        }
    }
    return false;
};

Line.normalizeComment = function (val) {
    for (var i = 0; i < COMMENT_STARTERS.length; i++) {
        var commentStarter = COMMENT_STARTERS[i];
        var index = val.indexOf(commentStarter);
        if (index == 0) {
            var normalized = val.substr(commentStarter.length, val.length - commentStarter.length);
            normalized = normalized.trim();
            return normalized;
        }
    }
    return val;
};

Line.prototype.isEmpty = function () {
    return !this._isComment && !this._key;
};

Line.prototype.isComment = function () {
    return this._isComment;
};

Line.prototype.getComment = function () {
    return this._key;
};

Line.prototype.getKey = function () {
    return this._key;
};

Line.prototype.getValue = function () {
    return this._value;
};

module.exports = Line;
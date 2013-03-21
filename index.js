var GSReader = require('./core/LineReader.js').GS;
var FileWriter = require('./core/Writer.js').File;
var Transformer = require('./core/Transformer.js');

var Gs2File = function (reader, writer) {
    this._reader = reader;
    this._writer = writer;
};

Gs2File.fromGoogleSpreadsheet = function (spreadsheetKey, sheets) {
    var gs2file = new Gs2File(new GSReader(spreadsheetKey, sheets),
                              new FileWriter());

    return gs2file;
};

Gs2File.prototype.setValueCol = function(valueCol) {
    this._defaultValueCol = valueCol;
}

Gs2File.prototype.setKeyCol = function(keyCol) {
    this._defaultKeyCol = keyCol;
}

Gs2File.prototype.setFormat = function(format) {
    this._defaultFormat = format;
}

Gs2File.prototype.save = function (outputPath, opts, cb) {
    console.log('saving ' + outputPath);
    var self = this;

    opts = opts || {};

    var keyCol = opts.keyCol,
        valueCol = opts.valueCol,
        format = opts.format;

    if(!keyCol) {
        keyCol = this._defaultKeyCol;
    }

    if(!valueCol) {
        valueCol = this._defaultValueCol;
    }

    if(!format) {
        format = this._defaultFormat;
    }

    this._reader.select(keyCol, valueCol).then(function(lines) {
        if(lines) {
            var transformer = Transformer[format || 'android'];

            self._writer.write(outputPath, lines, transformer);
        }

        if(typeof(cb) == 'function') {
            cb();
        }
    });

};

module.exports = Gs2File;
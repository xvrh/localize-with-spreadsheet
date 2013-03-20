var Line = require('./Line.js');
var GoogleSpreadsheet = require('google-spreadsheet');

var LineReader = {
    select: function (sheets, keyCol, keyVal, cb) {
    }
};

var GSReader = function (spreadsheetKey, sheetsFilter) {
    this._sheet = new GoogleSpreadsheet(spreadsheetKey);
    this._sheetsFilter = sheetsFilter;

    this._fetchedWorksheets = null;
};

GSReader.prototype.fetchAllCells = function (cb) {
    var self = this;

    this._fetchedWorksheets = [];
    this._sheet.getInfo(function (err, data) {
        if (err) {
            cb();
        } else {
            var worksheetReader = new WorksheetReader(this._sheetsFilter, data);
            worksheetReader.read(function (fetchedWorksheets) {
                self._fetchedWorksheets = fetchedWorksheets;
                cb();
            });
        }
    });
}

GSReader.prototype.select = function (keyCol, keyVal, cb) {
    var self = this;

    if (this._fetchedWorksheets == null) {
        this.fetchAllCells(function () {
            self.select(keyCol, keyVal, cb);
        });
    } else {
        var extractedLines = self.extractFromRawData(self._fetchedWorksheets, keyCol, keyVal);
        cb(extractedLines);
    }
};

GSReader.prototype.extractFromRawData = function (rawWorksheets, keyCol, keyVal) {
    var extractedLines = [];
    for (var i = 0; i < rawWorksheets.length; i++) {
        var extracted = this.extractFromWorksheet(rawWorksheets[i], keyCol, keyVal);
        extractedLines.push.apply(extractedLines, extracted);
    }
}

GSReader.prototype.extractFromWorksheet = function (rawWorksheet, keyCol, keyVal) {
    var results = [];

    var rows = this.flatenWorksheet(rawWorksheet);

    var headers = rows[0];
    if (headers) {
        var keyIndex = -1, valIndex = -1;
        for (var i = 0; i < headers.length; i++) {
            var value = headers[i];
            if (value == keyCol) {
                keyIndex = i;
            }
            if (value == keyVal) {
                valIndex = i;
            }
        }
        for (var i = 1; i < rows.length; i++) {
            var row = rows[i];
            if (row) {
                var keyValue = row[keyIndex];
                var valValue = row[valIndex];

                results.push(new Line(keyValue, valValue));
            }
        }
    }

    return results;
}

GSReader.prototype.flatenWorksheet = function (rawWorksheet) {
    var rows = [];
    for (var i = 0; i < rawWorksheet.length; i++) {
        var cell = rawWorksheet[i];

        var row = rows[cell.row - 1];
        if (!row) {
            row = rows[cell.row - 1] = [];
        }
        row[cell.col - 1] = cell.value;
    }
    return rows;
}

GSReader.isAllSheets = function (sheet) {
    if (!sheet || sheet == '*') {
        return true;
    }
    return false;
};

GSReader.shouldUseWorksheet = function (selectedSheets, title, index) {
    if (GSReader.isAllSheets(selectedSheets)) {
        return true;
    } else {
        var selectedArray = forceArray(selectedSheets);
        for (var i = 0; i < selectedArray.length; i++) {
            var a = selectedArray[i];

            if (typeof(a) == "number" && index == a) {
                return true;
            } else if (typeof(a) == "string" && title == a) {
                return true;
            }
        }
        return false;
    }
}

var WorksheetReader = function (filterSheets, worksheets) {
    this._filterSheets = filterSheets;
    this._worksheets = worksheets;
    this._index = 0;

    this._data = [];
}

WorksheetReader.prototype.read = function (cb) {
    this.next(cb);
}

WorksheetReader.prototype.next = function (cb) {
    var self = this;
    if (this._index < this._worksheets.length) {
        var currentWorksheet = this._worksheets[this._index];
        if (GSReader.shouldUseWorksheet(this._filterSheets, currentWorksheet.title, this._index)) {
            currentWorksheet.getCells(null, function (err, cells) {
                if (!err) {
                    var transformedCells = self.transformRawData(cells);

                    this._data.push(cells);
                }
                self.next(cb);
            });
        } else {
            this.next(cb);
        }
    } else {
        cb(this._data);
    }
}

var FakeReader = function (array) {
    this._array = array;
    this._index = 0;
};

FakeReader.prototype.select = function (sheets, keyCol, keyVal, cb) {
    var self = this;
    var target = [];

    this._array.forEach(function (key) {
        var v = self._array[key];

        target.push(new Line(v[keyCol], v[keyVal]));
    });

    cb(target);
};

var forceArray = function (val) {
    if (Array.isArray(val)) return val;
    if (!val) return [];
    return [ val ];
}

module.exports = {
    GS: GSReader,
    Fake: FakeReader
}



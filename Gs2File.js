var GoogleSpreadsheet = require("google-spreadsheet");

var Gs2File = function (spreadsheetKey, defaults) {
    this._spreadsheetKey = spreadsheetKey;
    this._defaults = defaults;
};

Gs2File.prototype.setDefaults = function (defaults) {
    this._defaults = defaults;
};

Gs2File.prototype.save = function (outputPath, opts) {
    console.log('save');

    // Input (googlespreadsheet or fake)
    // Output (file or fake)
    // Transformer (Android, iOS...)
    // Data (Key/Value | commentaire)
    // Glue == Gs2File (dependency injection / testable...)


    var my_sheet = new GoogleSpreadsheet(this._spreadsheetKey);
    /*my_sheet.getInfo(function(err, data) {
     console.log(err);
     console.log(data);
     });*/

    my_sheet.getCells(1, function (err, row_data) {
        console.log(err);
        console.log(row_data);
        /*console.log( 'pulled in '+ row_data.length + ' rows ');
         for(var i = 0; i < row_data.length; i++) {
         var row = row_data[i];
         console.log(row);
         } */
    });

};

module.exports = Gs2File;
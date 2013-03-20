var fs = require('fs');
var EOL = require('os').EOL;

var Writer = function() {

};

Writer.prototype.write = function(lines, transformer) {

};


var FileWriter = function(filePath) {
    this._filePath = filePath;
};

FileWriter.prototype.write = function(lines, transformer) {
    var fileContent = fs.readFileSync(this._filePath, 'utf8');

    var valueToInsert = this.getTransformedLines(lines, transformer);

    var output = transformer.insert(fileContent, valueToInsert);

    fs.writeFile(this._filePath, output, 'utf8');
};

FileWriter.prototype.getTransformedLines = function(lines, transformer) {
    var valueToInsert = '';
    for(var i = 0; i < lines.length; i++) {
        var line = lines[i];
        if(line.isEmpty()) {
            valueToInsert += EOL;
        } else if(line.isComment()) {
            valueToInsert += EOL + transformer.transformComment(line.getComment());
        } else {
            valueToInsert += EOL + transformer.transformKeyValue(line.getKey(), line.getValue());
        }
    }

    return valueToInsert;
}

var FakeWriter = function() {

};

FakeWriter.prototype.write = function(lines, transformer) {

};

exports = { File: FileWriter, Fake: FakeWriter };

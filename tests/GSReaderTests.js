var GSReader = require("../core/LineReader.js").GS;

exports.testShouldUseWorksheetWhenEmptyOrNullOrStar = function(test) {
    test.equal(true, GSReader.shouldUseWorksheet('', 'LeTitre', 1));
    test.equal(true, GSReader.shouldUseWorksheet(null, 'LeTitre', 1));
    test.equal(true, GSReader.shouldUseWorksheet('*', 'LeTitre', 1));
    test.equal(false, GSReader.shouldUseWorksheet('a', 'LeTitre', 1));

    test.done();
}

exports.testShouldNotUseWorksheetWhenTitleNotSpecified = function(test) {
    test.equal(false, GSReader.shouldUseWorksheet(['a', 'b'], 'LeTitre', 1));
    test.equal(false, GSReader.shouldUseWorksheet(['a', 2], 'LeTitre', 1));

    test.done();
}

exports.testShouldUseWorksheetWhenTitleOrIndexSpecified = function(test) {
    test.equal(true, GSReader.shouldUseWorksheet(['a', 'LeTitre'], 'LeTitre', 1));
    test.equal(true, GSReader.shouldUseWorksheet(['a', 1], 'LeTitre', 1));

    test.done();
}

exports.testExtractFromWorksheetShouldExtraLines = function(test) {
    var reader = new GSReader('api_key', '*');

    var rawWorksheet = [{ value: 'Key', row: 1, col: 1 },
        { value: 'Value_fr', row: 1, col: 2 },
        { value: 'Value_nl', row: 1, col: 3 },
        { value: 'MaClé1', row: 2, col: 1 },
        { value: 'La valeur 1', row: 2, col: 2 },
        { value: 'De valuue 1', row: 2, col: 3 },
        { value: 'MaClé2', row: 3, col: 1 },
        { value: 'La vale de la clé 2', row: 3, col: 2 },
        { value: 'De valuee van key 2', row: 3, col: 3 },
        { value: '// un commentaire', row: 4, col: 1 },
        { value: 'une clée', row: 5, col: 1 },
        { value: '# un autre commentaire', row: 7, col: 1 }];

    var result = reader.extractFromWorksheet(rawWorksheet, 'Key', 'Value_fr');

    test.equal(6, result.length);
    test.equal('MaClé1', result[0].getKey());
    test.equal('La valeur 1', result[0].getValue());

    test.equal(true, result[2].isComment());
    test.equal(true, result[4].isEmpty());

    test.done();
}

exports.testExtractFromWorksheet_WhenValColumnDontExist_ShouldStillWork = function(test) {
    var reader = new GSReader('api_key', '*');

    var rawWorksheet = [{ value: 'Key', row: 1, col: 1 },
        { value: 'Value_fr', row: 1, col: 2 },
        { value: 'Value_nl', row: 1, col: 3 },
        { value: 'MaClé1', row: 2, col: 1 },
        { value: 'La valeur 1', row: 2, col: 2 },
        { value: 'De valuue 1', row: 2, col: 3 }];

    var result = reader.extractFromWorksheet(rawWorksheet, 'Key', 'NotExist');

    test.equal(1, result.length);
    test.equal('MaClé1', result[0].getKey());
    test.equal('', result[0].getValue());

    test.equal(false, result[0].isComment());

    test.done();
}

exports.testExtractFromWorksheet_ShouldKeepEmptyLines = function(test) {
    var reader = new GSReader('api_key', '*');

    var rawWorksheet = [{ value: 'Key', row: 1, col: 1 },
        { value: 'Value_fr', row: 1, col: 2 },
        { value: 'Value_nl', row: 1, col: 3 },
        { value: 'MaClé1', row: 3, col: 1 },
        { value: 'La valeur 1', row: 3, col: 2 },
        { value: 'De valuue 1', row: 3, col: 3 }];

    var result = reader.extractFromWorksheet(rawWorksheet, 'Key', 'Value_fr');

    test.equal(2, result.length);
    test.equal(true, result[0].isEmpty());
    test.equal(false, result[1].isEmpty());

    test.done();
}
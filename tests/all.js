var reporter = require('nodeunit').reporters.default;
reporter.run([
    'tests/AndroidTransformerTests.js',
    'tests/iOSTransformerTests.js',
    'tests/LineTests.js',
    'tests/GSReaderTests.js',
    'tests/WriterTests.js'
]);

# Convert a Google Spreadsheet to a localization file


## Installation
	npm install localize-with-spreadsheet


## Example
Given a Google Spreadsheet like this:
![Spreadsheet example](doc/spreadsheet-example.png)

Create a file update-localization.js
	var Gs2File = require("../index.js");

    var transformer = Gs2File.fromGoogleSpreadsheet("0Aq6WlQdq71FydDZlaWdmMEUtc2tUb1k2cHRBS2hzd2c", '*');
    transformer.setKeyCol('KEY');

    transformer.save("values/strings.xml", { valueCol: "NL", format: "android" });
    transformer.save("values-fr/strings.xml", { valueCol: "FR", format: "android" });

    transformer.save("nl.lproj/Localizable.strings", { valueCol: "NL", format: "ios" });
    transformer.save("fr.lproj/Localizable.strings", { valueCol: "FR", format: "ios" });

## Advanced

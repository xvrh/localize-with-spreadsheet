var Localize = require("../index.js");

var transformer = Localize.fromGoogleSpreadsheet("0Aq6WlQdq71FydDZlaWdmMEUtc2tUb1k2cHRBS2hzd2c");
transformer.setKeyCol('KEY');

transformer.save("samples/values/nl.json", { valueCol: "NL", format: "json", header: '' });
transformer.save("samples/values/fr.json", { valueCol: "FR", format: "json" });
transformer.save("samples/values/r.dart", { valueCol: "FR", format: "dartTemplate", className: 'Translations' });
transformer.save("samples/values/strings.xml", { valueCol: "NL", format: "android" });
transformer.save("samples/values-fr/strings.xml", { valueCol: "FR", format: "android" });
transformer.save("samples/values/ios-nl.txt", { valueCol: "NL", format: "ios", encoding:'UCS-2' });
transformer.save("samples/values/ios-fr.txt", { valueCol: "FR", format: "ios", encoding:'UCS-2' });
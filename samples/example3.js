var Localize = require("../index.js");
var transformer = Localize.fromGoogleSpreadsheet("0Aq6WlQdq71FydGZINE5LREtNZ09kb0YtNVN4NnJwWnc", '*');
transformer.setKeyCol('KEY');

transformer.save("samples/values-3/strings.xml", { valueCol: "NL", format: "android" });
transformer.save("samples/values-3/strings-fr.xml", { valueCol: "FR", format: "android" });
var Gs2File = require("../index.js");

var transformer = Gs2File.fromGoogleSpreadsheet("0Aq6WlQdq71FydHZtNDFJTzlIRzZsbkw2OFV6X2ExMFE");//0Aq6WlQdq71FydEprelR1UTNfM21GR1JTTFh5aUlGd2c
transformer.setKeyCol('KEY');

transformer.save("samples/values/strings2.xml", { valueCol: "DEFAULT", format: "android" });
transformer.save("samples/values-fr/strings2.xml", { valueCol: "ES", format: "android" });

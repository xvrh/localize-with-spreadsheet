
var Gs2File = require("./../Gs2File.js");
console.log('run the app');
var transformer = new Gs2File("0Aq6WlQdq71FydDZlaWdmMEUtc2tUb1k2cHRBS2hzd2c", {
        keyCol: "Key",
        format: "android",
        sheets: '*'
});
transformer.save("fr/strings.xml", { valueCol: "Value_fr" });
//transformer.save("nl/strings.xml", { valueCol: "Value_nl" });
function myFunction() {
  for (let i = 0; i < 650; i++) {
      var response = UrlFetchApp.fetch("https://camo.githubusercontent.com/03f35bb2dd48bf7af86908e6832b8e4e038435463f5a041b6180a0103afb2f22/68747470733a2f2f6b6f6d617265762e636f6d2f67687076632f3f757365726e616d653d696d7669636b796b756d617226636f6c6f723d626c7565266c6162656c3d50524f46494c452b5649455753267374796c653d666c61742d737175617265");
      Logger.log(response.getContentText());
    }
}

function elementToJSON(element) {
  var result = {};
  // Attributes.
  element.getAttributes().forEach(function (attribute) {
    result[attribute.getName()] = attribute.getValue();
  });
  // Child elements.
  element.getChildren().forEach(function (child) {
    var key = child.getName();
    var value = elementToJSON(child);
    if (result[key]) {
      if (!(result[key] instanceof Array)) {
        result[key] = [result[key]];
      }
      result[key].push(value);
    } else {
      result[key] = value;
    }
  });
  // Text content.
  if (element.getText()) {
    result['Text'] = element.getText();
  }
  return result;
}

function myTracker() {
  let url = "https://camo.githubusercontent.com/03f35bb2dd48bf7af86908e6832b8e4e038435463f5a041b6180a0103afb2f22/68747470733a2f2f6b6f6d617265762e636f6d2f67687076632f3f757365726e616d653d696d7669636b796b756d617226636f6c6f723d626c7565266c6162656c3d50524f46494c452b5649455753267374796c653d666c61742d737175617265";

  let fact = UrlFetchApp.fetch(url);
  var doc = XmlService.parse(fact);

  var result = {};
  var root = doc.getRootElement();
  result[root.getName()] = elementToJSON(root);
  var myResult = result.svg.g[1].text[2].Text

  var timezone = "GMT+" + new Date().getTimezoneOffset()/60
  var date = Utilities.formatDate(new Date(), timezone, "yyyy-MM-dd HH:mm"); // "yyyy-MM-dd'T'HH:mm:ss'Z'"
  Logger.log(myResult);
  Logger.log(date);

  let sheet = SpreadsheetApp.getActiveSheet();
  sheet.getRange(1,1).setValue("Unix Timestamp");
  sheet.getRange(1,2).setValue("Counter");

  sheet.getRange(sheet.getLastRow() + 1,1).setValue(date);
  sheet.getRange(sheet.getLastRow() + 0,2).setValue(myResult);
}

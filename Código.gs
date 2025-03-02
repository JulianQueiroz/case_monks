function doGet() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getSheetByName("Products");
  var data = sheet.getDataRange().getValues();
  var header = data[0];

  var idxColor = header.indexOf("COLOR");
  var idxSize = header.indexOf("SIZE");

  var colorsSet = {};
  var sizesSet = {};

  for (var i = 1; i < data.length; i++) {
    var row = data[i];
    var color = row[idxColor];
    var size = row[idxSize];
    if (color) colorsSet[color] = true;
    if (size) sizesSet[size] = true;
  }

  var uniqueColors = Object.keys(colorsSet);
  var uniqueSizes = Object.keys(sizesSet);

  var template = HtmlService.createTemplateFromFile("page");
  template.uniqueColors = uniqueColors;
  template.uniqueSizes = uniqueSizes;
  
  return template.evaluate();
}

function saveResultsToSheet(results) {
  var spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  var resultsSheet = spreadsheet.getSheetByName("Results");

  if (!resultsSheet) {
    resultsSheet = spreadsheet.insertSheet("Results");
  } else {
    resultsSheet.clear(); 
  }

  if (results.length === 0) {
    resultsSheet.appendRow(["No products found"]);
    return;
  }

  var header = spreadsheet.getSheetByName("Products").getDataRange().getValues()[0];

  resultsSheet.appendRow(header);

  results.forEach(row => {
    resultsSheet.appendRow(row);
  });
}

function filterProducts(filters) {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Products");
  var data = sheet.getDataRange().getValues();
  var header = data[0];
  var results = [];

  var idxPrice = header.indexOf("PRICE");
  var idxColor = header.indexOf("COLOR");
  var idxSize = header.indexOf("SIZE");
  var idxGender = header.indexOf("GENDER");

  for (var i = 1; i < data.length; i++) {
    var row = data[i];
    var price = parseFloat(row[idxPrice]);
    var productColor = row[idxColor];
    var productSize = row[idxSize];
    var productGender = row[idxGender];

    if ((filters.minPrice === "" || price >= filters.minPrice) &&
        (filters.maxPrice === "" || price <= filters.maxPrice) &&
        (filters.color === "" || productColor.toLowerCase() === filters.color.toLowerCase()) &&
        (filters.size === "" || String(productSize).toLowerCase() === filters.size.toLowerCase()) &&
        (filters.gender === "" || productGender.toLowerCase() === filters.gender.toLowerCase())) {
      results.push(row);
    }
  }

  saveResultsToSheet(results);

  return results;
}

function getFilteredProducts(filtersJson) {
  var filters = JSON.parse(filtersJson);
  var results = filterProducts(filters);
  return JSON.stringify(results);
}

// Ganti ID ini dengan ID Google Sheets Anda
var SHEET_ID = '1-Q3j047rDxO3PvPxn5A6lgOi8kiOJDfhNWAQN2z_ZLQ';

function doGet(e) {
  var sheetName = e.parameter.sheet;
  if (!sheetName) return ContentService.createTextOutput(JSON.stringify({error: "Parameter 'sheet' tidak ditemukan"})).setMimeType(ContentService.MimeType.JSON);
  
  var sheet = SpreadsheetApp.openById(SHEET_ID).getSheetByName(sheetName);
  if (!sheet) return ContentService.createTextOutput(JSON.stringify({error: "Sheet tidak ditemukan"})).setMimeType(ContentService.MimeType.JSON);
  
  var data = sheet.getDataRange().getValues();
  if (data.length === 0) return ContentService.createTextOutput(JSON.stringify({data: []})).setMimeType(ContentService.MimeType.JSON);
  
  var headers = data[0];
  var rows = [];
  
  for (var i = 1; i < data.length; i++) {
    var rowData = {};
    for (var j = 0; j < headers.length; j++) {
      rowData[headers[j]] = data[i][j];
    }
    rowData['_rowIndex'] = i + 1;
    rows.push(rowData);
  }
  
  return ContentService.createTextOutput(JSON.stringify({data: rows})).setMimeType(ContentService.MimeType.JSON);
}

function doPost(e) {
  var action = e.parameter.action;
  var sheetName = e.parameter.sheet;
  
  try {
    var payload = JSON.parse(e.postData.contents);
    
    // ACTION UPLOAD FILE KE GOOGLE DRIVE
    if (action === 'upload') {
      var base64Data = payload.base64;
      var fileName = payload.name;
      var mimeType = payload.mimeType;
      
      var decoded = Utilities.base64Decode(base64Data);
      var blob = Utilities.newBlob(decoded, mimeType, fileName);
      
      var file = DriveApp.createFile(blob);
      file.setSharing(DriveApp.Access.ANYONE_WITH_LINK, DriveApp.Permission.VIEW);
      
      // Return direct view URL
      var fileId = file.getId();
      var directUrl = "https://drive.google.com/uc?export=view&id=" + fileId;
      
      return ContentService.createTextOutput(JSON.stringify({success: true, url: directUrl})).setMimeType(ContentService.MimeType.JSON);
    }
    
    // CRUD BEYOND THIS POINT
    var sheet = SpreadsheetApp.openById(SHEET_ID).getSheetByName(sheetName);
    if (!sheet) throw "Sheet tidak ditemukan";
    
    var headers = sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues()[0];
    
    if (action === 'create') {
      var newRow = [];
      for (var i = 0; i < headers.length; i++) {
        newRow.push(payload[headers[i]] || "");
      }
      sheet.appendRow(newRow);
      return ContentService.createTextOutput(JSON.stringify({success: true, message: "Data berhasil ditambah"})).setMimeType(ContentService.MimeType.JSON);
      
    } else if (action === 'update') {
      var rowIndex = payload['_rowIndex'];
      if (!rowIndex) throw "Index baris (_rowIndex) tidak ditemukan";
      
      var updateRow = [];
      for (var i = 0; i < headers.length; i++) {
        updateRow.push(payload[headers[i]] || "");
      }
      sheet.getRange(rowIndex, 1, 1, updateRow.length).setValues([updateRow]);
      return ContentService.createTextOutput(JSON.stringify({success: true, message: "Data berhasil diubah"})).setMimeType(ContentService.MimeType.JSON);
      
    } else if (action === 'delete') {
      var rowIndex = payload['_rowIndex'];
      if (!rowIndex) throw "Index baris (_rowIndex) tidak ditemukan";
      
      sheet.deleteRow(rowIndex);
      return ContentService.createTextOutput(JSON.stringify({success: true, message: "Data berhasil dihapus"})).setMimeType(ContentService.MimeType.JSON);
    }
    
  } catch (err) {
    return ContentService.createTextOutput(JSON.stringify({error: err.toString()})).setMimeType(ContentService.MimeType.JSON);
  }
}

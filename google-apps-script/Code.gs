const SPREADSHEET_ID = '14b8CrE0W6fvS22E4e20rH4LYB4rsU4Q7DBHpdXvalSw';
const SHEET_NAME = 'Leads';

function doPost(event) {
  const spreadsheet = SpreadsheetApp.openById(SPREADSHEET_ID);
  const sheet = spreadsheet.getSheetByName(SHEET_NAME) || spreadsheet.getSheets()[0];
  const data = event.parameter;

  if (sheet.getLastRow() === 0) {
    sheet.appendRow(['Thời gian', 'Họ tên', 'SĐT', 'Email', 'Nhu cầu', 'Nội dung']);
  }

  sheet.appendRow([
    new Date(),
    data.name || '',
    data.phone || '',
    data.email || '',
    data.need || '',
    data.message || ''
  ]);

  return ContentService
    .createTextOutput(JSON.stringify({ success: true }))
    .setMimeType(ContentService.MimeType.JSON);
}

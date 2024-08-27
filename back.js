function doGet(e) {
  const barcode = e.parameter.barcode;
  const sheet = SpreadsheetApp.openById("1N5MB-ijLvfXFxQvCIVueZqhL4khp73B6muAn-Hf7QRI").getSheetByName("Questions");
  const data = sheet.getDataRange().getValues();

  let result = {};

  for (let i = 1; i < data.length; i++) {
    if (data[i][0] == barcode) {
      result = {
        question: data[i][1],
        correctAnswer: data[i][2],
      };
      break;
    }
  }

  const output = ContentService.createTextOutput(JSON.stringify(result));
  output.setMimeType(ContentService.MimeType.JSON);
  return output;
}

codeReader.decodeFromVideoDevice(null, "video", (result, err) => {
  if (result) {
    console.log("Barcode scanned:", result.text);
    selectedBarcode = result.text;
    video.classList.add("hidden");
    resultElement.innerText = `Barcode scanned: ${selectedBarcode}`;
    fetchQuestion(selectedBarcode);
  } else if (err) {
    console.error("Scan error:", err);
  }
});

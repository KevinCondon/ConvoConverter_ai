// Require library
var excel = require('excel4node');




exports.FillExcel= function(data, path, FILE_NAME){

  // Create a new instance of a Workbook class
  var workbook = new excel.Workbook();

  // Add Worksheets to the workbook
  var worksheet = workbook.addWorksheet(FILE_NAME);

  // Create a reusable style
  var style = workbook.createStyle({
    font: {
      size: 12
    },
  });
  var header = workbook.createStyle({
    font: {
      size: 15
    },
  });

var x = 2;
for(let y = 1; y < data.length; y++){

    switch(data[y]){
    case 'Main' : worksheet.cell(y, x).string(data[y]).style(header); 
        break;
    case String(data[y].match(/Main.+/)) : worksheet.cell(y, x - 1).string(data[y]).style(header); 
        break; 
    case String(data[y].match(/Branch.+/)) : worksheet.cell(y, x - 1).string(data[y]).style(header); 
        break;        
    case 'Customer Text:' : 
        worksheet.cell(y,x).string(data[y]).style(header);
        worksheet.cell(y, x + 1).string(data[++y]).style(style)
         break;
    case 'Options' : 
        worksheet.cell(y, x).string(data[y]).style(header);
         break;    
    default: worksheet.cell(y,x +1).string(data[y]).style(style);
     break;
           
}};
  workbook.write(path + FILE_NAME + '.xlsx', function (err, stats) {
    if (err) {
      console.error(err);
    } else {
      console.log('Success, Excel File: ' + FILE_NAME + '.xlsx');
      //console.log(stats);    // Prints out an instance of a node.js fs.Stats object

    }
  });
}
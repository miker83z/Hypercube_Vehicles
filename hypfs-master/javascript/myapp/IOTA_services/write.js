var Excel = require('exceljs')

const path = "C:/Users/Amministratore/Desktop/IOTA_DHT/hypfs-master/javascript/myapp/test_files/latency_iota_insert.xlsx"

var workbook = new Excel.Workbook();
workbook.xlsx.readFile(path)
var date = new Date();
var n = date.toDateString();
var time = date.toLocaleTimeString();


function writeFile(num_req, latency, sheet) {

    var worksheet = workbook.getWorksheet(sheet)
    var row = [num_req, latency, n+','+time];
    worksheet.addRow(row)
    workbook.xlsx.writeFile(path)

};


/*function writeFile(num_req, latency, sheet) {

    const d = new Date();

    try {

        workbook.xlsx.readFile(path)

            .then(async function () {

                var worksheet = workbook.getWorksheet(sheet)

                var row = [num_req, latency, d.getDate()];

                worksheet.addRow(row)

                //await newworksheet.addRow({id: 3, name: 'New Guy', dob: new Date(2000, 1, 1)});

                return  workbook.xlsx.writeFile(path)

            })

    } catch (err) {
        console.log(err);
    }


};*/





module.exports = { writeFile }
//writeFile()


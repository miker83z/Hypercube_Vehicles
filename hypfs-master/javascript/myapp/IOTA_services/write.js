const Excel = require('exceljs')
const config = require('../config.js')

const path = "C:/Users/Amministratore/Desktop/IOTA_DHT/hypfs-master/javascript/myapp/test_files/latency_iota.xlsx"

var workbook = new Excel.Workbook();
workbook.xlsx.readFile(path)
var date = new Date();
var n = date.toDateString();
var time = date.toLocaleTimeString();


function writeFile(num_req, latency, sheet) {

    var worksheet = workbook.getWorksheet(sheet)
    var row = [num_req, latency, n+','+time];
    worksheet.addRow(row)

   // worksheet.getRow(config.dht.HIPERCUBE_SIZE).va
   //worksheet.getCell("config.dht.HIPERCUBE_SIZE").value("PROVA CELLA")



    workbook.xlsx.writeFile(path)

};

function prova(){
    var worksheet = workbook.getWorksheet(4)
    var row = ["ccc", "ggg"]
    worksheet.addRow(row)
    //worksheet.getColumn(8).value("ok")
   // worksheet.getCell(config.dht.HIPERCUBE_SIZE).value("PROVA CELLA")
    workbook.xlsx.writeFile(path)
    
}


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


/*
const Excel = require('exceljs')
const config = require('../config.js')

//const path = "C:/Users/Amministratore/Desktop/IOTA_DHT/hypfs-master/javascript/myapp/test_files/latency_iota.xlsx"

var workbook = new Excel.Workbook();
workbook.xlsx.readFile(path)
var date = new Date();
var n = date.toDateString();
var time = date.toLocaleTimeString();


function writeFile(num_req, latency, sheet) {

    var worksheet = workbook.getWorksheet(sheet)
    var row = [num_req, latency, n + ',' + time];
    worksheet.addRow(row)

    // worksheet.getRow(config.dht.HIPERCUBE_SIZE).va
    //worksheet.getCell("config.dht.HIPERCUBE_SIZE").value("PROVA CELLA")

    workbook.xlsx.writeFile(path)

};

*/
/*
async function write_latency(latency, num_req, operation) {

    await workbook.xlsx.readFile(path); ///TODO: PROVARE EVENTUALMENTE CON LOAD

        

            switch (operation) {
                case "superset":
                    var worksheet = workbook.getWorksheet("latency_superset_dht")
                    worksheet.getCell(config.dht.HIPERCUBE_SIZE, 2).value = latency
                    worksheet.getCell(config.dht.HIPERCUBE_SIZE, 3).value = num_req
                    break;

                case "insert":
                    var worksheet = workbook.getWorksheet("latency_insert_dht")
                    worksheet.getCell(config.dht.HIPERCUBE_SIZE, 2).value = latency
                    worksheet.getCell(config.dht.HIPERCUBE_SIZE, 3).value = num_req
                    break;

                case "insert_test_iota":
                    var worksheet = workbook.getWorksheet("insert_test_iota")
                    worksheet.getCell(2, 1).value = latency
                    worksheet.getCell(2, 2).value = num_req


            }

            return await workbook.xlsx.writeFile(path)


   
}


*/

/*
function write_latency(latency, num_req, operation) {

    workbook.xlsx.readFile(path)
        .then(() => {

            switch (operation) {
                case "superset":
                    var worksheet = workbook.getWorksheet("latency_superset_dht")
                    worksheet.getCell(config.dht.HIPERCUBE_SIZE, 2).value = latency
                    worksheet.getCell(config.dht.HIPERCUBE_SIZE, 3).value = num_req
                    break;

                case "insert":
                    var worksheet = workbook.getWorksheet("latency_insert_dht")
                    worksheet.getCell(config.dht.HIPERCUBE_SIZE, 2).value = latency
                    worksheet.getCell(config.dht.HIPERCUBE_SIZE, 3).value = num_req
                    break;

                case "insert_test_iota":
                    var worksheet = workbook.getWorksheet("insert_test_iota")
                    worksheet.getCell(2, 1).value = latency
                    worksheet.getCell(2, 2).value = num_req


            }


            return workbook.xlsx.writeFile(path)


        }).then(() => {
            console.log('File is written');
        }).catch(err => console.error(err));
}


*/

/*

function writeFile(num_req, latency, sheet) {

    const d = new Date();


    workbook.xlsx.readFile(path)

        .then(async function () {

            var worksheet = workbook.getWorksheet(sheet)

            var row = [num_req, latency, d.getDate()];

            worksheet.addRow(row)

            //await newworksheet.addRow({id: 3, name: 'New Guy', dob: new Date(2000, 1, 1)});

            return workbook.xlsx.writeFile(path)

        })

};

*/


//module.exports = { writeFile, write_latency }
//writeFile()



const path = "C:/Users/Amministratore/Desktop/IOTA_DHT/hypfs-master/javascript/myapp/IOTA_services/export.xlsx"

var workbook = new Excel.Workbook();
async function writeFile() {
   
    workbook.xlsx.readFile(path)
        .then(function () {

            var worksheet = workbook.getWorksheet("sheet1")

            var rows = [4, 'vvvvvv', new Date(2000, 1, 1)];

            worksheet.addRow(rows)

            //await newworksheet.addRow({id: 3, name: 'New Guy', dob: new Date(2000, 1, 1)});

            return workbook.xlsx.writeFile(path)

        })
    console.log("File is written");


};


writeFile()


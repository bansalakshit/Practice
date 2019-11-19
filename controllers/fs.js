const csv = require('csv-parser');
const fs = require('fs');

const readFile = {}

readFile.read = (req, res) => {
    fs.createReadStream('../abc.csv')
        .pipe(csv())
        .on('data', (row) => {
            console.log(row);
        })
        .on('end', () => {
            console.log('CSV file successfully processed');
        });
}
module.exports = readFile


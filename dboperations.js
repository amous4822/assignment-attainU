
var config = require('./dbconfig');
const sql = require('mssql');


async function addData(data) {

    try {
        let pool = await sql.connect(config);
        let insertData = await pool.request()
            .input('Message', sql.NVarChar, data)
            .execute('InsertData');
        return insertData.recordsets;
    }
    catch (err) {
        console.log(err);
    }

}

module.exports = {
    addData : addData
}
const Log4js = require('log4js');
const log4js_config = require('../log4js.json');
Log4js.configure(log4js_config);
const Sqlite = require('sqlite3')
const common = require('../lib/common')
let concurrentSize = 10;

function processOneStock() {
    let gatherer = common.gatherer();
    let allStock = gatherer.getAllStocks();
    let stockIndex = 0
    for (let i = 0; i < concurrentSize; i++) {

    }
}

#!/usr/bin/node

var fileName = __filename.match(/[^\\\/]*$/);
var argv = process.argv;
var printHelp = function () {
    console.log("" +
        "Usage: node " + fileName + " stock_type days\n" +
        "stock_type: enum('sh', 'sz', 'us', 'hk', '_f')\n" +
        "days: (10 default)\n"
    );
}
if (argv.length <= 2) {
    printHelp();
    return;
}
var stockType = argv[2];
if (['sh', 'sz', 'us', 'hk', '_f'].indexOf(stockType) == -1) {
    printHelp();
    return;
}
var days = +argv[3] || 10;


var Stock = require('./lib/common');
var poolSize = 10;
var gatherer = Stock.gatherer();
var log = Stock.logger("main")
gatherer.getAllStocks(stockType).then(function (stocks) {
        log.info("All stocks are： " + JSON.stringify(stocks))
        var codes = stocks.map(s => s.code)
        if (stockType == "sh") {
            codes.push("000001")
        }
        else if (stockType == "sz") {
            codes.push("399001")
            codes.push("399006")
        }
        var pool = Stock.pool(stockType, codes, days, poolSize);
        pool.start();
    },
    function (erroInfo) {
        console.log(erroInfo)
    });

process.on('uncaughtException', function (error) {
    console.log(error);
});


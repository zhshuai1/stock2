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
var poolSize = 20;
var gatherer = Stock.gatherer();
var log = Stock.logger("main")
gatherer.getAllStocks(stockType).then(function (stocks) {
        log.info("All stocks are： " + JSON.stringify(stocks))
        var pool = Stock.pool(stockType, stocks.map(s => s.code), days, poolSize);
        pool.start();
        console.log(stocks.length);
        console.log(stocks[0].code);
    },
    function (erroInfo) {
        console.log(erroInfo)
    });

process.on('uncaughtException', function (error) {
    console.log(error);
});


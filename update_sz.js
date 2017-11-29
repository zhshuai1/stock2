var Stock = require('./lib/common');
var stocks = Stock.fileReader().getStocks('./stocks/sz.stock');

var poolSize = 20;
var days = 10;
var pool = Stock.pool('sz', stocks, days, poolSize);
pool.start();
process.on('uncaughtException', function (error) {
    console.log(error);
});

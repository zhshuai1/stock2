var Stock = require('./lib/common');
var sz = require('./stocks/sz');

var poolSize = 20;
var days = 10;
var pool = Stock.pool('sz', sz.stocks, days, poolSize);
pool.start();
process.on('uncaughtException', function (error) {
    console.log(error);
});

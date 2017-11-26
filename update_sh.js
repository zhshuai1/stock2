var Stock = require('./lib/common');
var sh = require('./stocks/sh');

var poolSize = 20;
var days = 10;
var pool = Stock.pool('sh', sh.stocks, days, poolSize);
pool.start();
process.on('uncaughtException', function (error) {
    console.log(error);
});

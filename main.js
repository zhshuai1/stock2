var Stock = require('./lib/common');
var sh = require('./stocks/sh');

var poolSize = 20;
var days = 10000;
var pool = Stock.pool('sh', sh.stocks, days, poolSize);
pool.start();

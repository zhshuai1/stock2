var Fs = require('fs');
var Stock = require('./lib/common');
var stocks = Fs.readFileSync('./stocks/us.stock', 'utf-8').split(/\r?\n/);
var poolSize = 20;
var days = 10;
var pool = Stock.pool('us', stocks, days, poolSize);
pool.start();
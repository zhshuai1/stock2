var Log4js = require('log4js');
var log4js_config = require('../log4js.json');
Log4js.configure(log4js_config);
var Mysql = require('mysql');
var Http = require("http");
var logger = function (name) {
    var logger = Log4js.getLogger(name);
    return logger;
}
var persister = function () {
    var log = logger("persister");
    var connection = Mysql.createConnection({
        host: 'g.sep.com',
        user: 'zhangsh',
        password: '000000',
        database: 'stock'
    });
    connection.connect();
    var replace = function (entry) {
        var handler = function (resolve, reject) {
            connection.query('REPLACE INTO stock VALUES(?,?,?,?,?,?,?,?,?);',
                [entry.type + entry.code,
                    entry.type,
                    entry.date,
                    entry.open,
                    entry.close,
                    entry.high,
                    entry.low,
                    entry.delta,
                    entry.volume],
                function (error, results, fields) {
                    if (error) {
                        reject([entry.code, entry.date, error]);
                        log.error("Failed to persist entry for", entry.code, "on", entry.date, error);
                        return;
                    }
                    resolve([entry.code, entry.date]);
                });
        }
        return new Promise(handler);
    }
    var end = function () {
        connection.end();
    };
    return {
        replace: replace,
        end: end,
    };
}
var decodeData = function (t) {
    var e,
        n,
        r,
        i,
        a,
        o,
        s,
        l = 86400000,
        u = 7657,
        c = [],
        d = [],
        h = ~(3 << 30),
        f = 1 << 30,
        p = [
            0,
            3,
            5,
            6,
            9,
            10,
            12,
            15,
            17,
            18,
            20,
            23,
            24,
            27,
            29,
            30
        ],
        m = Math,
        g = function () {
            var l,
                u;
            for (l = 0; 64 > l; l++) d[l] = m.pow(2, l),
            26 > l && (c[l] = v(l + 65), c[l + 26] = v(l + 97), 10 > l && (c[l + 52] = v(l + 48)));
            for (c.push('+', '/'), c = c.join(''), n = t.split(''), r = n.length, l = 0; r > l; l++) n[l] = c.indexOf(n[l]);
            return i = {},
                e = o = 0,
                a = {},
                u = w([12,
                    6]),
                s = 63 ^ u[1],
            {
                _1479: C,
                _136: A,
                _200: T,
                _139: _,
                _197: S
            }
                [
            '_' + u[0]
                ] || function () {
                return []
            }
        },
        v = String.fromCharCode,
        b = function (t) {
            return t === {}._
        },
        y = function () {
            var t,
                e;
            for (t = N(), e = 1; ;) {
                if (!N()) return e * (2 * t - 1);
                e++
            }
        },
        N = function () {
            var t;
            return e >= r ? 0 : (t = n[e] & 1 << o, o++, o >= 6 && (o -= 6, e++), !!t)
        },
        w = function (t, i, a) {
            var s,
                l,
                u,
                c,
                h;
            for (l = [], u = 0, i || (i = []), a || (a = []), s = 0; s < t.length; s++) if (c = t[s], u = 0, c) {
                if (e >= r) return l;
                if (t[s] <= 0) u = 0;
                else if (t[s] <= 30) {
                    for (; h = 6 - o, h = c > h ? h : c, u |= (n[e] >> o & (1 << h) - 1) << t[s] - c, o += h, o >= 6 && (o -= 6, e++), c -= h, !(0 >= c););
                    i[s] && u >= d[t[s] - 1] && (u -= d[t[s]])
                } else u = w([30,
                    t[s] - 30], [
                    0,
                    i[s]
                ]),
                a[s] || (u = u[0] + u[1] * d[30]);
                l[s] = u
            } else l[s] = 0;
            return l
        },
        x = function (t) {
            var e,
                n,
                r,
                a;
            for (t > 1 && (e = 0), e = 0; t > e; e++) i.d++,
                r = i.d % 7,
            (3 == r || 4 == r) && (i.d += 5 - r);
            return n = new Date,
                a = 60 * n.getTimezoneOffset() * 1000,
                n.setTime((u + i.d) * l + a),
                n.setHours(n.getHours() + 8),
                n
        },
        T = function () {
            var t,
                n,
                a,
                o,
                l;
            if (s >= 1) return [];
            for (i.d = w([18], [
                    1
                ]) [0] - 1, a = w([3,
                3,
                30,
                6]), i.p = a[0], i.ld = a[1], i.cd = a[2], i.c = a[3], i.m = m.pow(10, i.p), i.pc = i.cd / i.m, n = [], t = 0; o = {
                d: 1
            }, N() && (a = w([3]) [0], 0 == a ? o.d = w([6]) [0] : 1 == a ? (i.d = w([18]) [0], o.d = 0) : o.d = a), l = {
                date: x(o.d)
            }, N() && (i.ld += y()), a = w([3 * i.ld], [
                1
            ]), i.cd += a[0], l.close = i.cd / i.m, n.push(l), !(e >= r) && (e != r - 1 || 63 & (i.c ^ t + 1)); t++);
            return n[0].prevclose = i.pc,
                n
        },
        A = function () {
            var t,
                n,
                a,
                o,
                l,
                u,
                c,
                d,
                h,
                f,
                p;
            if (s >= 2) return [];
            for (c = [], h = {
                v: 'volume',
                p: 'price',
                a: 'avg_price'
            }, i.d = w([18], [
                    1
                ]) [0] - 1, d = {
                date: x(1)
            }, a = w(1 > s ? [
                3,
                3,
                4,
                1,
                1,
                1,
                5
            ] : [
                4,
                4,
                4,
                1,
                1,
                1,
                3
            ]), t = 0; 7 > t; t++) i[['la',
                'lp',
                'lv',
                'tv',
                'rv',
                'zv',
                'pp'][t]] = a[t];
            for (i.m = m.pow(10, i.pp), s >= 1 ? (a = w([3,
                3]), i.c = a[0], a = a[1]) : (a = 5, i.c = 2), i.pc = w([6 * a]) [0], d.pc = i.pc / i.m, i.cp = i.pc, i.da = 0, i.sa = i.sv = 0, t = 0; !(e >= r) && (e != r - 1 || 7 & (i.c ^ t)); t++) {
                for (l = {}, o = {}, f = i.tv ? N() : 1, n = 0; 3 > n; n++) if (p = [
                        'v',
                        'p',
                        'a'
                    ][n], (f ? N() : 0) && (a = y(), i['l' + p] += a), u = 'v' == p && i.rv ? N() : 1, a = w([3 * i['l' + p] + ('v' == p ? 7 * u : 0)], [
                            !!n
                        ]) [0] * (u ? 1 : 100), o[p] = a, 'v' == p) {
                    if (!(l[h[p]] = a) && 241 > t && (i.zv ? !N() : 1)) {
                        o.p = 0;
                        break
                    }
                } else 'a' == p && (i.da = (1 > s ? 0 : i.da) + o.a);
                i.sv += o.v,
                    l[h.p] = (i.cp += o.p) / i.m,
                    i.sa += o.v * i.cp,
                    l[h.a] = b(o.a) ? t ? c[t - 1][h.a] : l[h.p] : i.sv ? ((m.floor((i.sa * (2000 / i.m) + i.sv) / i.sv) >> 1) + i.da) / 1000 : l[h.p] + i.da / 1000,
                    c.push(l)
            }
            return c[0].date = d.date,
                c[0].prevclose = d.pc,
                c
        },
        C = function () {
            var t,
                e,
                n,
                r,
                a,
                o,
                l;
            if (s >= 1) return [];
            for (i.lv = 0, i.ld = 0, i.cd = 0, i.cv = [
                0,
                0
            ], i.p = w([6]) [0], i.d = w([18], [
                    1
                ]) [0] - 1, i.m = m.pow(10, i.p), a = w([3,
                3]), i.md = a[0], i.mv = a[1], t = []; a = w([6]), a.length;) {
                if (n = {
                        c: a[0]
                    }, r = {}, n.d = 1, 32 & n.c) for (; ;) {
                    if (a = w([6]) [0], 63 == (16 | a)) {
                        l = 16 & a ? 'x' : 'u',
                            a = w([3,
                                3]),
                            n[l + '_d'] = a[0] + i.md,
                            n[l + '_v'] = a[1] + i.mv;
                        break
                    }
                    if (32 & a) {
                        o = 8 & a ? 'd' : 'v',
                            l = 16 & a ? 'x' : 'u',
                            n[l + '_' + o] = (7 & a) + i['m' + o];
                        break
                    }
                    if (o = 15 & a, 0 == o ? n.d = w([6]) [0] : 1 == o ? (i.d = o = w([18]) [0], n.d = 0) : n.d = o, !(16 & a)) break
                }
                r.date = x(n.d);
                for (o in {
                    v: 0,
                    d: 0
                }) b(n['x_' + o]) || (i['l' + o] = n['x_' + o]),
                b(n['u_' + o]) && (n['u_' + o] = i['l' + o]);
                for (n.l_l = [
                    n.u_d,
                    n.u_d,
                    n.u_d,
                    n.u_d,
                    n.u_v
                ], l = p[15 & n.c], 1 & n.u_v && (l = 31 - l), 16 & n.c && (n.l_l[4] += 2), e = 0; 5 > e; e++) l & 1 << 4 - e && n.l_l[e]++,
                    n.l_l[e] *= 3;
                n.d_v = w(n.l_l, [
                    1,
                    0,
                    0,
                    1,
                    1
                ], [
                    0,
                    0,
                    0,
                    0,
                    1
                ]),
                    o = i.cd + n.d_v[0],
                    r.open = o / i.m,
                    r.high = (o + n.d_v[1]) / i.m,
                    r.low = (o - n.d_v[2]) / i.m,
                    r.close = (o + n.d_v[3]) / i.m,
                    a = n.d_v[4],
                'number' == typeof a && (a = [
                    a,
                    a >= 0 ? 0 : -1
                ]),
                    i.cd = o + n.d_v[3],
                    l = i.cv[0] + a[0],
                    i.cv = [
                        l & h,
                        i.cv[1] + a[1] + !!((i.cv[0] & h) + (a[0] & h) & f)
                    ],
                    r.volume = (i.cv[0] & f - 1) + i.cv[1] * f,
                    t.push(r)
            }
            return t
        },
        _ = function () {
            var t,
                e,
                n,
                r;
            if (s > 1) return [];
            for (i.l = 0, r = -1, i.d = w([18]) [0] - 1, n = w([18]) [0]; i.d < n;) e = x(1),
                0 >= r ? (N() && (i.l += y()), r = w([3 * i.l], [
                        0
                    ]) [0] + 1, t || (t = [
                    e
                ], r--)) : t.push(e),
                r--;
            return t
        },
        S = function () {
            var t,
                n,
                a,
                o;
            if (s >= 1) return [];
            for (i.f = w([6]) [0], i.c = w([6]) [0], a = [], i.dv = [], i.dl = [], t = 0; t < i.f; t++) i.dv[t] = 0,
                i.dl[t] = 0;
            for (t = 0; !(e >= r) && (e != r - 1 || 7 & (i.c ^ t)); t++) {
                for (o = [], n = 0; n < i.f; n++) N() && (i.dl[n] += y()),
                    i.dv[n] += w([3 * i.dl[n]], [
                        1
                    ]) [0],
                    o[n] = i.dv[n];
                a.push(o)
            }
            return a
        };
    return g()()
}
var gatherer = function () {
    var log = logger("gatherer");
    /** us: http://finance.sina.com.cn/us_stock/company/hisdata/klc_kl_BABA.js
     *  hk: http://finance.sina.com.cn/stock/hkstock/00700/klc_kl.js
     *  sh: http://finance.sina.com.cn/realstock/company/sh000001/hisdata/klc_kl.js
     *  sz: http://finance.sina.com.cn/realstock/company/sz000001/hisdata/klc_kl.js
     *  _f: http://stock.finance.sina.com.cn/fundInfo/api/openapi.php/CaihuiFundInfoService.getNav?symbol=002851&datefrom=2017-09-01&dateto=2017-11-10&page=1
     */
    var composeOptions = function (type, code) {
        var path;
        var host = 'finance.sina.com.cn';
        switch (type) {
            case 'sh':
            case 'sz':
                path = '/realstock/company/' + type + code + '/hisdata/klc_kl.js';
                break;
            case 'us':
                path = '/us_stock/company/hisdata/klc_kl_' + code + '.js'
                break;
            case 'hk':
                path = '/stock/hkstock/' + code + '/klc_kl.js';
                break;
            case '_f':
                path = '';
                host = '';
                break;
            default:
                break;

        }
        return {
            host: host,
            port: 80,
            path: path,
            method: 'GET'
        };
    }
    var gatherer = {
        getHistories: function (type, code) {
            var options = composeOptions(type, code);
            var p = function (resolve, reject) {
                Http.request(options, function (res) {
                    var data = '';
                    res.on('data', function (chunk) {
                        data += chunk;
                        log.info("One piece of data received for " + code);
                    }).on('end', function () {
                        log.info("Gather data for " + code + " successfully.");
                        var matched = /="([0-9a-zA-Z\+\/]+)"/.exec(data);
                        if (matched == null) {
                            log.warn("The returned data is " + data + ", but not matched");
                            reject("Failed to match the required data for " + code);
                            return;
                        }
                        try {
                            var histories = decodeData(matched[1]);
                            resolve(histories);
                        } catch (err) {
                            log.warn("Failed to decode the response data for " + type + code);
                            reject("Failed to decode the response data for " + type + code + err);
                        }
                    });
                })
                    .on('error', function (e) {
                        log.error("Failed to get and decodeData for stock: ", code, e);
                        reject("Error occurs when retrieving data from sina for " + code + e);
                    })
                    .setTimeout(30000, function () {
                        this.abort();
                        log.error("Timeout when retrieving data for " + code);
                    })
                    .end();
            }
            return new Promise(p);
        }
    };
    return gatherer;
}
/**
 * @param tasks [] of task id
 * @param pipelines [] of handlers
 * @param config config for pool
 * @returns {{start: *, submit: *, release: *}}
 */
var pool = function (type, stocks, days, poolSize) {
    var log = logger("pool");
    var fails = {};
    var total = stocks.length;
    var index = 0;
    var threads = [];
    var start = function () {
        for (var i = 0; i < poolSize; ++i) {
            threads[i] = {
                id: i,
                submit: submitOne,
            };
            threads[i].submit();
        }
    };
    var submitOne = function () {
        var id = this.id;
        if (stocks.length < 20) log.info("The remaining stocks are: " + stocks);
        var stock = stocks.shift();
        if (!stock) return;
        log.info("[Thread Number:+" + id + "] The next stock to process is: " + stock);

        var success = function (response) {
            ++index;
            log.info("Successfully processed " + response[0] + ": " + index + "/" + total + " stocks.");
            threads[id].submit();
        };
        var fail = function (errInfo) {
            log.error("Failed to process the stock", errInfo);
            fails[stock] = (fails[stock] || 0) + 1;
            log.info("failed stocks include: " + JSON.stringify(fails));
            if (fails[stock] >= 5) {
                log.error("The stock has failed for more than 5 times: " + type + stock);
            } else {
                stocks.push(stock);
            }
            threads[id].submit();
        };
        processOneStock(type, stock, days).then(success, fail);
    };

    return {start: start};
}

var prepareData = function (data, number, type, code) {
    var size = data.length;
    var start = size <= number ? 1 : size - number;
    var result = []
    for (var i = start; i < size; ++i) {
        data[i].type = type;
        data[i].code = code;
        data[i].delta = (data[i].close - data[i - 1].close) / data[i - 1].close;
        if (data[i - 1].close == 0) data[i].delta = 0;
        result.push(data[i]);
    }
    return result;
}

var processOneStock = function (type, code, days) {
    var log = logger('processOneStock');
    var promise = function (resolve, reject) {
        var g = gatherer();
        g.getHistories(type, code).then(function (histories) {
            var fullCode = type + code;
            if (histories.length == 0) {
                log.info("The history is empty, no need to persist: " + fullCode);
                resolve([fullCode]);
                return;
            }
            var data = prepareData(histories, days, type, code);
            var p = persister();
            var promises = data.map(d => p.replace(d));
            Promise.all(promises).then(function () {
                resolve([fullCode]);
                log.info("Successfully persist for all data for stock " + fullCode);
            }, function () {
                reject([fullCode]);
                log.info("Failed persist for stock " + fullCode);
            });
            p.end();
        }, function (error) {
            log.error(error);
            reject([code]);
        });
    }
    return new Promise(promise);
}
var Fs = require('fs');
var fileReader = function () {
    return {
        getStocks: function (name) {
            var data = Fs.readFileSync(name, 'utf-8');
            return data.split(/\r?\n/).map(s => s.trim());
        }
    }
}

module.exports = {
    pool: pool,
    logger: logger,
    fileReader: fileReader,
};

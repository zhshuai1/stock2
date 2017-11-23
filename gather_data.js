function getLogger(name) {
    // log4js related dependencies
    var Log4js = require('log4js');
    Log4js.configure("./log4js.json");
    //var matched=/^function\s*([0-9a-zA-Z_$~]*)[\s\(]/.exec(f.toString());
    //var name=matched==null?"Not A function":matched[1];
    var logger = Log4js.getLogger(name);
    return logger;
}

function gatherData(code) {
    // http related dependencies
    var Http = require("http"),
        Url = require("url");

    function decodeData(t) {
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

    function getPersister() {
        var mysql = require('mysql');
        var logger = getLogger("getPersister");
        var connection = mysql.createConnection({
            host: '192.168.31.185',
            user: 'zhangsh',
            password: '000000',
            database: 'stock'
        });
        connection.connect();

        var insert = function (entry) {
            logger.info(entry);
            connection.query('INSERT INTO Stocks (code,open,close,high,low,year,month,day,date,delta,volume) values (?,?,?,?,?,?,?,?,?,?,?)', entry,
                function (err, results, fields) {
                    if (err) {
                        throw err;
                    }
                    logger.info("The insert result is: ", results);
                });
        }
        return function (code, entry) {
            var date = entry.date;
            var params = [code,
                entry.open,
                entry.close,
                entry.high,
                entry.low,
                date.getYear(),
                date.getMonth(),
                date.getDate(),
                date,
                entry.delta,
                entry.volume
            ];
            connection.query("SELECT * FROM Stocks where code=? and year=? and month=? and day=?;", [code, date.getYear(), date.getMonth(), date.getDate()],
                function (err, results, fields) {
                    if (err) {
                        throw err;
                    }
                    if (results) {
                        logger.info(results);
                        if (results.length == 0) {
                            logger.info("Add a record for this stock: ", params);
                            insert(params);
                        } else if (results.length == 1) {
                            logger.info("The record has alread exist in the db.");
                        } else {
                            logger.error("Duplicated records in the system.");
                        }
                    }
                });

        }
        connection.end();
    }

    function persistHistories() {

    }

    var logger = getLogger("gatherData");
    var options = {
        host: "finance.sina.com.cn",
        port: 80,
        path: "/realstock/company/sh.js" + code + "/hisdata/klc_kl.js",
        method: "GET"
    };

    var req = Http.request(options, function (res) {
        var data = '';
        res.on('data', function (chunk) {
            data += chunk;
        }).on('end', function () {
            var matched = /="([0-9a-zA-Z\+\/]+)"/.exec(data);
            if (matched == null) {
                logger.info("The returned data is " + data + ", but not matched");
                return null;
            }
            var histories = decodeData(matched[1]);
            logger.info("The decoded result is: ", histories);
            if (histories == null) return null;
            var persister = getPersister();
            histories.forEach(function (h) {
                persister(code, h);
            });
        });
    }).on('error', function (e) {
        settings.error(e);
    });
    req.end();
}

function getPersister() {
    var mysql = require('mysql');

    //创建连接  
    var connection = mysql.createConnection({
        host: '192.168.31.185',
        user: 'zhangsh',
        password: '000000',
        database: 'stock'
    });
    connection.connect();
    return function (entry) {
        connection.query('INSERT INTO Students (name,age,address,comment) values (?,?,?,?)', entry,
            function (err, results, fields) {
                if (err) {
                    throw err;
                }
                if (results) {
                    console.log(results);
                }
            });
    }
    connection.end();
}
//var dao=getPersister();
//dao(["wangwu",4,"daxujia",null]);
//dao({"name":"zhaoliu","age":5,"address":"laosengkou"});
gatherData("600030");

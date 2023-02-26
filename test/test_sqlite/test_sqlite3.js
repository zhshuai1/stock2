const sqlite = require('sqlite3')

let db = new sqlite.Database('test1.db')
db.exec('create table if not exists hello(id bigint, name varchar(30))', (err) => {
    console.log("err is: " + err)
})

async function insert() {
    let insert1 = new Promise((resolve, reject) => db.exec('insert into hello values(1,"Tom")',
        (err) => {
            if (!err) {
                resolve("success")
            } else {
                reject("failure")
            }
        }))
    await (() => insert1)()
    console.log("Tom Done")
    await db.exec('insert into hello values(2,"Lily")', (err) => console.log("Lily,err:" + err))
    console.log("Lily Done")
    await db.exec('insert into hello values(3,"Lucy")', (err) => console.log("Lucy,err:" + err))
    console.log("Lucy Done")
}

//insert()

(function insert2() {
    db.exec('create table if not exists hello2(id integer, name varchar(30), age int, primary key(name, age))', () => {
        db.exec('insert into hello2 (id, name) values(4,"aloha")', () => {
            db.run('insert into hello2 (id, name, age) values (?,?,?) on conflict(name, age) do nothing', 9, 'hola', 3, (result, err) => {
                console.log('insert done....')
                console.log(result)
                console.log(err)
            })
            db.exec('insert into hello2 (id, name,age)values(5,"hi", 9) on conflict (name,age) do nothing')
        });
    })

})()
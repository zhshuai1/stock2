function test_promise() {
    function print1(resolve, reject) {
        console.log(1)
        resolve("print1")
    }

    function print2(resolve, reject) {
        console.log(2)
        console.log(resolve)
        //resolve('hello')
    }

    function print3() {
        console.log(3)
    }

    function print4() {
        console.log(4)
    }

    // var promise = new Promise(print1)
    // promise.then(print2).then(print3).catch((e) => {
    //     console.log("err:\n" + e)
    // });
    var promise2 = Promise.all([new Promise(print1), Promise.reject(4)])
    promise2.then(print3, print4)
}

//test_promise()
function test_async_function() {
    function print1(resolve, reject) {
        console.log("print1...")
        resolve("print1")
    }

    function print2(res) {
        console.log("print2...")
        console.log(res)
        return res + ":print2"
    }

    function print3(res) {
        console.log("print3...")
        console.log(res)
        return res + ":print3"
    }

    function print4(res) {
        console.log("print4...")
        console.log(res)
        return res + ":print4"
    }

    async function do_something() {
        let promise = new Promise(print1).then(print2).then(print3);
        let res1 = (() => promise)();
        console.log("here in console:" + res1);
        let res2 = await print4(res1)
        console.log("here in console2:" + res2)
    }

    do_something()
}

//test_async_function()
function test_resolved_promise() {
    function gen_print(value) {
        return (res) => {
            console.log("print" + value);
            console.log("res: " + res);
            return res + ":print" + value
        }
    }

    let promise = Promise.resolve("init").then(gen_print(1)).then(gen_print(2))
    promise.then(gen_print(11))
    promise.then(gen_print(12))
}

test_resolved_promise();
(function () {
    let Animal0 = {
        speak: function () {
            console.log(this.name)
        }
    }

    function Animal() {
    }

    Animal.prototype = Animal0
    let p = new Promise(() => {
    });
    let animal = new Animal();
    let animal2 = new Animal();

    animal2.name = "cat";
    animal2.speak();
    let animal3 = new Animal();
    animal.name = 'dog';
    animal.speak();

    animal3.speak();


})()

function SleepAndPrint(value) {
    // setTimeout((resolve) => {
    //     resolve(value)
    // }, 1000)
    return new Promise(function (resolve) {
        setTimeout(() => {
            resolve(value)
        }, 1000)
    })
}

SleepAndPrint("This is a delayed message....").then((value) => console.log(value));
let counter = 0;

function chain() {
    if (counter <= 100) {
        counter++;
        SleepAndPrint(counter).then((value) => {
            console.log(value)
        }).then(() => {
            chain()
        })
    }
}

for (let i = 0; i < 5; i++) {
    chain()
}
console.log("task started")


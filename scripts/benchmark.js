//-----------------------------------------------------
//
// Author: Daeren
// Site: 666.io
//
//-----------------------------------------------------

//-----------------------------------------------------

const XEE = require("./../index");
const EE3 = require("eventemitter3");
const EE = require("events");

//-----------------------------------------------------

testEE(EE);
console.log("^|events|------------------");
testEE(EE3);
console.log("^|eventemitter3|------------------");
testEE(XEE);
console.log("^|xee|------------------");

//-----------------------------------------------------

function testEE(p) {
    let l, t;

    class MyEmitter extends p {}

    const ee = new MyEmitter();

    //-----------------]>

    ee.on("data", function(data) {
        data + 1;
    });

    ee.on("data2", function(data) {
    });

    //-----------------]>

    l = 1000 * 1000 * 1;

    console.time("on() x 1");

    while(l--) {
        ee.emit("data");
    }

    console.timeEnd("on() x 1");

    //-----------------]>

    l = 1000 * 1000 * 1;

    console.time("on() x 1 + [data] x 1");

    while(l--) {
        ee.emit("data", 1);
    }

    console.timeEnd("on() x 1 + [data] x 1");

    //-----------------]>

    ee.on("data", function(data) {
        data + 1;
    });

    ee.on("data2", function(data) {
    });

    //-----------------]>

    l = 1000 * 1000 * 1;

    console.time("on() x 2");

    while(l--) {
        ee.emit("data");
    }

    console.timeEnd("on() x 2");

    //-----------------]>

    l = 1000 * 1000 * 1;

    console.time("on() x 2 + [data] x 1");

    while(l--) {
        ee.emit("data", 1);
    }

    console.timeEnd("on() x 2 + [data] x 1");
}

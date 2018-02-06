//-----------------------------------------------------
//
// Author: Daeren
// Site: 666.io
//
//-----------------------------------------------------

/*jshint expr: true*/
/*global describe, it*/

//-----------------------------------------------------

const chai     = require("chai");

const expect    = chai.expect;

const XEE = require("./../index");

//-----------------------------------------------------

describe("XEE", function() {

    this.timeout(1000 * 10);

    //-----------------]>

    it("Base", function() {
        const ee = new XEE();

        expect(ee.on).to.be.a("function");
        expect(ee.off).to.be.a("function");
    });

    //-----------------]>

    it("listenerCount", function() {
        const ee = new XEE();


        function fNope() {}
        function fNope2() {}


        ee.on("msg", fNope);
        ee.off("msg", fNope);

        expect(ee.listenerCount("msg")).to.be.a("number").and.equal(0);


        ee.on("msg", fNope);

        expect(ee.listenerCount("msg")).to.be.a("number").and.equal(1);


        ee.on("msg", fNope);

        expect(ee.listenerCount("msg")).to.be.a("number").and.equal(2);


        ee.on("msg", fNope2);

        expect(ee.listenerCount("msg")).to.be.a("number").and.equal(3);


        ee.off("msg", fNope);

        expect(ee.listenerCount("msg")).to.be.a("number").and.equal(2);


        ee.off("msg", fNope2);

        expect(ee.listenerCount("msg")).to.be.a("number").and.equal(1);


        ee.on("msg", fNope);
        ee.on("msg", fNope);
        ee.on("msg", fNope2);
        ee.on("msg", fNope2);

        ee.on("msgX", fNope);

        expect(ee.listenerCount("msg")).to.be.a("number").and.equal(5);
    });

    //-----------------]>

    it("on: x1", function(done) {
        const ee = new XEE();

        ee.on("msg", function() {
            done();
        });

        ee.emit("msg");
    });

    it("on: x2", function(done) {
        const ee = new XEE();

        let count = 0;

        ee.on("msg", function() {
            count++;
        });

        ee.on("msg", function() {
            expect(count).to.be.a("number").and.equal(1);
            done();
        });

        ee.emit("msg");
    });

    //-----------------]>

    it("on: x2 | data.arg.1", function(done) {
        const ee = new XEE();

        ee.on("msg", function(data) {
            expect(data).to.be.a("number").and.equal(136);
            done();
        });

        ee.emit("msg", 136);
    });

    it("on: x2 | data.arg.many", function(done) {
        const ee = new XEE();

        ee.on("msg", function() {
            for(let i = 0; i < arguments.length; i++) {
                expect(arguments[i]).to.be.a("number").and.equal(i + 1);
            }

            done();
        });

        ee.emit("msg", 1, 2, 3, 4, 5, 6);
    });

    //-----------------]>

    it("once", function(done) {
        const ee = new XEE();
        let t = 0;

        ee.on("on.msg", function() {
            for(let i = 0; i < arguments.length; i++) {
                expect(arguments[i]).to.be.a("number").and.equal(i + 1);
            }

            expect(t).to.be.a("number").and.equal(1);
        });

        ee.once("once.msg", function() {
            for(let i = 0; i < arguments.length; i++) {
                expect(arguments[i]).to.be.a("number").and.equal(i + 1);
            }

            t++;
        });

        ee.emit("once.msg", 1, 2, 3, 4, 5, 6);
        ee.emit("once.msg", 1, 2, 3, 4, 5, 6);
        ee.emit("on.msg", 1, 2, 3, 4, 5, 6);

        //------]>

        ee.once("x", nope);
        ee.once("x", nope);
        ee.once("x", nope);
        ee.once("x", nope);

        let countL = ee.listenerCount("x");

        expect(countL).to.be.a("number").and.equal(4);

        expect(ee.emit("x", 1)).to.be.a("boolean").and.equal(true);
        expect(ee.listenerCount("x")).to.be.a("number").and.equal(0);

        //------]>

        done();

        //------]>

        function nope(v) {
            countL--;
            expect(countL).to.be.a("number").and.equal(ee.listenerCount("x"));

            if(v !== 2) {
                expect(ee.emit("x", v + 1)).to.be.a("boolean").and.equal(true);
            }
            else {
                expect(v).to.be.a("number").and.equal(2);
            }
        }
    });

    //-----------------]>

    it("off", function(done) {
        const ee = new XEE();

        function fNope() {
            done("Nope");
        }

        ee.on("msg", fNope);
        ee.off("msg", fNope);
        ee.emit("msg");

        ee.on("msg", fNope);
        ee.off("msg");
        ee.emit("msg");

        ee.on("msg", fNope);
        ee.off();
        ee.emit("msg");

        ee.on("msg", function() {
            let j = 4;

            [1,2,3,4].forEach(function(e) {
                const name = "id." + e;

                ee.on(name, onTest);

                setTimeout(function() {
                    ee.emit(name);
                });

                //--------]>

                function onTest(data) {
                    ee.off(name, onTest);

                    j--;

                    if(!j) {
                        done();
                    }
                }
            });
        });
        ee.emit("msg");
    });

});

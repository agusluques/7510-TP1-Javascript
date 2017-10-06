var expect = require("chai").expect;
var should = require('should');
var assert = require('assert');

var Interpreter = require('../src/interpreter').Interpreter;
var Rule = require('../src/interpreter').Rule;


describe("Interpreter", function () {

    var db = [
        "varon(juan).",
        "varon(pepe).",
        "varon(hector).",
        "varon(roberto).",
        "varon(alejandro).",
        "mujer(maria).",
        "mujer(cecilia).",
        "padre(juan, pepe).",
        "padre(juan, pepa).",
        "padre(hector, maria).",
        "padre(roberto, alejandro).",
        "padre(roberto, cecilia).",
        "hijo(X, Y) :- varon(X), padre(Y, X).",
        "hija(X, Y) :- mujer(X), padre(Y, X)."
    ];

    var interpreter = null;

    before(function () {
        // runs before all tests in this block
    });

    after(function () {
        // runs after all tests in this block
    });

    beforeEach(function () {
        // runs before each test in this block
        interpreter = new Interpreter();
        interpreter.parseDB(db);
    });

    afterEach(function () {
        // runs after each test in this block
    });


    describe('Interpreter Facts', function () {

        it('varon(juan) should be true', function () {
            assert(interpreter.checkQuery('varon(juan)'));
        });

        it('varon(maria) should be false', function () {
            assert(interpreter.checkQuery('varon(maria)') === false);
        });

        it('mujer(cecilia) should be true', function () {
            assert(interpreter.checkQuery('mujer(cecilia)'));
        });

        it('padre(juan, pepe) should be true', function () {
            assert(interpreter.checkQuery('padre(juan, pepe)') === true);
        });

        it('padre(mario, pepe) should be false', function () {
            assert(interpreter.checkQuery('padre(mario, pepe)') === false);
        });

        // TODO: Add more tests

    });

    describe('Interpreter Rules', function () {

        it('hijo(pepe, juan) should be true', function () {
            assert(interpreter.checkQuery('hijo(pepe, juan)') === true);
        });
        it('hija(maria, roberto) should be false', function () {
            assert(interpreter.checkQuery('hija(maria, roberto)') === false);
        });
        it('hijo(pepe, juan) should be true', function () {
            assert(interpreter.checkQuery('hijo(pepe, juan)'));
        });

        // TODO: Add more tests

    });


});

describe("Parser", function () {

    var db = [
        "varon(juan).",
        "varon"
    ];

    var interpreter = null;

    beforeEach(function () {
        interpreter = new Interpreter();
    });

    it('test parserDb must throw Error with wrong db', function () {
        assert.throws(function() { interpreter.parseDB(db) }, Error);
    });





});

describe("Tests Unitarios", function () {

    var rule = null;

    beforeEach(function () {
        rule = new Rule("jugador", "X, Y, Z", "defensor(Y), volante(Z), delantero(Y, X)");
    });


    describe('Interpreter Rule', function () {

        it('test replaceArgs', function () {
            assert.equal(rule.replaceArgs("10, 20, 30"), "defensor(20), volante(30), delantero(20, 10)");
        });


    });


});




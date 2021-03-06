const express = require("express");
const expect = require("chai").expect;
const path = require("path");
const Nightmare = require("nightmare");

const app = express();

app.use(express.static(path.join(__dirname, "../../public")));
app.use(express.static(path.join(__dirname, "../../dist")));

const url = "http://localhost:8888";

const nightmare = new Nightmare();

describe("End to End Tests", () => {
    let httpServer = null;
    let pageObject = null;

    before((done) => {
    httpServer = app.listen(8888);
    done();
    });

    beforeEach(() => {
    pageObject = nightmare.goto(url);
    });

    after((done) => {
    httpServer.close();
    done();
    });

  // This is where your code is going to go:
    it("should contain a <h1> element for the page title", () => {
    return pageObject
        .evaluate(() => document.querySelector("h1").innerText)
        .then((headerText) => {
        expect(headerText).to.not.be.null;
        expect(headerText).to.equal("Mortgage Calculator");
        });
    });

    it("should contain a #output element for result", () => {
        return pageObject
            .evaluate(() => document.querySelector("#output"))
            .then( output => {
            expect(output).to.exist;
            expect(output).to.not.be.null;
            expect(typeof output).to.equal("object");
            });
    });
    
    it('should contain a button element with an id of "calculate"', () => {
        return pageObject
            .evaluate(() => document.querySelector("button[id=calculate]"))
            .then(button => expect(button).to.exist) 
            
    });

    it("should contain a input element with the name 'principal'", () => {
        return pageObject
            .evaluate(() => document.querySelector("input[name=principal]"))
            .then(input => expect(input).to.exist)
            
    });

    it("should contain a input element with the name 'interestRate'", () => {
        return pageObject
            .evaluate(() => document.querySelector("input[name=interestRate]"))
            .then(input => expect(input).to.exist)
                
    });
    
    it("should contain a input element with the name 'loanTerm'", () => {
        return pageObject
            .evaluate(() => document.querySelector("input[name=loanTerm]"))
            .then(input => expect(input).to.exist)
                
    });

    it("should contain a select element with the name 'period'", () => {
        return pageObject
            .evaluate(() => document.querySelector("select[name=period]"))
            .then(input => expect(input).to.exist)
                
    });

    it("should correctly calculate mortgage", () =>
    pageObject
        .wait()
        .type("input[name=principal]", 300000)
        .type("input[name=interestRate]", 3.75)
        .type("input[name=loanTerm]", 30)
        .select("select[name=period]", 12)
        .click("button#calculate")
        .wait("#output")
        .evaluate(() => document.querySelector("#output").innerText)
        .then((outputText) => {
        expect(outputText).to.equal("$1389.35");
        })).timeout(6500);
});

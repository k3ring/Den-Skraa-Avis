const { brugere, produkter } = require('../app/models')
let chai = require('chai');
let chaiHttp = require('chai-http');


chai.use(chaiHttp);
chai.should();

let expect = chai.expect;

let localhost = 'http://localhost:1337'

// Sov 
beforeEach( async () => {
    await new Promise(resolve => setTimeout(resolve, 1500));
    console.log("Sover 1,5 sekunder så databasen når at sættes op");
 });


describe('Test produkt API (localhost:1337/api/produkter/~)', () => {
    describe("Test GET request: /api/produkter/getprodukter", () => {
        it("Skal returnere alle varer i databasen", (done) => {
            chai.request("http://localhost:1337/")
                .get("/api/produkter/getprodukter")
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.length.should.not.be.eq(0);
                    res.body.should.be.a('array');
                    res.body[0].should.have.property('pris');
                done();
                });
        });
    })

    describe("Test GET request: /api/produkter/getprodukterall", () => {
        it("Skal returnere alle produkter inkl. kategori", (done) => {
            chai.request("http://localhost:1337/")
                .get("api/produkter/getprodukterall")
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.length.should.not.be.eq(0);
                    res.body.should.be.a('array');
                    res.body[0].should.have.property('kategoriId');
                done();
                });
                
        });

        it("Skal have alle de påkrævede felter", (done) => {
            chai.request("http://localhost:1337/")
                .get("api/produkter/getprodukter")
                .end((err, res) => {
                    svar = res.body
                    expect(res.body[0]).to.have.some.keys('pris', 'titel', 'beskrivelse', 'billedeUrl');
                    done();
                });
                
        });

        
    })
});
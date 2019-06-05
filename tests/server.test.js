// Import the dependencies for testing
var chai = require('chai'), chaiHttp = require('chai-http');
var app = require('../server');

chai.use(chaiHttp);
chai.should();

describe('Receipts', function() {
    describe("GET /", () => {
        // Test to get all receipts
        it("should get all receipts", (done) => {
            chai.request(app)
                .get('/api/receipts')
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('array');
                    done();
                });
        });
    })
});
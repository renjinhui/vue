const API = require('../');
const muk = require('muk');
const expect = require('expect.js');
const config = require('./config');

describe('api_billion.js', () => {
  const api = new API();

  it('sydIndexData should ok', (done) => {
    api.sydIndexData()
      .then((result) => {
        expect(result).to.have.property('body');
        expect(result.body).to.have.property('errorCode');
        expect(result.body).to.have.property('data');
        expect(result.body.data.turnover).to.be.a('number');
        done();
      })
      .catch((err) => {
        expect(err).not.to.be.ok();
        done();
      });
  });

  it('investRankList should ok', (done) => {
    api.investRankList(10)
      .then((result) => {
        expect(result).to.have.property('body');
        expect(result.body).to.have.property('errorCode');
        expect(result.body).to.have.property('data');
        expect(result.body.data.today).to.be.an('array');
        done();
      })
      .catch((err) => {
        expect(err).not.to.be.ok();
        done();
      });
  });
});

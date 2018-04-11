const API = require('../');
const muk = require('muk');
const expect = require('expect.js');
const config = require('./config');

describe('api_bid.js', () => {
  const api = new API();

  it('bidProgress should ok', (done) => {
    const data = {
      bidId: 502912893773,
      uid: config.uid,
      sydaccesstoken: config.sydaccesstoken
    };
    api.bidProgress(data)
      .then((result) => {
        expect(result).to.have.property('body');
        expect(result.body).to.have.property('errorCode');
        expect(result.body.data).to.have.property('percent');
        done();
      })
      .catch((err) => {
        expect(err).not.to.be.ok();
        done();
      });
  });

  it('bidList should ok', (done) => {
    const data = {
      uid: config.uid,
      sydaccesstoken: config.sydaccesstoken
    };
    api.bidList(data)
      .then((result) => {
        expect(result).to.have.property('body');
        expect(result.body).to.have.property('errorCode');
        expect(result.body.data).to.have.property('list');
        expect(result.body.data.list).to.have.length(1);
        done();
      })
      .catch((err) => {
        expect(err).not.to.be.ok();
        done();
      });
  });

  it('bid should ok', (done) => {
    const data = {
      bidId: 502912893773,
      bidAmount: 100,
      uid: config.uid,
      sydaccesstoken: config.sydaccesstoken
    };
    api.bid(data)
      .then((result) => {
        expect(result).to.have.property('body');
        expect(result.body).to.have.property('errorCode');
        done();
      })
      .catch((err) => {
        expect(err).not.to.be.ok();
        done();
      });
  });
});

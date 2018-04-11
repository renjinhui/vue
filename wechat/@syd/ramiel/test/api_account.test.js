const API = require('../');
const muk = require('muk');
const expect = require('expect.js');
const config = require('./config');

describe('api_account.js', () => {
  const api = new API();

  it('safeCenter should ok', (done) => {
    const data = {
      uid: config.uid,
      sydaccesstoken: config.sydaccesstoken
    };
    api.safeCenter(data)
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

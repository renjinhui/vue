const API = require('../');
const muk = require('muk');
const expect = require('expect.js');
const config = require('./config');

describe('api_util.js', () => {
  const api = new API();

  it('sha1 should ok', (done) => {
    const sha1 = api.sha1(config.sha1SrcStr);
    expect(sha1).to.eql(config.sha1HexStr);
    done();
  });

  it('md5 should ok', (done) => {
    const md5 = api.md5(config.md5SrcStr);
    expect(md5).to.eql(config.md5HexStr);
    done();
  });

  it('form2query should ok', (done) => {
    const queryString = api.form2query({
      username: 'test',
      password: 'test',
      status: true
    });

    expect(queryString).to.eql('?username=test&password=test&status=true&');
    done();
  });
});

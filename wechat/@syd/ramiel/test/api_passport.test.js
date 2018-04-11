const API = require('../');
const muk = require('muk');
const expect = require('expect.js');
const config = require('./config');

describe('api_passport.js', () => {
  const api = new API();

  it('login should ok', (done) => {
    const data = {
      username: config.username,
      password: config.password
    };
    api.login(data)
      .then((result) => {
        expect(result).to.have.property('body');
        expect(result.body).to.have.property('errorCode');
        expect(result.body.errorCode).to.eql(0);
        expect(result.body.data.status).to.eql('SUCCESS');
        done();
      })
      .catch((err) => {
        expect(err).not.to.be.ok();
        done();
      });
  });

  it('vaildUsername should ok', (done) => {
    const data = {
      username: config.username
    };
    api.vaildUsername(data)
      .then((result) => {
        expect(result).to.have.property('body');
        expect(result.body).to.have.property('errorCode');
        expect(result.body.errorCode).to.eql(0);
        expect(result.body.data).to.eql('REGISTERED');
        done();
      })
      .catch((err) => {
        expect(err).not.to.be.ok();
        done();
      });
  });

  it('sendSms should ok', (done) => {
    const data = {
      username: config.username
    };
    api.sendSms(data)
      .then((result) => {
        expect(result).to.have.property('body');
        expect(result.body).to.have.property('errorCode');
        if (result.body.errorCode === 0) {
          expect(result.body).to.have.property('data');
        } else {
          expect(result.body).to.have.property('errorMessage');
        }
        done();
      })
      .catch((err) => {
        expect(err).not.to.be.ok();
        done();
      });
  });

  it('regist should ok', (done) => {
    const data = {
      username: config.username,
      password: config.password,
      confirmPassword: config.password,
      smscode: '0000',
    };
    api.regist(data)
      .then((result) => {
        expect(result).to.have.property('body');
        expect(result.body).to.have.property('errorCode');
        if (result.body.errorCode !== 0) {
          expect(result.body).to.have.property('errorMessage');
        }
        done();
      })
      .catch((err) => {
        expect(err).not.to.be.ok();
        done();
      });
  });

  it('wxLogin should ok', (done) => {
    const data = {
      uid: 1023543,
      url: 'https://m.souyidai.com/invest'
    };
    api.wxLogin(data)
      .then((result) => {
        expect(result).to.have.property('body');
        expect(result.body).to.have.property('errorCode');
        if (result.body.errorCode !== 0) {
          expect(result.body).to.have.property('errorMessage');
        }
        done();
      })
      .catch((err) => {
        expect(err).not.to.be.ok();
        done();
      });
  });

  it('changePassword should ok', (done) => {
    const data = {
      uid: config.uid,
      username: config.username,
      oldpassword: config.password,
      newpassword: '123456',
      confirmPassword: '123456',
    };
    api.changePassword(data)
      .then((result) => {
        expect(result).to.have.property('body');
        expect(result.body).to.have.property('errorCode');
        if (result.body.errorCode !== 0) {
          expect(result.body).to.have.property('errorMessage');
          expect(result.body.data.status).to.eql('SUCCESS');
        }
        done();
      })
      .catch((err) => {
        expect(err).not.to.be.ok();
        done();
      });
  });
});

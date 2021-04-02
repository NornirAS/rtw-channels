import { Rtw } from '../../classes/rtw';
import { expect, assert } from 'chai';
import 'mocha';

const parameters = {
  domain: 'domain',
  service: 'service',
  token: 'token',
  objectID: '2',
};

const parametersWithFormat = {
  domain: 'domain',
  service: 'service',
  token: 'token',
  objectID: '2',
  format: 'json' // xml or json
};

const rtw = new Rtw(parameters);
const rtwWithFormat = new Rtw(parametersWithFormat);

describe('Rtw', () => {
  it('should be valid url with domain and service included', () => {
    expect(rtw.url).to.equal(`https://${rtw.domain}.cioty.com/${rtw.service}`);
  });
  it('should be a query string with token and objectID', () => {
    expect(rtw.baseBody).to.equal(`token=${rtw.token}&objectID=${rtw.objectID}`);
  });
  it('should include specified header', () => {
    expect(rtw.baseHeaders).to.include({
      'Content-Type': 'application/x-www-form-urlencoded'
    });
  });
  it('should be an empty string', () => {
      assert.equal(rtw.formatQuery, '');
  })
  it('should be a query string when format provided', () => {
    assert.equal(rtwWithFormat.formatQuery, `&format=${rtwWithFormat.format}`);
  })
  it('should be an error in catch block therefor response is undefined', async () => {
    const response = await rtw.request({ 
      body: rtw.baseBody,
      headers: rtw.baseHeaders,
      method: 'GET'
    });
    expect(response).to.be.a('undefined');
  });
});
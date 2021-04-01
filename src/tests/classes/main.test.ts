import { Rtw, RtwString, RtwChannel } from '../../main';
import { expect, assert } from 'chai';
import 'mocha';

const parameters = {
  domain: 'domain',
  service: 'service',
  token: 'token',
  objectID: '1',
};
const rtw = new Rtw(parameters);
const string = new RtwString(parameters);
const channel = new RtwChannel(parameters);

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
  it('should return undefined', async () => {
    const response = await rtw.request({ 
      body: rtw.baseBody,
      headers: rtw.baseHeaders,
      method: 'GET'
    });
    expect(response).to.be.a('undefined');
  });
});

describe('RtwString', () => {
  it('should include specified header', () => {
    expect(string.headers).to.include({
      'Synx-Cat': '1'
    });
  });
  const data = 'data1=test&data2=test2';
  it('should be a query string', () => {
    const body = string.getBody(data);
    assert.equal(body, `${string.baseBody}&${data}`);
  });
  it('should be a promise', () => {
    const response = string.send(data);
    expect(response).to.be.a('promise');
  });
});

describe('RtwChannel', () => {
  it('should include specified header', () => {
    expect(channel.headers).to.include({
      'Synx-Cat': '4'
    });
  });
  it('should be a query string', () => {
    assert.equal(channel.body, `${channel.baseBody}&format=${channel.format}`);
  });
  it('should be a promise', () => {
    const response = channel.receive();
    expect(response).to.be.a('promise');
  });
});
import { RtwString } from '../../classes/rtwString';
import { expect, assert } from 'chai';
import 'mocha';

const parameters = {
  domain: 'domain',
  service: 'service',
  token: 'token',
  objectID: '2'
};
const string = new RtwString(parameters);

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
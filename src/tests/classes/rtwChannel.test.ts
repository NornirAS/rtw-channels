import { RtwChannel } from '../../classes/rtwChannel';
import { expect, assert } from 'chai';
import 'mocha';

const parameters = {
  domain: 'domain',
  service: 'service',
  token: 'token',
  objectID: '2',
  format: 'json' // xml or json
};
const channel = new RtwChannel(parameters);

describe('RtwChannel', () => {
  it('should include specified header', () => {
    expect(channel.headers).to.include({
      'Synx-Cat': '4'
    });
  });
  it('should be a query string', () => {
    assert.equal(channel.body, `${channel.baseBody}${channel.formatQuery}`);
  });
  it('should be a promise', () => {
    const response = channel.receive();
    expect(response).to.be.a('promise');
  });
});
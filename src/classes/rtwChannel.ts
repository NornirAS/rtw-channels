import { Rtw, Headers } from './rtw';

export class RtwChannel extends Rtw {
  public get headers(): Headers {
    const headers: Headers = super.baseHeaders;
    headers['Synx-Cat'] = '4';
    return headers;
  }

  public get body(): string {
    return `${super.baseBody}${super.formatQuery}`;
  }

  async receive() {
    return await super.request({
      body: this.body,
      headers: this.headers,
      method: 'POST'
    })
  }
}
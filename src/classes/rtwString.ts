import { Rtw, Headers } from './rtw';

export class RtwString extends Rtw {
  public get headers(): Headers {
    const headers: Headers = super.baseHeaders;
    headers['Synx-Cat'] = '1';
    return headers;
  }

  public getBody(data: string): string {
    return `${super.baseBody}&${data}`;
  }

  async send(data: string) {
    return await super.request({
      body: this.getBody(data),
      headers: this.headers,
      method: 'POST'
    })
  }
}
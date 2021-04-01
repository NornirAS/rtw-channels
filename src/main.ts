import fetch from 'node-fetch';

interface Parameters {
  domain: string,
  service: string,
  token: string,
  objectID: string,
  format?: string
}

interface Headers {
  [key: string]: string
}

interface RequestParams {
  body: string,
  headers: Headers,
  method: string
}

class Rtw {
  domain: string
  service: string
  token: string
  objectID: string
  format?: string

  constructor({ domain, service, token, objectID, format }: Parameters) {
    this.domain = domain,
    this.service = service,
    this.token = token,
    this.objectID = objectID,
    this.format = format
  }

  public get url(): string {
    return `https://${this.domain}.cioty.com/${this.service}`;
  }

  public get baseBody(): string {
    return `token=${this.token}&objectID=${this.objectID}`;
  }

  public get baseHeaders(): Headers {
    return {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  }

  public async request({ body, headers, method }: RequestParams) {
    try {
      return await fetch(this.url, { body, headers, method });
    } catch(e) {
      console.log(e);
    }
  }

}

export class RtwString extends Rtw {
  private get headers(): Headers {
    const headers: Headers = super.baseHeaders;
    headers['Synx-Cat'] = '1';
    return headers;
  }

  private getBody(data: string): string {
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

export class RtwChannel extends Rtw {
  private get headers(): Headers {
    const headers: Headers = super.baseHeaders;
    headers['Synx-Cat'] = '4';
    return headers;
  }

  private get body(): string {
    return `${super.baseBody}&${super.format}`;
  }

  async receive() {
    return await super.request({
      body: this.body,
      headers: this.headers,
      method: 'POST'
    })
  }
}
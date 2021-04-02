import fetch from 'node-fetch';

interface Parameters {
  domain: string,
  service: string,
  token: string,
  objectID: string,
  format?: string
}

export interface Headers {
  [key: string]: string
}

interface RequestParams {
  body: string,
  headers: Headers,
  method: string
}

export class Rtw {
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

  public get formatQuery(): string {
    if (this.format) {
      return `&format=${this.format}`;
    } else {
      return '';
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
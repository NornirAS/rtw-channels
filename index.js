import fetch from 'node-fetch';

export default class RtwChannels {
  constructor({ domain, service, token, objectID, format }) {
    this.domain = domain,
    this.service = service,
    this.token = token,
    this.objectID = objectID,
    this.format = format
  }

  get url() {
    return `https://${this.domain}.cioty.com/${this.service}`;
  }
  
  get body() {
    return `token=${this.token}&objectID=${this.objectID}&format=${this.format}`;
  }

  get headers() {
    return {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Synx-Cat': '4'
    }
  }

  get method() {
    return 'POST'
  }

  get options() {
    return {
      body: this.body,
      headers: this.headers,
      method: this.method
    }
  }

  async request() {
    try {
      return await fetch(this.url, this.options);
    } catch(e) {
      console.error(e);
    }
  }
}
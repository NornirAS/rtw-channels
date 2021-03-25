import fetch from 'node-fetch';

class RtwString {
  constructor({ domain, service, token, objectID }) {
    this.domain = domain,
    this.service = service,
    this.token = token,
    this.objectID = objectID
  }

  get url() {
    return `https://${this.domain}.cioty.com/${this.service}`;
  }

  get headers() {
    return {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Synx-Cat': '1'
    }
  }

  getBody(data) {
    return `token=${this.token}&objectID=${this.objectID}&${data}`;
  }

  async send(data) {
    const body = this.getBody(data)
    try {
      return await fetch(this.url, {
        body,
        headers: this.headers,
        method: 'POST'
      });
    } catch(e) {
      console.error(e);
    }
  }
}

class RtwChannel {
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

  async receive() {
    try {
      return await fetch(this.url, {
        body: this.body,
        headers: this.headers,
        method: 'POST'
      });
    } catch(e) {
      console.error(e);
    }
  }
}

export default {
  RtwString,
  RtwChannel
}
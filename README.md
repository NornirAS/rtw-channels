# RTW channels
Class based package that helps to communicate with RTW. Send and receive data using POST request or websocket.

## Installation
`npm i @norniras/rtw-channels --save`

## Classes
- RtwString - class for sending data to RTW.
- RtwChannel - class for receiving data from RTW.

## How to use
`Note!! We are using ES6 modules`
```javascript
// Here you can import single or multiple classes depends on your needs.
import { RtwString, RtwChannel } from '@norniras/rtw-channels';

/**
  This has to be on place. Normally it's a bad practice, but you
  will be fine until you make requests against domains you know. It will be
  removed in the near future.
*/
process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0"; 

// This is data model for send string.
const stringData = {
  domain: 'domainName',
  service: 'serviceName',
  token: 'yourToken',
  objectID: 'objectID',
};

// Create an instance of RtwString class and pass valid stringData object.
const string = new RtwString(stringData);

// For example we put send data to RTW inside setInterval function.
setInterval(() => {
  // data should be in query format: 'element1=someText&element2=someText'
  const data = 'element1=someText&element2=someText';
  string.send(data);
}, 5000);

// This is data model for channel request.
const channelData = {
  domain: 'domainName',
  service: 'serviceName',
  token: 'yourToken',
  objectID: 'objectID',
  format: 'json' // xml or json
};

// Create an instance of RtwChannel class and pass valid channelData object.
const channel = new RtwChannel(channelData);

// Declare function
const getData = async () => {
  // Response body.
  const { body } = await channel.receive();
  // Listen data event on body.
  body.on('data', data => {
    /** 
      data comming as Buffer so we should use methods:
      .toString() to make it readable.
      .trim() to remove new lines \n and/or \r
    */
    console.log(data.toString().trim());
  });
};

// Call function
getData();
```
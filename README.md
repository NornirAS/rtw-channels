# RTW channel request
Create a channel that will be open if there will be incoming data or until timeout. The first message will be a WebJS related to the service you connect to. WebJS can be a whole HTML page including JS or a small widget that you can inject into some part of your app. After you get a WebJS you will start to receive data that you can inject inside the received WebJS.

## Installation
`npm i @norniras/rtw-channel-request --save`

## How to use
```
const RtwChannel = require('@norniras/rtw-channel-request');
/**
  This has to be on place. Normally it's a bad practice, but you
  will be fine until you make requests against .cioty.com. It will be
  removed in the near future.
*/
process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0"; 

const data = {
  domain: 'domainName',
  service: 'serviceName',
  token: 'yourToken',
  objectID: 'number',
  format: 'json' // xml or json
};

const channel = new RtwChannel(data);
const getDataStream = async () => {
  const { body } = await channel.request();
  body.on('data', data => {
    console.log(data.toString().trim());
  });
};
 
getDataStream();
```
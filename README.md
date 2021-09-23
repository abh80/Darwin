# Darwin

## Introduction

Darwin is a basic assistant that does certain stuffs and can handle multiple devices.

Darwin utilizes the **express** (server) and **ws** (websocket) to handle multiple clients/devices.

> Note : Darwin is solely a personal assistant i.e. dont try to host it for commercial usage as its not safe.

## Code Samples

> These samples are written assuming there are no changes in `src/config.json` and project is hosted locally.
> If you have made changes to config please make suitable changes.

### Connecting a device

To connect a device make a **websocket** connection to the server.
With following headers -

- **name** : The name of the device.

- **platform** : The platform the device (windows / android).

- **authorization** : The password defined in config / environment.

```js
const wss = require("ws");
const ws = new wss("ws://localhost:3500/gateway", {
  headers: {
    name: "Desktop-Main",
    platform: "windows",
    authorization: "password",
  },
});
let deviceID = null;
ws.onopen = () => console.log("open");

ws.onmessage = (e) => {
  const data = JSON.parse(e.data);
  console.log(data);
  switch (data.code) {
    case 12: // Code 12 is authorization code
      deviceID = data.body.id;
      console.log("ID updated!");
    case 101:
      console.log("Darwin says : " + data.body.say);
  }
};
```

### Sending a message

To send a message you have make a **POST** request to http://localhost:3500/api/actions/create.

The following headers is required -

- **authorization** : The password defined in config / environment.

- **device-id** : The device id of the device (recivied via websocket).

- **Content-Type** : This header must be set to `application/json`

With the following body -

**message** : The message to be sent.

Here is an example code

```js
const wss = require("ws");
const fetch = require("node-fetch");
const ws = new wss("ws://localhost:3500/gateway", {
  headers: {
    name: "Desktop-Main",
    platform: "windows",
    authorization: "password",
  },
});
let deviceID = null;
ws.onopen = () => console.log("open");

ws.onmessage = (e) => {
  const data = JSON.parse(e.data);
  console.log(data);
  switch (data.code) {
    case 12:
      deviceID = data.body.id;
      console.log("ID updated!");
      fetch("http://localhost:3500/api/actions/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "device-id": deviceID,
          authorization: "password",
        },
        body: JSON.stringify({ message: "hi" }),
      });
      break;
    case 101:
      console.log("Darwin says : " + data.body.say);
      break;
  }
};
```

## Installation

To install follow the following steps :-

- Firstly clone this repo `bash git clone https://github.com/abh80/Darwin`

- Secondly hit the `npm install` to install dependencies

- Build the project by running `npm build`

- Start the server by running `npm start`

Thats all you have to do!

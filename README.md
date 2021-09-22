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
const wss = require("ws")
const ws = new wss("ws://localhost:3500/gateway",{
headers : {
name : "Desktop-Main",
platform:"windows",
authorization:"password"
}
})
```

## Installation

To install follow the following steps :-
- Firstly clone this repo ```bash
git clone https://github.com/abh80/Darwin```

- Secondly hit the `npm install` to install dependencies

- Build the project by running `npm build`

- Start the server by running `npm start`

Thats all you have to do!

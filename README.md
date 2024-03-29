# 🚚 Log Collector API

[![build][build-shield]][build-url]

It has been created to send the error logs generated by the client to the database. By taking the user information exposed to the error in addition to information such as the page, browser, and time of the error; It can be thought of as a tool to assist in solving errors in detail and without loss, without connecting to the user's system.

## Getting Started
### Installation

```
git clone https://github.com/onuryarar/nodejs-log-collector-api
cd nodejs-log-collector-api && npm install
```

### Configuration

Create the `nodemon.json` file in the root directory and add:
```json
{
    "env": {
        "URL": "/",
        "DEV_URL": "http://localhost",
        "LIVE_URL": "YOUR_LIVE_URL",
        "MONGO_ATLAS_US": "YOUR_MONGO_US",
        "MONGO_ATLAS_PW": "YOUR_MONGO_PW",
        "MONGO_ATLAS_DB": "YOUR_MONGO_DB",
        "JWT_KEY": "YOUR_JWT_KEY"
    }
}
```

### Launch
Now, run this command to start the project
```
npm start
```

## License
Distributed under the MIT License. See [LICENSE][LICENSE] for more information.


[build-shield]: https://app.travis-ci.com/onuryarar/log-collector-api.svg?branch=master
[build-url]: https://app.travis-ci.com/onuryarar/log-collector-api
[LICENSE]: https://github.com/onuryarar/nodejs-log-collector-api/blob/master/LICENSE

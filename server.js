const http = require('http');
const app = require('./app');
const argv = require('yargs')
    .option('type', {
        alias: 't',
        choices: ['dev', 'prod']
    }).argv;

if (argv.type == 'dev') process.env.URL = process.env.DEV_URL;
if (argv.type == 'prod') process.env.URL = process.env.LIVE_URL;

const url = process.env.URL;
const port = process.env.PORT || 3010;

const server = http.createServer(app);

server.on('listening', () => {
    console.log(`server is running at → \x1b[32m${url}:${port} \x1b[31m`);
});

server.listen(port);
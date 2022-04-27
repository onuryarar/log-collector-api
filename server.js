const http = require('http');
const app = require('./app');
const argv = require('yargs')
    .option('type', {
        alias: 't',
        choices: ['dev', 'prod']
    }).argv;

const port = process.env.PORT || 3010;

if (argv.type === 'dev') process.env.URL = process.env.DEV_URL + ':' + port;
if (argv.type === 'prod') process.env.URL = process.env.LIVE_URL;

const url = process.env.URL;

const server = http.createServer(app);

server.on('listening', () => {
    console.log('server is running at → \x1b[36m%s\x1b[0m', url);
});

server.listen(port);
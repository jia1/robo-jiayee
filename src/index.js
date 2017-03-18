/* Start of bootstrap code */
import 'babel-polyfill';
import bunyan from 'bunyan';
import express from 'express';
import botbuilder from 'botbuilder';

import config from './config';
import botConnector from './botConnector';

const server = express();
const log = bunyan.createLogger({
  name: 'index.js',
  serializers: bunyan.stdSerializers,
});
/* End of bootstrap code */

const chatBotName = 'Robo Jia Yee';
log.info(`I am ${chatBotName}.`);
log.info(`Current environment: ${process.env.NODE_ENV}.`);

const bot = new botbuilder.UniversalBot(botConnector.listen());

bot.dialog('/', function(session) {
    session.send("Hello.");
});

const port = process.env.PORT || 3000;
server.listen(port, () => {
  log.info(`Listening on port ${port}`);
});

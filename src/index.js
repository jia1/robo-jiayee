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

if (process.env.NODE_ENV === 'production') {
    server.post('api/messages', botConnector.listen());
}

bot.dialog('/', [
    function(session, args, next) {
        if (!session.userData.name) {
            // if no user data
            session.beginDialog('/profile');
        } else {
            // run the function below
            next();
        }
    },
    function(session) {
        session.send(
            `Hello ${session.userData.name}, I'm ${chatBotName}!`);
    }
]);

bot.dialog('/profile', [
    function(session) {
        botbuilder.Prompts.text(session,
            `Hello! What is your name?`);
    },
    function(session, results, next) {
        session.userData.name = results.response;
        session.endDialog();
    }
]);

const port = process.env.PORT || 3000;
server.listen(port, () => {
  log.info(`Listening on port ${port}`);
});

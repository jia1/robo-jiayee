import botbuilder from 'botbuilder';
import config from './config';

const isProduction = process.env.NODE_ENV === 'production';
const connector = isProduction ? new botbuilder.ChatConnector({ appId, appPassword }) :
                                 new botbuilder.ConsoleConnector();
export default connector;

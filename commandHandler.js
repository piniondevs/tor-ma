const axios = require('axios');
const dotenv = require('dotenv');

dotenv.config();

const endpoint = process.env.ENDPOINT;

const commandIndexGenerator = require('./commandIndex');

const ErrorEmbed = require('./utils/errorEmbed');
const genericError = require('./utils/genericError');

const prefix = '~';

const commandIndex = commandIndexGenerator()

const commandHandler = async (message) => {
    if (!message.content.startsWith(prefix)) {
        try {
            const res = await axios.get(`${endpoint}/galis/random`)
            message.reply(res.data.gali);
            return;
        } catch (err) {
            genericError();
            console.log(err);
        }
    }
    
    const baseCommand = message.content.toLowerCase().split(' ')[0].split('');
    baseCommand.shift();

    const command = baseCommand.join('');

    if (!commandIndex[command]) {
        const error = new ErrorEmbed('Command Not Found', 'Sorry chief I dont have that command');
        message.channel.send(error);
        return;
    }

    console.log(`Running command ${prefix + command}`);

    commandIndex[command].handler(message);
}

module.exports = commandHandler;

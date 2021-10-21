const axios = require('axios');
const dotenv = require('dotenv');

const ErrorEmbed = require('../utils/errorEmbed');
const InfoEmbed = require('../utils/infoEmbed');
const genericError = require('../utils/genericError');

dotenv.config()

const endpoint = process.env.ENDPOINT;

module.exports = {
    name: 'request',
    helpInfo: 'The command that you use to request a gali. `Usage: ~request some gali`',
    handler: async (message) => {
        try {

            const baseRequest = message.content.split(' ');

            if (!baseRequest[1]) {
                const noArgsErr = new ErrorEmbed('No Gali Provided', 'You need to provide a gali which you want to request.');
                message.channel.send(noArgsErr);
                return;
            }

            baseRequest.shift();

            const req = baseRequest.join(' ');

            const payload = {
                gali: req,
                author: message.author.username
            }

            await axios.post(`${endpoint}/requests/create`, payload);

            const successEmbed = new InfoEmbed('Request Created', 'Your gali has been sent to our request queue, if it gets accepted by our admin then it will soon be used by the bot.');

            message.channel.send(successEmbed);
        } catch (err) {
            genericError(message);
            console.error(err)
        }
    }
}

const axios = require('axios');
const dotenv = require('dotenv');

dotenv.config();

const endpoint = process.env.ENDPOINT;

const ErrorEmbed = require("../utils/errorEmbed");
const ListEmbed = require('../utils/listEmbed');

module.exports = {
    name: 'list',
    helpInfo: 'Command to list all available galis or requests. `Usage: ~list galis`',
    handler: async (message) => {
        try {
            const baseCommand = message.content.toLowerCase().split(' ');
            baseCommand.shift();

            if (!baseCommand[0]) {
                message.channel.send(new ErrorEmbed(
                    'Missing Argument',
                    'You need to put an argument after the command, either `galis` or `requests`'
                ));
                return;
            }

            const arg = baseCommand[0];

            const embedFieldify = (data) => {
                const fields = [];
                data.forEach(item => {
                    fields.push({
                        name: item.gali,
                        value: `By: **${item.author}**`
                    });
                });
                return fields;
            }

            switch (arg) {
                case 'galis':
                    
                    const galiRes = await axios.get(`${endpoint}/galis`);
                    const galiList = embedFieldify(galiRes.data);

                    message.channel.send(new ListEmbed(
                        'Galis',
                        'These are all the galis I have access to.',
                        galiList
                    ));

                    return;
                case 'requests':
                    
                    const reqRes = await axios.get(`${endpoint}/requests`);
                    const reqList = embedFieldify(reqRes.data);

                    message.channel.send(new ListEmbed(
                        'Requests',
                        'These are the requests currently awaiting approval.',
                        reqList
                    ));

                    return;
                default:
                    message.channel.send(new ErrorEmbed(
                        'Invalid Argument',
                        'You need to put an argument after the command, either `galis` or `requests`'
                    ));
                    return;
            }

        } catch (err) {
            const someRandomErr = new ErrorEmbed('Something Went Wrong', 'Something went horribly wrong, ping tahlil so that he can check the logs and find out what it is.');
            message.channel.send(someRandomErr);
            console.error(err);
        }
    }
}
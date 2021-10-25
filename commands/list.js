const axios = require('axios');
const dotenv = require('dotenv');

dotenv.config();

const endpoint = process.env.ENDPOINT;

const ErrorEmbed = require("../utils/errorEmbed");
const ListEmbed = require('../utils/listEmbed');
const genericError = require('../utils/genericError');


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
            const target = message.mentions.users.first();

            const embedFieldify = (data) => {
                const fields = [];
                data.forEach(item => {
                    fields.push({
                        name: item.gali,
                        value: `By: **${item.author}** & ID: **${item.id}**`
                    });
                });
                return fields;
            }

            switch (arg) {
                case 'galis':
                    
                    const galiRes = await axios.get(`${endpoint}/galis`);
                    const galiList = embedFieldify(galiRes.data);

                    if (target) {
                        const targetedGalis = galiRes.data.filter(items => {
                            return items.author === target.username;
                        });
                        if (targetedGalis.length === 0) {
                            message.channel.send(new ErrorEmbed(
                                'No results found',
                                'We could not find any galis from the user.'
                            ));
                            return;
                        }
                        const targetFields = embedFieldify(targetedGalis);
                        message.channel.send(new ListEmbed(
                            'Galis',
                            `All the galis by ${target.username}`,
                            targetFields
                        ))
                        return;
                    }

                    message.channel.send(new ListEmbed(
                        'Galis',
                        'These are all the galis I have access to.',
                        galiList
                    ));

                    return;
                case 'requests':
                    
                    const reqRes = await axios.get(`${endpoint}/requests`);
                    const reqList = embedFieldify(reqRes.data);

                    if (target) {
                        const targetedRequests = reqRes.data.filter(items => {
                            return items.author === target.username;
                        });
                        if (targetedRequests.length === 0) {
                            message.channel.send(new ErrorEmbed(
                                'No results found',
                                'We could not find any requests from the user.'
                            ));
                            return;
                        }
                        const requestFields = embedFieldify(targetedRequests);
                        message.channel.send(new ListEmbed(
                            'Requests',
                            `All the requests by ${target.username}`,
                            requestFields
                        ))
                        return;
                    }

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
            genericError(message);
            console.error(err);
        }
    }
}
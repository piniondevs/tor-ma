const Discord = require('discord.js');

const commandIndexGenerator = require('../commandIndex');

module.exports = {
    name: 'help',
    helpInfo: 'Shows the help menu. `Usage: ~help`',
    handler: (message) => {

        const commandIndex = commandIndexGenerator();

        const keys = Object.keys(commandIndex);

        let helpItems = [];

        keys.forEach(item => {
            const schema = {
                name: commandIndex[item].name,
                value: commandIndex[item].helpInfo
            }
            helpItems.push(schema);
        });
        
        const helpEmbed = new Discord.MessageEmbed()
            .setColor('RANDOM')
            .setTitle('Help')
            .setDescription('The prefix is `~`.')
            .addFields(helpItems);

        message.channel.send(helpEmbed)

    }
}
const Discord = require('discord.js');

class ListEmbed {
    constructor(title, description, data) {
        const listEmbed = new Discord.MessageEmbed()
            .setColor('RANDOM')
            .setTitle(title)
            .setDescription(description)
            .addFields(data)
        return listEmbed;
    }
}

module.exports = ListEmbed;
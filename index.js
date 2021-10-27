const Discord = require('discord.js');
const dotenv = require('dotenv');

const commandHandler = require('./commandHandler'); 

dotenv.config();

const client = new Discord.Client();

client.on('ready', () => {
    console.log(`Bot logged in as ${client.user.tag}`);
    client.user.setActivity('Use ~help');
});


client.on('message', (message) => {
    if (message.author.id === client.user.id) return;
    if (message.channel.id !== process.env.CHANNEL_ID) return;
    commandHandler(message);
});

client.login(process.env.BOT_TOKEN);

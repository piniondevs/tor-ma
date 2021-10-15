const Discord = require('discord.js');
const dotenv = require('dotenv');

const commandHandler = require('./commandHandler'); 

dotenv.config();

const client = new Discord.Client();

client.on('ready', () => {
    console.log(`Bot logged in as ${client.user.tag}`);
    client.user.setPresence({
        name: 'debug mode',
        type: 'WATCHING'
    });
});


client.on('message', (message) => {
    if (message.author.id === client.user.id) return;
    if (message.channel.id !== '894461781907492904') return;
    commandHandler(message);
});

client.login(process.env.BOT_TOKEN);
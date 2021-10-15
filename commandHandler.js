const commandIndex = require('./commandIndex');

// Utility Class Imports
const ErrorEmbed = require('./utils/errorEmbed');

const prefix = '~';

const commandHandler = (message) => {
    if (!message.content.startsWith(prefix)) {
        message.channel.send('Ill add this part later');
        return;
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

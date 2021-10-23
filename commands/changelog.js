module.exports = {
    name: 'changelog',
    helpInfo: 'Shows the bots changelog and all the various things happening with it.',
    handler: (message) => {
        message.channel.send(message.content);
    }
}
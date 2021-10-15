const commandIndex = {
    request: {
        name: 'request',
        helpInfo: 'The command that you use to request a gali.',
        handler: require('./commands/request')
    }
}

module.exports = commandIndex;

const commandIndex = {
    request: {
        name: 'request',
        helpInfo: 'The command that you use to request a gali.',
        handler: require('./commands/request')
    },
    authorize: {
        name: 'authorize',
        helpInfo: 'Command to authorize galis (Only Admins Can Do This)',
        handler: require('./commands/authorize')
    }
}

module.exports = commandIndex;

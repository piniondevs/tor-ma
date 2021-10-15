const commandIndex = {
    hello: {
        help: 'A command that replies with hello world',
        handler: require('./commands/hello')
    }
}

module.exports = commandIndex;

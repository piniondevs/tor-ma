const fs = require('fs');

const commandIndexGenerator = () => {
    try {

        const files = fs.readdirSync('./commands', 'utf8');

        const commands = files.map(item => {
            const splitted = item.split('.');
            splitted.pop();
            return splitted.join('');
        });

        const commandIndex = {};

        commands.forEach(item => {
            commandIndex[item] = require(`./commands/${item}.js`);
        });

        return commandIndex;

    } catch (err) {
        console.error(err);
    }
}

module.exports = commandIndexGenerator;
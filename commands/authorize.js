const ErrorEmbed = require('../utils/errorEmbed');

module.exports = (message) => {
    try {
        if (message.author.id !== '453146976008011777') {
            message.channel.send(new ErrorEmbed('Unauthorized', 'Yeah m8 you arent authorized to do that.'));
            return;
        }

        const command = message.content.split(' ');
        command.shift();

        const id = command.join(' ');
        
        if (id.length !== 10) {
            message.channel.send(new ErrorEmbed('Invalid Length', 'You sure that the argument is a valid nanoid ?'));
            return;
        }

    } catch (err) {
        const someRandomErr = new ErrorEmbed('Something Went Wrong', 'Something went horribly wrong, ping tahlil so that he can check the logs and find out what it is.');
        message.channel.send(someRandomErr);
        console.error(err)
    } 
}
const genericError = require('../utils/genericError');

const ErrorEmbed = require('../utils/errorEmbed');

module.exports = {
    name: 'delete',
    helpInfo: 'Command to delete request or gali. (Only admins can do this) `Usage: ~delete gali nanoid(10)`',
    handler: (message) => {
        try {
            if (message.author.id !== '453146976008011777') {
                message.channel.send(new ErrorEmbed('Unauthorized', 'Yeah m8 you arent authorized to do that.'));
                return;
            }

            const msg = message.content.split(' ');
            msg.shift();

            const type = msg[0];
            
            if (!type) {
                message.channel.send(new ErrorEmbed(
                    'No Arguments',
                    'You have not provided any arguments.'
                ))
            }
            
        } catch (err) {
            genericError(message);
            console.log(err);
        }
    }
}
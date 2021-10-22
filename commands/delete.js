const axios = require('axios');
const dotenv = require('dotenv');

dotenv.config();

const endpoint = process.env.ENDPOINT;

const genericError = require('../utils/genericError');
const ErrorEmbed = require('../utils/errorEmbed');
const InfoEmbed = require('../utils/infoEmbed');

module.exports = {
    name: 'delete',
    helpInfo: 'Command to delete request or gali. (Only admins can do this) `Usage: ~delete gali nanoid(10)`',
    handler: async (message) => {
        try {
            if (message.author.id !== '453146976008011777') {
                message.channel.send(new ErrorEmbed('Unauthorized', 'Yeah m8 you arent authorized to do that.'));
                return;
            }

            const msg = message.content.split(' ');
            msg.shift();

            const type = msg[0];
            const id = msg[1];

            if (!type || !id) {
                message.channel.send(new ErrorEmbed(
                    'No Arguments',
                    `Invalid Something Iunno.`
                ))
                return;
            }
            
            // For some fucking reason the code above breaks sometimes so 
            // Im gonna keep this here in the case i need to uncomment it
            //
            // if (!id) {
            //     message.channel.send(new ErrorEmbed(
            //         'No Arguments',
            //         'You have not provided any id.'
            //     ));
            //     return;
            // }

            if (id.length !== 10) {
                message.channel.send(new ErrorEmbed(
                    'No Arguments',
                    'Couldnt find that.'
                ));
                return; 
            }

            switch (type) {
                case 'gali':   

                    await axios.delete(`${endpoint}/galis/delete/${id}`);
                    message.channel.send(new InfoEmbed(
                        'Delete Successfully',
                        'The gali has been deleted.'
                    ))
                    return;

                case 'request':

                    await axios.delete(`${endpoint}/requests/delete/${id}`);
                    message.channel.send(new InfoEmbed(
                        'Delete Successfully',
                        'The request has been deleted.'
                    ))
                    return;

                default:
                    message.channel.send(new ErrorEmbed(
                        'Invalid Argument',
                        'You need to put an argument after the command, either `galis` or `requests`'
                    ));
                    return;
            }
            
        } catch (err) {
            genericError(message);
            console.log(err);
        }
    }
}
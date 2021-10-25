const axios = require('axios');
const dotenv = require('dotenv');

dotenv.config();

const endpoint = process.env.ENDPOINT;

const ErrorEmbed = require('../utils/errorEmbed');
const InfoEmbed = require('../utils/infoEmbed');
const genericError = require('../utils/genericError');

module.exports = {
    name: 'authorize',
    helpInfo: 'Command to authorize galis (Only admins can do this). `Usage: ~authorize nanoid(10)`',
    handler: async (message) => {
        try {
            if (message.author.id === '453146976008011777' || message.author.id === '724491337742680095') {
                const command = message.content.split(' ');
                command.shift();
    
                const id = command.join(' ');
    
                if (id.length !== 10) {
                    message.channel.send(new ErrorEmbed('Invalid Length', 'You sure that the argument is a valid nanoid ?'));
                    return;
                }
    
                const res = await axios.post(`${endpoint}/requests/accept`, { id: id });
    
                if (res.data === 'Well shit, we couldnt find that request in our database.') {
                    message.channel.send(new ErrorEmbed('Wrong ID', 'We could not find a request with that id in our database.'));
                    return;
                }
    
                message.channel.send(new InfoEmbed('Gali Authorized', 'The gali has been authorized.'));
            } else {
                message.channel.send(new ErrorEmbed('Unauthorized', 'Yeah m8 you arent authorized to do that.'));
                return;
            }
        } catch (err) {
            genericError(message);
            console.error(err)
        }
    }
}
const axios = require('axios');
const dotenv = require('dotenv');

dotenv.config();

const endpoint = process.env.ENDPOINT;

const ErrorEmbed = require('../utils/errorEmbed');
const InfoEmbed = require('../utils/infoEmbed');

module.exports = async (message) => {
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

        const res = await axios.post(`${endpoint}/requests/accept`, { id: id });

        if (res.data === 'Well shit, we couldnt find that request in our database.') {
            message.channel.send(new ErrorEmbed('Wrong ID', 'We could not find a request with that id in our database.'));
            return;
        }

        message.channel.send(new InfoEmbed('Gali Authorized', 'The gali has been authorized.'));
    } catch (err) {
        const someRandomErr = new ErrorEmbed('Something Went Wrong', 'Something went horribly wrong, ping tahlil so that he can check the logs and find out what it is.');
        message.channel.send(someRandomErr);
        console.error(err)
    } 
}
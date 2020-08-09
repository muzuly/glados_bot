const Discord = require('discord.js');
//var Discord = require('discord.io');
var HashMap = require('hashmap');
const client = new Discord.Client();

client.on('ready', () => {
    console.log('I am ready!');
});

//this is the funcation for getting a random number up to the max
function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

// this is the list of key word respones (question / answers)
const hashMap = new HashMap();
hashMap.set('ping', 'Pong!');
hashMap.set('foo', 'Bar!');
hashMap.set('test', 'Pass!');
hashMap.set('irs', "God! Fuck the IRS! You aren't getting of my bugs!");

// this is the list of random responses
const randomResponse = new HashMap();
randomResponse.set(0, 'Gex is a lizzard!');
randomResponse.set(1, 'I have a bad sunburn.');
randomResponse.set(2, 'She rejected him.');
randomResponse.set(3, 'She likes him.');
randomResponse.set(4, 'The curtain rose.');
randomResponse.set(5, 'Thank you for your letter.');
randomResponse.set(6, 'She disliked him.');
randomResponse.set(7, 'He turned around.');
randomResponse.set(8, 'He finally realized that Mary had made a fool of him.');
randomResponse.set(9, 'He is expected to come home soon.');
randomResponse.set(10, 'See the footnote on page 5.');
randomResponse.set(11, 'The baby is crying.');
randomResponse.set(12, 'I saw five men.');
randomResponse.set(13, 'I\'ll pay with cash.');
randomResponse.set(14, 'People have the tendency to speak more loudly when they get excited.');
randomResponse.set(15, 'No. I\'ve never been there.');
randomResponse.set(16, 'That\'s too bad. Bill\'s a nice guy.');
randomResponse.set(17, 'You\'ll find the way all right once you get to the station.');
randomResponse.set(18, 'How much does it cost?');
randomResponse.set(19, 'No. It\'s not in there. When was the last time you saw it?');
randomResponse.set(20, 'Thank you so much for inviting me.');
randomResponse.set(21, 'The stream flows into the pond.');
randomResponse.set(22, 'You are really sensitive, aren\'t you?');
randomResponse.set(23, 'Are you seriously thinking about driving all night?');
randomResponse.set(24, 'Tell me a true story.');
randomResponse.set(25, 'Can you read that sign ahead of us?');
randomResponse.set(26, 'His business was only a partial success.');
randomResponse.set(27, 'Will he come tomorrow?');
randomResponse.set(28, 'He will get nowhere with his plans.');
randomResponse.set(29, 'It is not easy to write a love letter in English.');
randomResponse.set(30, 'When is the best time to feed your dog?');


// this is the bot listener
client.on('message', message => {
    // if the chat message starts with an bang (!)
    if (message.content.substring(0, 1) == '!') {
        // parse the message and get the vbalues between the ! and the space
        var cmd = message.content.substring(1).split(' ')[0];
        // search the commands for a key that matches
        var response = hashMap.get(cmd);

        if(response) {
            // USE THE HASH RESPONSE
        } else if (cmd == 'help') {
            // the keyword help will list the command keys
            var response = 'Try one of these: \n \n !' + hashMap.keys().join('\n !')
        } else {
            // if not a key then grab a random from the random response
            var response = randomResponse.get(getRandomInt(randomResponse.size));
        }
        //write the response value to the channel
        message.reply(response);
     }
});

client.login(process.env.BOT_TOKEN);
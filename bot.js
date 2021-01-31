
const Discord = require('discord.js');
//var Discord = require('discord.io');
var HashMap = require('hashmap');
const client = new Discord.Client();

client.on('ready', () => {
    console.log('I am ready!');
    require("./index.js");
});

// FUNCTION FOR GETTING A RANDOM NUMBER UP TO THE MAX
function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

// LIST OF KEYWORD RESPONSES (QUESTION / ANSWER)
const hashMap = new HashMap();
hashMap.set('chair', "One of the basic pieces of furniture, a chair is a type of seat. Its primary features are two pieces of a durable material, attached as back and seat to one another at a 90° or slightly greater angle, with usually the four corners of the horizontal seat attached in turn to four legs—or other parts of the seat's underside attached to three legs or to a shaft about which a four-arm turnstile on rollers can turn—strong enough to support the weight of a person who sits on the seat (usually wide and broad enough to hold the lower body from the buttocks almost to the knees) and leans against the vertical back (usually high and wide enough to support the back to the shoulder blades). The legs are typically high enough for the seated person's thighs and knees to form a 90° or lesser angle. Used in a number of rooms in homes (e.g. in living rooms, dining rooms, and dens), in schools and offices (with desks), and in various other workplaces, chairs may be made of wood, metal, or synthetic materials, and either the seat alone or the entire chair may be padded or upholstered in various colors and fabrics. Chairs vary in design. An armchair has armrests fixed to the seat; a recliner is upholstered and under its seat is a mechanism that allows one to lower the chair's back and raise into place a fold-out footrest; a rocking chair has legs fixed to two long curved slats; a wheelchair has wheels fixed to an axis under the seat.");
hashMap.set('foo', 'Bar!');
hashMap.set('ping', 'Pong!');
hashMap.set('test', 'Pass!');
hashMap.set('suckmynuts', 'I mean... :flushed:');




// CODE FOR ADDED BACK RANDOM RESPONSES
//const randomResponse = new HashMap();
//randomResponse.set(0, "Get your stinking paws off me you damn dirty ape!");
//randomResponse.set(1, "It's tail time!");

// BOT LISTENER
client.on('message', message => {
    // IF THE CHAT MESSAGE STARTS WITH A BANG (>)
    if (message.content.substring(0, 1) == '>') {
        // PARSE THE MESSAGE AND GET THE VALUES BETWEEN THE BANG AND THE SPACE
        var cmd = message.content.substring(1).split(' ')[0];
        // SEARCH THE COMMAND FOR A KEY THAT MATCHES
        var response = hashMap.get(cmd);
        const exampleEmbed = new Discord.MessageEmbed().setColor('#C0C0C0');

        if(response) {
            // USE THE HASH RESPONSE
        } else if (cmd == 'help') {
            // KEYBWORD HELP WILL LIST THE COMMAND KEYS
            var response = '>' + hashMap.keys().join('\n >')
            exampleEmbed.setTitle('Try one of these...');
        } else if (cmd == 'random') {
            // IF NOT A KEY THEN GRAB A RANDOM FROM THE RESPONSE
            var response = randomResponse.get(getRandomInt(randomResponse.size));
       }
       // WRITE THE RESPONSE VAULE TO THE CHANNEL
       if(response) {
           exampleEmbed.setDescription(response)
           message.channel.send(exampleEmbed);
       }
    }
});

client.login(process.env.BOT_TOKEN);

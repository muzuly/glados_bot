
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
hashMap.set('alfred', "Alfred is Gex's butler and acts as the information provider in Gex 3: Deep Cover Gecko. He is usually found standing around in the Gex Cave, but can also be found in various parts of levels as well. He was voiced by Marc Silk.");
hashMap.set('chair', "One of the basic pieces of furniture, a chair is a type of seat. Its primary features are two pieces of a durable material, attached as back and seat to one another at a 90° or slightly greater angle, with usually the four corners of the horizontal seat attached in turn to four legs—or other parts of the seat's underside attached to three legs or to a shaft about which a four-arm turnstile on rollers can turn—strong enough to support the weight of a person who sits on the seat (usually wide and broad enough to hold the lower body from the buttocks almost to the knees) and leans against the vertical back (usually high and wide enough to support the back to the shoulder blades). The legs are typically high enough for the seated person's thighs and knees to form a 90° or lesser angle. Used in a number of rooms in homes (e.g. in living rooms, dining rooms, and dens), in schools and offices (with desks), and in various other workplaces, chairs may be made of wood, metal, or synthetic materials, and either the seat alone or the entire chair may be padded or upholstered in various colors and fabrics. Chairs vary in design. An armchair has armrests fixed to the seat; a recliner is upholstered and under its seat is a mechanism that allows one to lower the chair's back and raise into place a fold-out footrest; a rocking chair has legs fixed to two long curved slats; a wheelchair has wheels fixed to an axis under the seat.");
hashMap.set('cuz', "Cuz, as his name implies, is Gex's cousin. He is an overweight leopard gecko who wears a Hawaiian shirt. He was captured by the gangsters of 'Gangster TV' on Rez's orders, and placed in a cage on a ship in the harbor. Gex eventually managed to free his cousin as part of a mission in that level, unlocking him for use in the secret levels");
hashMap.set('gex', "Gex the Gecko is the main protagonist of the Gex series. He is addicted to television, lives in Maui and is a secret agent. He is sent to defeat enemies, lead by the main antagonist, Rez.");
hashMap.set('irs', "God! To hell with th IRS! You aren't getting any of my bugs!");
hashMap.set('rex', "Rex is Gex's prehistoric ancestor. He is a small red dinosaur from prehistoric times. Rez froze him in a block of ice inside of a cave in the 'Holiday Broadcasting' level. If Gex goes into the cave and thaws Rex out, he unlocks him as a playable character in the secret missions.");
hashMap.set('xtra', "She is a secret agent, head of the TV Terrorist Defense Unit, and Gex's love interest/partner. She plays a bigger role in Deep Cover Gecko where she is kidnapped by Rez to get to Gex. Throughout the game, Gex constantly flirts with her and she repeatedly turns him down. After Gex rescues her from Rez, she accepts his love.");
hashMap.set('foo', 'Bar!');
hashMap.set('ping', 'Pong!');
hashMap.set('test', 'Pass!');




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
            var response = '>quote/quip/random \n >' + hashMap.keys().join('\n >')
            exampleEmbed.setTitle('Try one of these...');
        } else if (cmd == 'quote') {
            // IF NOT A KEY THEN GRAB A RANDOM FROM THE RESPONSE
            var response = randomResponse.get(getRandomInt(randomResponse.size));
        } else if (cmd == 'quip') {
            // IF NOT A KEY THEN GRAB A RANDOM FROM THE RESPONSE
            var response = randomResponse.get(getRandomInt(randomResponse.size));
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

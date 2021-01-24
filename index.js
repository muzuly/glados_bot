const Discord = require("discord.js");
const client = new Discord.Client();
const parser = new (require('rss-parser'))()

client.db = require("quick.db");

client.config = require("./config.js");

client.on("ready", () => {
    console.log("I'm ready also!");
    checkForUploads();
});

function checkForUploads() {
    if (client.db.fetch('postedVideos') == null) client.db.set('postedVideos', []);
    setInterval(() => {
        const url = "https://www.youtube.com/feeds/videos.xml?channel_id=" + client.config.channel_id;

        parser.parseURL(url, function(err, data) {
            if (client.db.fetch('postedVideos').includes(data.items[0].link)) return;
            else {
                console.log("the bot found a video.");

                client.db.set('videoData', data.items[0]);
                client.db.set('postedVideos', data.items[0].link);
                let channel = client.channels.cache.get(client.config.discord_channel_id);
                let parsed = client.db.fetch('videoData');

                let message = client.config.messageTemplate
                    .replace(/{author}/g, parsed.author)
                    .replace(/{title}/g, Discord.Util.escapeMarkdown(parsed.title))
                    .replace(/{url}/g, parsed.link);
                channel.send(message);
            }

        })
    }, client.config.watchInterval);
}

client.login(process.env.BOT_TOKEN);
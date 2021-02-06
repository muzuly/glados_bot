const Discord = require("discord.js");
const client = new Discord.Client();
const parser = new (require('rss-parser'))()

client.db = require("quick.db");

client.config = require("./config.js");

client.on("ready", () => {
    console.log("YouTube rss function is reading...");
    checkForUploads();
});

function checkForUploads() {
    if (client.db.fetch('postedVideos') == null) client.db.set('postedVideos', []);
    setInterval(() => {
        const url = "https://www.youtube.com/feeds/videos.xml?channel_id=" + client.config.channel_id;

        parser.parseURL(url, function(err, data) {
            channel_feed = data.items;

            if(channel_feed.length < 1 || channel_feed == undefined) {
                console.log('empty or missing feed.')
            } else {
                channel_feed.forEach(function(item) {
                    const recent_post = Date(item.published) <= (new Date() - 300_000)
                    if (!client.db.has(item.id) && recent_post) {
                        console.log("the bot found a new video:" + item.id);
                        client.db.set(item.id, item);

                        let channel = client.channels.cache.get(client.config.discord_channel_id);
                        let message = client.config.messageTemplate
                            .replace(/{author}/g, item.author)
                            .replace(/{title}/g, Discord.Util.escapeMarkdown(item.title))
                            .replace(/{url}/g, item.link);
                        channel.send(message);
                    }
                })
            }
        })
    }, client.config.watchInterval);
}

client.login(process.env.BOT_TOKEN);

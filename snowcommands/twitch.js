const Discord = require("discord.js");
const snow = require("../snow.json");

const fetch = require("snekfetch");

module.exports.run = async (bot, message, args) => {

    let streamer = args[0];
    if(!streamer) return message.channel.send("PLEASE ENTER A TWITCH STREAMER**!**");
    
    fetch.get(`https://api.twitch.tv/kraken/channels/${streamer}?client_id=${process.env.twitchclient}`).then((twitchstreamer) => {
        
        let twitchstatus = twitchstreamer.body.status;
        let twitchurl = twitchstreamer.body.url;
    
        let twitchEmbed = new Discord.RichEmbed()
        .setColor("#6441a5")
        .setAuthor(twitchstreamer.body.display_name, twitchstreamer.body.logo)
        .setThumbnail(twitchstreamer.body.logo)
        .setDescription(`[${twitchstatus}](${twitchurl})`)
        .addField("VIEWS", twitchstreamer.views)
        .addField("FOLLOWERS", twitchstreamer.followers)
        .setFooter("TWITCH | SNOW " + snow.snowflake, bot.user.displayAvatarURL);
        
        message.channel.send(twitchEmbed);
    
    });

}

module.exports.help = {
    name: "twitch"
}

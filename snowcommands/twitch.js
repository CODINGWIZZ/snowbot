const Discord = require("discord.js");
const snow = require("../snow.json");

const fetch = require("snekfetch");

module.exports.run = async (bot, message, args) => {

    let streamer = args[0];
    if(!streamer) return message.channel.send("PLEASE ENTER A TWITCH STREAMER**!**");
    
    fetch.get(`https://api.twitch.tv/kraken/streams/${streamer}?client_id=${process.env.twitchclient}`).then((twitch) => {
    
        let twitchEmbed = new Discord.RichEmbed()
        .setColor("#6441a5")
        .setAuthor(twitch.display_name, twitch.logo)
        .setThumbnail(twitch.logo)
        .setDescription(`[${twitch.status}](${twitch.url}`))
        .setFooter("TWITCH | SNOW " + snow.snowflake, bot.user.displayAvatarURL);
        
        message.channel.send(twitchEmbed);
    
    });

}

module.exports.help = {
    name: "twitch"
}

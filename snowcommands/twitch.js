const Discord = require("discord.js");
const snow = require("../snow.json");

const fetch = require("snekfetch");

module.exports.run = async (bot, message, args) => {

    let streamer = args[0];
    if(!streamer) return message.channel.send("PLEASE ENTER A TWITCH STREAMER**!**");

    fetch.get(`https://api.twitch.tv/kraken/streams/${streamer}?client_id=${process.env.twitchclient}`).then((twitchstreamer) => {
        
        if(twitchstreamer.body.stream === null) {
        
            return message.channel.send("THIS STREAMER IS NOT STREAMING RIGHT NOW**!**");   
         
        }

        let twitchstatus = twitchstreamer.body.stream.channel.status;
        let twitchurl = twitchstreamer.body.stream.channel.url;
        
        let imageURL = `https://static-cdn.jtvnw.net/previews-ttv/live_user_${streamer.toLowerCase()}-320x180.jpg`;
        

        let twitchEmbed = new Discord.RichEmbed()
        .setColor(snow.blue)
        .setAuthor(twitchstreamer.body.stream.channel.display_name, twitchstreamer.body.stream.channel.logo)
        .setThumbnail(twitchstreamer.body.stream.channel.logo)
        .setURL(twitchurl)
        .setDescription(`[**${twitchstatus}**](${twitchurl})`)
        .addField("GAME", twitchstreamer.body.stream.game, true)
        .addField("VIEWERS", twitchstreamer.body.stream.viewers, true)
        .setImage(imageURL)
        .setFooter(`FOLLOWERS: ${twitchstreamer.body.stream.channel.followers} // TOTAL VIEWS: ${twitchstreamer.body.stream.channel.views}`, bot.user.displayAvatarURL);
        
        message.channel.send(twitchEmbed);

    });

}

module.exports.help = {
    name: "twitch"
}

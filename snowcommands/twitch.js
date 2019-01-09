const Discord = require("discord.js");
const snow = require("../snow.json");

const fetch = require("snekfetch");

module.exports.run = async (bot, message, args) => {

    let streamer = args[0];
    if(!streamer) return message.channel.send("PLEASE ENTER A TWITCH STREAMER**!**");
    
    fetch.get(`https://api.twitch.tv/kraken/streams/${streamer}?client_id=${process.env.twitchclient}`).then((twitchstreamer) => {
        
        let twitchstatus = twitchstreamer.body.status;
        let twitchurl = twitchstreamer.body.url;
        
        let imageURL = `https://static-cdn.jtvnw.net/previews-ttv/live_user_${streamer.toLowerCase()}-640x360.jpg`;
    
        let twitchEmbed = new Discord.RichEmbed()
        .setColor("#6441a5")
        .setAuthor(twitchstreamer.body.display_name, twitchstreamer.body.logo)
        .setThumbnail(twitchstreamer.body.logo)
        .setURL(twitchstreamer.body.url)
        .setDescription(`[${twitchstatus}](${twitchurl})\n\n**GAME:** ${twitchstreamer.body.game}`)
        .setImage(imageURL)
        .setFooter(`TOTAL VIEWS: ${twitchstreamer.body.views} // FOLLOWERS: ${twitchstreamer.body.followers}`, bot.user.displayAvatarURL);
        
        if(twitchstreamer.body.stream_type === "Live") {
            
            message.channel.send(twitchEmbed);
            
        } else {
         
            return message.channel.send("THAT STREAMER IS NOT LIVE**!**");
            
        }
    
    });

}

module.exports.help = {
    name: "twitch"
}

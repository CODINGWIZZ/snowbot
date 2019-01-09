const Discord = require("discord.js");
const snow = require("../snow.json");

const fetch = require("snekfetch");

module.exports.run = async (bot, message, args) => {

    let streamer = args[0];
    if(!streamer) return message.channel.send("PLEASE ENTER A TWITCH STREAMER**!**");
    
    fetch.get(`https://api.twitch.tv/kraken/streams/${streamer}?client_id=${process.env.twitchclient}`).then((twitchstreamer) => {
        
        let twitchstatus = twitchstreamer.stream.status;
        let twitchurl = twitchstreamer.stream.url;
        
        let imageURL = `https://static-cdn.jtvnw.net/previews-ttv/live_user_${streamer.toLowerCase()}-640x360.jpg`;
    
        let twitchEmbed = new Discord.RichEmbed()
        .setColor("#6441a5")
        .setAuthor(twitchstreamer.stream.display_name, twitchstreamer.stream.logo)
        .setThumbnail(twitchstreamer.stream.logo)
        .setURL(twitchstreamer.stream.url)
        .setDescription(`[${twitchstatus}](${twitchurl})\n\n**GAME:** ${twitchstreamer.stream.game}`)
        .setImage(imageURL)
        .setFooter(`TOTAL VIEWS: ${twitchstreamer.stream.views} // FOLLOWERS: ${twitchstreamer.stream.followers}`, bot.user.displayAvatarURL);
        
        message.channel.send(twitchEmbed);
        
//         if(twitchstreamer.body.stream_type !== "live") {
  
//             message.channel.send("THAT STREAMER IS NOT LIVE**!**");
            
//         } else {
      
//             message.channel.send(twitchEmbed);
            
//         };
    
    });

}

module.exports.help = {
    name: "twitch"
}

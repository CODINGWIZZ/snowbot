const Discord = require("discord.js");
const snow = require("../snow.json");

const fetch = require("snekfetch");

module.exports.run = async (bot, message, args) => {

    let streamer = args[0];
    if(!streamer) return message.channel.send("PLEASE ENTER A TWITCH STREAMER**!**");
    
    fetch.get(`https://api.twitch.tv/kraken/streams/${streamer}?client_id=${process.env.twitchclient}`).then((twitchstreamer) => {
        
        let twitchstatus = twitchstreamer.stream.body.status;
        let twitchurl = twitchstreamer.stream.body.url;
        
        let imageURL = `https://static-cdn.jtvnw.net/previews-ttv/live_user_${streamer.toLowerCase()}-320x180.jpg`;
    
        let twitchEmbed = new Discord.RichEmbed()
        .setColor("#6441a5")
        .setAuthor(twitchstreamer.stream.body.display_name, twitchstreamer.stream.body.logo)
        .setThumbnail(twitchstreamer.stream.body.logo)
        .setURL(twitchstreamer.stream.body.url)
        .setDescription(`[${twitchstatus}](${twitchurl})\n\n**GAME:** ${twitchstreamer.stream.body.game}`)
        .setImage(imageURL)
        .setFooter(`TOTAL VIEWS: ${twitchstreamer.stream.body.views} // FOLLOWERS: ${twitchstreamer.stream.body.followers}`, bot.user.displayAvatarURL);
        
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

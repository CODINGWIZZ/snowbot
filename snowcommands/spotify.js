const Discord = require("discord.js");
const snow = require("../snow.json");

module.exports.run = async (bot, message, args) => {

    let spotifyuser = message.mentions.users.first() || message.author;
    
    if(spotifyuser.presence.activity !== null && spotifyuser.presence.activity.type === "LISTENING" && spotifyuser.presence.activity.name === "Spotify" && spotifyuser.presence.activity.assets !== null) {
    
        let songimage = `https://i.scdn.co/image/${spotifyuser.presence.activity.assets.largeImage.slice(8)}`;
        let songurl = `https://open.spotify.com/track/${spotifyuser.presence.activity.syndID}`;
        let songname = user.presence.activity.detail;
        let songartist = user.presence.activity.state;
        let songalbum = user.presence.activity.assets.largeText;
        
        let spotifyEmbed = new Discord.RichEmbed()
        .setColor(snow.blue)
        .setAuthor("SPOTIFY " + snow.snowflake, songimage)
        .setDescription("**" + songname + "**")
        .addField("ARTIST", songartist)
        .addField("ALBUM", songalbum)
        .addField("URL", songurl)
        .setFooter("SPOTIFY | SNOW " + snow.snowflake, bot.user.displayAvatarURL);
        
        message.channel.send(spotifyEmbed);
    
    } else {
        
        return message.channel.send("THIS USER IS NOT LISTENING TO SPOTIFY**!**");
        
    }

}

module.exports.help = {
    name: "spotify"
}

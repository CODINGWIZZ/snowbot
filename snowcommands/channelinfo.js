const Discord = require("discord.js");
const snow = require("../snow.json");

module.exports.run = async(bot, message, args) => {

    let channel = message.mentions.channels.first() || message.channel;
    
    let channeltype = "";
    
    if(channel.guild.channels.filter(tc => tc.type === "text")) {
    
        channeltype = "TEXT";
    
    } else if(channel.guild.channels.filter(vc => vc.type === "voice")) {
    
        channeltype = "VOICE";
    
    }
    
    let channelEmbed = new Discord.RichEmbed()
    .setColor(snow.blue)
    .setDescription("CHANNELINFO **" + snow.snowflake + "**\n" + channel)
    .addField("CHANNELTYPE", channeltype, true)
    .addField("ID", channel.id, true)
    .addField("CREATED", channel.createdAt.toDateString().toUpperCase())
    .setFooter("CHANNELINFO | SNOW " + snow.snowflake, bot.user.displayAvatarURL);
    
    message.channel.send(channelEmbed);

}

module.exports.help = {
    name: "channelinfo"
}

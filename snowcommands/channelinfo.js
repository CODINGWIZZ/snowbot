const Discord = require("discord.js");
const snow = require("../snow.json");

module.exports.run = async(bot, message, args) => {

    let channel = message.mentions.channels.first() || message.channel;
    
    let channeltype = "";
    
    if(channel.filter(tc => tc.type === "text")) {
    
        channeltype = "TEXT";
    
    } else if(channel.filter(vc => vc.type === "voice")) {
    
        channeltype = "VOICE";
    
    }
    
    let textchannel = channel.channels.filter(tc => tc.type === "text");
    let voicechannel = channel.channels.filter(vc => vc.type === "")
    
    let channelEmbed = new Discord.RichEmbed()
    .setColor(snow.blue)
    .setDescription("CHANNELINFO **" + snow.snowflake + "**\n" + channel)
    .addField("CHANNELTYPE", channeltype)
    .addField("ID", channel.id)
    .addField("CREATED", channel.createdAt.toDateString().toUpperCase())
    .setFooter("CHANNELINFO | SNOW " + snow.snowflake, bot.user.displayAvatarURL);
    
    message.channel.send(channelEmbed);

}

module.exports.help = {
    name: "channelinfo"
}

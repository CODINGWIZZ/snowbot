const Discord = require("discord.js");
const snow = require("../snow.json");

module.exports.run = async(bot, message, args) => {

    let voicechannel = message.member.voiceChannel;
    if(!voicechannel) return message.channel.send("YOU ARE NOT IN A VOICECHANNEL**!**");

    if(!message.guild.me.voiceChannel) return message.channel.send("SNOW IS NOT CONNECTED TO ANY VOICECHANNEL ON THIS SERVER**!**");

    if(message.guild.me.voiceChannelID !== message.member.voiceChannelID) return message.channel.send("YOU ARE NOT CONNECTED TO THE SAME VOICECHANNEL AS SNOW**!**");

    voicechannel.leave();
    message.channel.send("LEFT **" + voicechannel.name + "!**");

}

module.exports.help = {
    name: "snowleave"
}

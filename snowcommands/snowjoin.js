const Discord = require("discord.js");
const snow = require("../snow.json");

module.exports.run = async(bot, message, args) => {

    let voicechannel = message.member.voiceChannel;
    if(!voicechannel) return message.channel.send("PLEASE CONNECT TO A VOICECHANNEL**!**");

    if(message.guild.me.voiceChannel) return message.channel.send("SNOW IS ALREADY CONNECTED TO A VOICE CHANNEL IN THIS SERVER**!**");

    voicechannel.join();
    message.channel.send("JOINED **" + voicechannel.name + "!**");

}

module.exports.help = {
    name: "snowjoin"
}

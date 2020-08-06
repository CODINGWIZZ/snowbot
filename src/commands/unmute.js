const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {

    const snow = require("../../config/snow.json");

    if(!message.member.hasPermission("MUTE_MEMBERS")) return message.channel.send("YOU DON'T HAVE PERMISSIONS TO DO THAT**!**");

    if(!args[0]) return message.channel.send("PLEASE MENTION A USER YOU WANT TO UNMUTE**!**");

    let umUser = message.guild.member(bot.users.find(user => user.id === args[0]) || message.mentions.members.first() || message.guild.members.get(args[0]) || bot.users.find(user => user.username.toLowerCase() === args[0].toLowerCase()));
    if(!umUser) return message.channel.send("CAN'T FIND USER**!**");

    let snowbot = message.guild.member(bot.users.find(user => user.id === "417210018576990208"));

    if(umUser.id === message.author.id) return message.channel.send("YOU CAN'T USE THIS COMMAND ON YOURSELF**!**");

    if(umUser.highestRole.position >= snowbot.highestRole.position) return message.channel.send("SNOW MUST HAVE A HIGHER OR THE SAME ROLE AS THE MEMBER YOU WANT TO UNMUTE**!**");

    let unmuterole = message.guild.roles.find(r => r.name === "MUTED");

    if(!unmuterole || !umUser.roles.has(unmuterole.id)) return message.channel.send("THIS USER IS NOT MUTED**!**");

    await(umUser.removeRole(unmuterole.id));
    message.channel.send(`${umUser} HAS BEEN UNMUTED**!**`);

    let unmuteEmbed = new Discord.RichEmbed()
    .setColor(snow.blue)
    .setTimestamp()
    .setDescription("UNMUTE **" + snow.snowflake + "**")
    .addField("USER", umUser)
    .addField("MODERATOR", message.author)
    .addField("CHANNEL", message.channel)
    .setFooter("SNOW " + snow.snowflake, bot.user.displayAvatarURL);

    let snowlog = message.guild.channels.find(channel => channel.name === "snow");
    if(!snowlog) return;

    snowlog.send(unmuteEmbed);

}   

module.exports.config = {
    name: "unmute",
    usage: "s!unmute < USER >",
    permission: "MUTE_MEMBERS",
    aliases: "NONE"
}

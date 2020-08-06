const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {

    const snow = require("../../config/snow.json");

    if(!message.member.hasPermission("DEAFEN_MEMBERS")) return message.channel.send("YOU DON'T HAVE PERMISSIONS TO DO THAT**!**");

    if(!args[0]) return message.channel.send("PLEASE MENTION A USER YOU WANT TO UNDEAFEN**!**");

    let udUser = message.guild.member(bot.users.find(user => user.id === args[0]) || message.mentions.members.first() || message.guild.members.get(args[0]) || bot.users.find(user => user.username.toLowerCase() === args[0].toLowerCase()));
    if(!udUser) return message.channel.send("CAN'T FIND USER**!**");

    let snowbot = message.guild.member(bot.users.find(user => user.id === "417210018576990208"));

    if(udUser.id === message.author.id) return message.channel.send("YOU CAN'T USE THIS COMMAND ON YOURSELF**!**");

    if(udUser.highestRole.position >= snowbot.highestRole.position) return message.channel.send("SNOW MUST HAVE A HIGHER OR THE SAME ROLE AS THE MEMBER YOU WANT TO UNDEAFEN**!**");

    let undeafenrole = message.guild.roles.find(r => r.name === "DEAFENED");

    if(!undeafenrole || !udUser.roles.has(undeafenrole.id)) return message.channel.send("THIS USER IS NOT DEAFENED**!**");

    await(udUser.removeRole(undeafenrole.id));
    message.channel.send(`${udUser} HAS BEEN UNDEAFENED**!**`);

    let undeafenEmbed = new Discord.RichEmbed()
    .setColor(snow.blue)
    .setTimestamp()
    .setDescription("UNDEAFEN **" + snow.snowflake + "**")
    .addField("USER", udUser)
    .addField("MODERATOR", message.author)
    .addField("CHANNEL", message.channel)
    .setFooter("SNOW " + snow.snowflake, bot.user.displayAvatarURL);

    let snowlog = message.guild.channels.find(channel => channel.name === "snow");
    if(!snowlog) return;

    snowlog.send(undeafenEmbed);

}

module.exports.config = {
    name: "undeafen",
    usage: "s!undeafen < USER >",
    permission: "DEAFEN_MEMBERS",
    aliases: "NONE"
}

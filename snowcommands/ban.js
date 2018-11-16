const Discord = require("discord.js");
const snow = require("../snow.json");

let prefix = snow.prefix;

module.exports.run = async (bot, message, args) => {

    if(!message.member.hasPermission("BAN_MEMBERS")) return message.channel.send("YOU DO NOT HAVE PERMISSIONS TO DO THAT**!**");

    if(!args[0]) return message.channel.send("PLEASE MENTION A USER THAT YOU WANT TO BAN AND THEN A REASON**!**");

    let bUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
    if(!bUser) return message.channel.send("CAN'T FIND USER**!**");
    
    if(bUser.id === message.author.id) return message.channel.send("YOU CAN NOT BAN YOURSELF**!**");
    if(bUser.hasPermission("MANAGE_MESSAGES")) return message.channel.send("THAT USER CAN'T BE BANNED**!**");
    let banreason = args.slice(1).join(" ");
    if(!banreason) return message.channek.send("PLEASE INCLUDE A REASON FOR THE BAN**!**");
    if(bUser.highestRole.position >= message.member.highestRole.position) return message.channel.send("YOU CAN NOT DEAFEN A MEMBER WHO HAS A HIGHER OR THE SAME ROLE AS YOU**!**");

    message.guild.member(bUser).ban(banreason);
    message.channel.send(`${bUser} HAS BEEN **BANNED** BY ${message.author} BECAUSE**: ${banreason}**`);

    let banEmbed = new Discord.RichEmbed()
    .setColor(snow.blue)
    .setTimestamp()
    .setDescription("BAN **" + snow.snowflake + "**")
    .addField("USER", bUser)
    .addField("MODERATOR", message.author)
    .addField("CHANNEL", message.channel)
    .addField("REASON", banreason)
    .setFooter("SNOW " + snow.snowflake, bot.user.displayAvatarURL);

    let snowlog = message.guild.channels.find(`name`, "snow");
    if(!snowlog) return;

    snowlog.send(banEmbed);

}

module.exports.help = {
    name: "ban"
}

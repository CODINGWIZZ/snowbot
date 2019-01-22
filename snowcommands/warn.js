const Discord = require("discord.js");
const snow = require("../snow.json");

module.exports.run = async (bot, message, args) => {

    if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send("YOU DO NOT HAVE PERMISSIONS TO DO THAT**!**");

    if(!args[0]) return message.channel.send("PLEASE MENTION A USER YOU WANT TO WARN AND THEN A REASON**!**");

    let wUser = message.guild.member(message.mentions.users.first() ||message.guild.member.get(args[0]));
    if(!wUser) return message.channel.send("CAN'T FIND USER**!**");

    if(wUser.id === message.author.id) return message.channel.send("YOU CAN NOT WARN YOURSELF**!**");
    if(wUser.hasPermission("MANAGE_MESSAGES")) return message.channel.send("THAT USER CAN'T BE WARNED**!**");

    let warnreason = args.slice(1).join(" ");
    if(!warnreason) return message.channel.send("PLEASE INCLUDE A REASON FOR THE WARN**!**");
    
    message.channel.send(`${wUser} HAS BEEN **WARNED** BECAUSE: **${warnreason}!**`);

    let warnuserEmbed = new Discord.RichEmbed()
    .setColor(snow.blue)
    .setTimestamp()
    .setDescription("WARN **" + snow.snowflake + "**\n YOU'VE BEEN WARNED IN **" + message.guild.name + "!**")
    .addField("REASON", warnreason)
    .setFooter("SNOW " + snow.snowflake, bot.user.displayAvatarURL);

    wUser.send(warnuserEmbed);

    let warnEmbed = new Discord.RichEmbed()
    .setColor(snow.blue)
    .setTimestamp()
    .setDescription("WARN **" + snow.snowflake + "**")
    .addField("USER", wUser)
    .addField("MODERATOR", message.author)
    .addField("CHANNEL", message.channel)
    .addField("REASON", warnreason)
    .setFooter("SNOW " + snow.snowflake, bot.user.displayAvatarURL);

    let snowlog = message.guild.channels.find(`name`, "snow");
    if(!snowlog) return;

    snowlog.send(warnEmbed);

}

module.exports.help = {
    name: "warn"
}

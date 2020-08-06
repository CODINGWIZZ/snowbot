const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {
    
    const snow = require("../../config/snow.json");
    
    if(!message.member.hasPermission("KICK_MEMBERS")) return message.channel.send("YOU DON'T HAVE PERMISSIONS TO DO THAT**!**");
    
    if(!args[0]) return message.channel.send("PLEASE MENTION A USER THAT YOU WANT TO KICK AND THEN A REASON**!**");

    let kUser = message.guild.member(bot.users.find(user => user.id === args[0]) || message.mentions.users.first() || message.guild.member.get(args[0]) || bot.users.find(user => user.username.toLowerCase() === args[0].toLowerCase()));
    if(!kUser) return message.channel.send("CAN'T FIND USER**!**");
    
    if(kUser.id === message.author.id) return message.channel.send("YOU CAN'T KICK YOURSELF**!**");

    let snowbot = message.guild.member(bot.users.find(user => user.id === "417210018576990208"));

    if(kUser.highestRole.position >= snowbot.highestRole.position) return message.channel.send("SNOW MUST HAVE A HIGHER OR THE SAME ROLE AS THE MEMBER YOU WANT TO KICK**!**");

    if(kUser.kickable === false) return message.channel.send("THIS USER CAN'T BE KICKED**!**");

    let kickreason = args.slice(1).join(" ").replace(/\*/g, "");
    if(!kickreason) return message.channel.send("PLEASE INCLUDE A REASON FOR THE KICK**!**");

    message.guild.member(kUser).kick(kickreason);
    message.channel.send(`${kUser} HAS BEEN KICKED BECAUSE: ` + "**\"" + kickreason + "\"!**");

    let kickEmbed = new Discord.RichEmbed()
    .setColor(snow.blue)
    .setTimestamp()
    .setDescription("KICK **" + snow.snowflake + "**")
    .addField("USER", kUser)
    .addField("MODERATOR", message.author)
    .addField("CHANNEL", message.channel)
    .addField("REASON", kickreason)
    .setFooter("SNOW " + snow.snowflake, bot.user.displayAvatarURL);

    let snowlog = message.guild.channels.find(channel => channel.name === "snow");
    if(!snowlog) return;

    snowlog.send(kickEmbed);

}

module.exports.config = {
    name: "kick",
    usage: "s!kick < USER > < REASON >",
    permission: "KICK_MEMBERS",
    aliases: "NONE"
}

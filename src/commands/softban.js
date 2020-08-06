const Discord = require("discord.js");	

module.exports.run = async (bot, message, args) => {
    
    const snow = require("../../config/snow.json");	

    if(!message.member.hasPermission("BAN_MEMBERS")) return message.channel.send("YOU DON'T HAVE PERMISSIONS TO DO THAT**!**");
    if(!args[0]) return message.channel.send("PLEASE MENTION A USER THAT YOU WANT TO SOFTBAN AND THEN A REASON**!**");	

    let sbUser = message.guild.member(bot.users.find(user => user.id === args[0]) || message.mentions.users.first() || message.guild.members.get(args[0]) || bot.users.find(user => user.username.toLowerCase() === args[0].toLowerCase()));	
    if(!sbUser) return message.channel.send("CAN'T FIND USER**!**");	

    if(sbUser.id === message.author.id) return message.channel.send("YOU CAN'T SOFTBAN YOURSELF**!**");

    let snowbot = message.guild.member(bot.users.find(user => user.id === "417210018576990208"));

    if(sbUser.highestRole.position >= snowbot.highestRole.position) return message.channel.send("SNOW MUST HAVE A HIGHER OR THE SAME ROLE AS THE MEMBER YOU WANT TO SOFTBAN**!**");

    if(sbUser.bannable === false) return message.channel.send("THIS USER CAN'T BE SOFTBANNED**!**");

    let softbanreason = args.slice(1).join(" ").replace(/\*/g, "");	
    if(!softbanreason) return message.channek.send("PLEASE INCLUDE A REASON FOR THE SOFTBAN**!**");	
    
    message.guild.member(sbUser).ban(softbanreason).then(() => message.guild.unban(sbUser.id))	
    message.channel.send(`${sbUser} HAS BEEN SOFTBANNED BECAUSE: ` + "**\"" + softbanreason + "\"!**");	

    let softbanEmbed = new Discord.RichEmbed()	
    .setColor(snow.blue)	
    .setTimestamp()	
    .setDescription("SOFTBAN **" + snow.snowflake + "**")	
    .addField("USER", sbUser)	
    .addField("MODERATOR", message.author)	
    .addField("CHANNEL", message.channel)	
    .addField("REASON", softbanreason)	
    .setFooter("SNOW " + snow.snowflake, bot.user.displayAvatarURL);	

    let snowlog = message.guild.channels.find(channel => channel.name === "snow");
    if(!snowlog) return;	

    snowlog.send(softbanEmbed);
    
}

module.exports.config = {	
    name: "softban",
    usage: "s!softban < USER > < REASON >",
    permission: "BAN_MEMBERS",
    aliases: "NONE"
}

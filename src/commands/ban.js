const Discord = require("discord.js");	

module.exports.run = async (bot, message, args) => {

    const snow = require("../../config/snow.json");	
    
    if(!message.member.hasPermission("BAN_MEMBERS")) return message.channel.send("YOU DON'T HAVE PERMISSIONS TO DO THAT**!**");
    if(!args[0]) return message.channel.send("PLEASE MENTION A USER THAT YOU WANT TO BAN AND THEN A REASON**!**");	

    let bUser = message.guild.member(bot.users.find(user => user.id === args[0]) || message.mentions.users.first() || message.guild.members.get(args[0]) || bot.users.find(user => user.username.toLowerCase() === args[0].toLowerCase()));	
    if(!bUser) return message.channel.send("CAN'T FIND USER**!**");	

    if(bUser.id === message.author.id) return message.channel.send("YOU CAN'T BAN YOURSELF**!**");

    let snowbot = message.guild.member(bot.users.find(user => user.id === "417210018576990208"));

    if(bUser.highestRole.position >= snowbot.highestRole.position) return message.channel.send("SNOW MUST HAVE A HIGHER OR THE SAME ROLE AS THE MEMBER YOU WANT TO BAN**!**");

    if(bUser.bannable === false) return message.channel.send("THIS USER CAN'T BE BANNED**!**");
	
    let banreason = args.slice(1).join(" ").replace(/\*/g, "");	
    if(!banreason) return message.channek.send("PLEASE INCLUDE A REASON FOR THE BAN**!**");

    message.guild.member(bUser).ban(banreason);	
    message.channel.send(`${bUser} HAS BEEN BANNED BECAUSE: ` + "**\"" + banreason + "\"!**");	

    let banEmbed = new Discord.RichEmbed()	
    .setColor(snow.blue)	
    .setTimestamp()	
    .setDescription("BAN **" + snow.snowflake + "**")	
    .addField("USER", bUser)	
    .addField("MODERATOR", message.author)	
    .addField("CHANNEL", message.channel)	
    .addField("REASON", banreason)	
    .setFooter("SNOW " + snow.snowflake, bot.user.displayAvatarURL);	

    let snowlog = message.guild.channels.find(channel => channel.name === "snow");
    if(!snowlog) return;	

    snowlog.send(banEmbed);
    
}

module.exports.config = {	
    name: "ban",
    usage: "s!ban < USER > < REASON >",
    permission: "BAN_MEMBERS",
    aliases: "NONE"
}

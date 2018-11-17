const Discord = require("discord.js");
const snow = require("../snow.json");

module.exports.run = async (bot, message, args) => {

    if(!message.member.hasPermission("BAN_MEMBERS")) return message.channel.send("YOU DO NOT HAVE PERMISSIONS TO DO THAT**!**");
    
    let user = args[0];
    if(!user) return message.channel.send("PLEASE ENTER A USER RESOLVABLE, LIKE A ID OF THE USER YOU WANT TO UNBAN AND THEN A REASON**!**");
    
    if(userid === message.author.id) return message.channel.send("YOU CAN'T UNBAN YOURSELF FROM A SERVER THAT YOU ALREADY ARE IN**!**");
    
    let unbanreason = args.slice(1).join(" ");
    if(!unbanreason) return message.channel.send("PLEASE ENTER A REASON FOR THE UNBAN**!**");
    
    message.guild.unban(user).then((unbanuser) => {
       
        message.channel.send("**" + unbanuser.username + "**#" + unbanuser.discriminator + " HAS BEEN **UNBANNED** FROM **" + message.guild.name + "!**");
        
        let unbanEmbed = new Discord.RichEmbed()
        .setColor(snow.blue)
        .setDescription("UNBAN **" + snow.snowflake + "**")
        .addField("USER", unbanuser + " **// " + unbanuser.username + "**#" + unbanuser.discriminator)
        .addField("MODERATOR", message.author)
        .addField("CHANNEL", message.channel)
        .addField("REASON", unbanreason)
        .setFooter("SNOW " + snow.snowflake, bot.user.displayAvatarURL);
        
        let snowlog = message.guild.channels.find(`name`, "snow");
        if(!snowlog) return;
        
        snowlog.send(unbanEmbed);
        
    });
    
}

module.exports.help = {
    name: "unban"
}

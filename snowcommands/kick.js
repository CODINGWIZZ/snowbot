const Discord = require("discord.js");
const snow = require("../snow.json");

module.exports.run = async (bot, message, args) => {

    let prefix = snow.prefix;
    let messageArray = message.content.split(" ");
    let cmd = messageArray[0].toLocaleLowerCase();

    if(cmd === `${prefix}kick`) {

        if(!message.member.hasPermission("KICK_MEMBERS")) return message.channel.send("YOU DO NOT HAVE PERMISSIONS TO DO THAT**!**");

        if(!args[0]) return message.channel.send("PLEASE MENTION A USER THAT YOU WANT TO KICK**!**");
    
        let kUser = message.guild.member(message.mentions.users.first() || message.guild.member.get(args[0]));
        if(!kUser) return message.channel.send("CAN'T FIND USER**!**");
        if(kUser.id === message.author.id) return message.channel.send("YOU CAN NOT KICK YOURSELF**!**");
        if(kUser.hasPermission("MANAGE_MESSAGES")) return message.channel.send("THIS USER CAN'T BE KICKED**!**");
    
        let kickreason = args.slice(1).join(" ");
        if(!kickreason) return message.channel.send("PLEASE INCLUDE A REASON FOR THE KICK**!**");
        
        message.guild.member(kUser).kick(kickreason);
        message.channel.send(`${kUser} HAS BEEN **KICKED** BY ${message.author} BECAUSE**: ${kickreason}!**`);
    
        let kickEmbed = new Discord.RichEmbed()
        .setColor(snow.blue)
        .setDescription("KICK **❆**")
        .addField("USER", kUser)
        .addField("MODERATOR", message.author)
        .addField("CHANNEL", message.channel)
        .addField("REASON", kickreason)
        .setFooter("SNOW ❆", bot.user.displayAvatarURL);
    
        let snowlog = message.guild.channels.find(`name`, "snow");
        if(!snowlog) return;
    
        snowlog.send(kickEmbed);

    }

}

module.exports.help = {
    name: "kick"
}

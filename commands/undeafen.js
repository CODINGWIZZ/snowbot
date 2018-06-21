const Discord = require("discord.js");
const botconfig = require("../botconfig.json");

module.exports.run = async (bot, message, args) => {

  let prefix = botconfig.prefix;
  let messageArray = message.content.split(" ");
  let cmd = messageArray[0].toLocaleLowerCase();
  
      // UNDEAFEN COMMAND
    if(cmd === `${prefix}undeafen`) {
        if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send("YOU DO NOT HAVE PERMISSIONS TO DO THAT**!**")

        let udUser = message.guild.member(message.mentions.members.first()) || message.guild.members.get(args[0]);
           if(!args[0]) return message.channel.send("PLEASE MENTION A USER THAT YOU WANT TO UNDEAFEN*!**");
        if(!udUser) return message.channel.send("CAN'T FIND THAT USER**!**");

        let role = message.guild.roles.find(r => r.name === "DEAFENED // ❆");

        if(!role || !toMute.roles.has(role.id)) return message.channel.send("THIS USER IS NOT DEAFENED**!**");

        await(udUser.removeRole(role.id));        
        message.channel.send(`<:SNOWCHECK:459111379899514887> **//** ${udUser} HAS BEEN **UNDEAFENED!**`);

        let undeafenembed = new Discord.RichEmbed()
        .setColor(botconfig.blue)
        .setTitle("UNDEAFEN ❆")
        .addField("USER", udUser)
        .addField("MODERATOR", message.author)
        .addField("CHANNEL", message.channel)
        .setFooter("SNOW ❆", bot.user.displayAvatarURL);

        let snowlog = message.guild.channels.find(`name`, "snow");
        if(!snowlog) return;

        snowlog.send(undeafenchannel);

        return;
        
    }

  
}

module.exports.help = {
  name: "undeafen"
} 

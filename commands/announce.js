const Discord = require("discord.js");
const botconfig = require("../botconfig.json");

module.exports.run = async (bot, message, args) => {
  
    let prefix = botconfig.prefix;
    let messageArray = message.content.split(" ");
    let cmd = messageArray[0].toLocaleLowerCase();
    
    // ANNOUNCE COMMAND
    if(cmd === `${prefix}announce`) {

    if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send("YOU DO NOT HAVE PERMISSIONS TO DO THAT**!**");
    let announcechannel = message.mentions.channels.first();
    if(!announcechannel) return message.channel.send("PLEASE MENTION A CHANNEL AND THEN THE ANNOUNCE MESSAGE**!**");

    let announce = args.slice(1).join(" ");
    if(!args[1]) return message.channel.send("PLEASE ENTER A MESSAGE YOU WANT TO ANNOUCE**!**");

    let announceEmbed = new Discord.RichEmbed()
    .setColor(botconfig.blue)
    .setDescription(announce + "\n\n **(** ANNOUNCEMENT BY **" + message.author.username + " )**")
    .setTimestamp()
    .setFooter("ANNOUNCE | SNOW ❆", bot.user.displayAvatarURL);

    announcechannel.send(announceEmbed);
        
    return message.channel.send("**FINISHED!**\nTHE ANNOUNCEMESSAGE HAS BEEN SENT TO " + announcechannel + "**!**").then(announcemessage => announcemessage.delete(5000));
           
  }
  
}

module.exports.help = {
  name: "announce"
}

const Discord = require("discord.js");
const snow = require("../snow.json");

module.exports.run = async (bot, message, args) => {

    let prefix = snow.prefix;
    let messageArray = message.content.split(" ");
    let cmd = messageArray[0].toLocaleLowerCase();

    if(cmd === `${prefix}announce`) {

        if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send("YOU DO NOT HAVE PERMISSIONS TO DO THAT**!**");
    
        let announcechannel = message.mentions.channels.first();
        if(!announcechannel) return message.channel.send("PLEASE MENTION A CHANNEL AND THE THE MESSAGE YOU WANT TO ANNOUNCE**!**");

        let announce = args.slice(1).join(" ");
        if(!announce) return message.channel.send("PLEASE ENTER A MESSAGE THAT YOU WANT TO ANNOUNCE**!**");

        let announceEmbed = new Discord.RichEmbed()
        .setColor(snow.blue)
        .setTimestamp()
        .setDescription(announce + "\n\n **(** ANNOUNCEMENT BY **" + message.author.username + " )**")
        .setFooter("ANNOUNCE | SNOW ❆", bot.user.displayAvatarURL);

        announcechannel.send(announceEmbed);

    }

}

module.exports.help = {
    name: "announce"
}

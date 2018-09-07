const Discord = require("discord.js");
const snow = require("../snow.json");

let prefix = snow.prefix;

module.exports.run = async (bot, message, args) => {

    if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send("YOU DO NOT HAVE PERMISSIONS TO DO THAT**!**");

    let annoucechannel = message.mentions.channels.first();
    if(!annoucechannel) return message.channel.send("PLEASE MENTION A CHANNEL AND THEN THE MESSAGE YOU WANT TO ANNOUNCE**!**");

    let announce = args.slice(1).join(" ");
    if(!announce) return message.channel.send("PLEASE ENTER A MESSAGE YOU WANT TO ANNOUNCE**!**");

    let announceEmbed = new Discord.RichEmbed()
    .setColor(snow.blue)
    .setTimestamp()
    .setDescription(annouce + "\n\n **(** ANNOUNCEMENT BY **" + message.author.username + " )**")
    .setFooter("ANNOUNCE | SNOW " + snow.snowflake, bot.user.displayAvatarURL);

    annoucechannel.send(announceEmbed);

}

module.exports.help = {
    name: "announce"
}

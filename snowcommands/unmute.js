const Discord = require("discord.js");
const snow = require("../snow.json");

let prefix = snow.prefix;

module.exports.run = async (bot, message, args) => {

    if(!message.member.hasPermission("MUTE_MEMBERS")) return message.channel.send("YOU DO NOT HAVE PERMISSIONS TO DO THAT**!**");

    if(!args[0]) return message.channel.send("PLEASE MENTION A USER YOU WANT TO UNMUTE**!**");

    let umUser = message.guild.member(message.mentions.members.first() || message.guild.members.get(args[0]));
    if(!umUser) return message.channel.send("CAN'T FIND USER**!**");
    if(umUser.highestRole.position >= message.member.highestRole.position) return message.channel.send("YOU CAN NOT UNMUTE A MEMBER WHO HAS A HIGHER OR THE SAME ROLE AS YOU**!**");

    let unmuterole = message.guild.roles.find(r=> r.name === "MUTED // " + snow.snowflake);

    if(!unmuterole || !umUser.roles.has(unmuterole.id)) return message.channel.send("THIS USER IS NOT MUTED**!**");

    await(umUser.removeRole(unmuterole.id));
    message.channel.send(`${umUser} HAS BEEN **UNMUTED!**`);

    let unmuteEmbed = new Discord.RichEmbed()
    .setColor(snow.blue)
    .setTimestamp()
    .setDescription("UNMUTE **" + snow.snowflake + "**")
    .addField("USER", umUser)
    .addField("MODERATOR", message.author)
    .addField("CHANNEL", message.channel)
    .setFooter("SNOW " + snow.snowflake, bot.user.displayAvatarURL);

    let snowlog = message.guild.channels.find(`name`, "snow");
    if(!snowlog) return;

    snowlog.send(unmuteEmbed);

}   

module.exports.help = {
    name: "unmute"
}

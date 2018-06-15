const Discord = require("discord.js");
const botconfig = require("../botconfig.json");

module.exports.run = async (bot, message, args) => {

  let uUser = args[0]:
  if(!message.member.hasPermissions("BAN_MEMBERS")) return message.channel.send("YOU DO NOT HAVE PERMISSIONS TO DO THAT**!**");
  if(!uUser) return message.channel.send("CAN'T FIND USER**!**");
  let uReason = args.slice(1).join(" ");
  if(!uReason) return message.channel.send("PLEASE PROVIDE A REASON FOR THE UNBAN**!**");
  
  message.guild.member(uUser).unban(uReason);
  message.channel.send(`${uUser} HAS BEEN **UNBANNED** BY ${message.author} BECAUSE: ${uReason}**!**`);
  
  let unbanEmbed = new Discord.RichEmbed()
  .setColor(botconfig.blue)
  .setTitle("UNBAN ❆")
  .addField("USER", uUser)
  .addField("MODERATOR", message.author)
  .addField("CHANNEL", message.channel)
  .addFied("REASON", uReason)
  .setTimestamp()
  .setFooter("SNOW ❆", bot.user.displayAvatarURL);
  
  let snowlog = message.guild.channels.find(`name`, "snow");
  if(!snowlog) return;
  
  snowlog.send(unbanEmbed);

}

module.exports.help = {
  name: "unban"
}

const Discord = require("discord.js");
const snow = require("../../config/snow.json");

const Error = require("../../config/functions/server/error.js");

module.exports.run = async (bot, message, args) => {
  if(!message.member.hasPermission("BAN_MEMBERS")) return message.channel.send(new Error("You don't have permission to use this command."));
  if(!args[0]) return message.channel.send(new Error("User not entered."));
  
  let user = args[0];
  if(!user) return message.channel.send(new Error("User not found."));
  
  if(user === message.author.id) return message.channel.send(new Error("You can't use this command on yourself."));
  
  let reason = args.slice(1).join(" ");
  if(!reason) reason = "None"; 
    
  message.guild.unban(user, { reason: unbanreason }).then((user) => {
    message.channel.send(
      new Discord.RichEmbed()
      .setColor(snow.blue)
      .setDescription(user.tag + " has been unbanned.")
    );
    
    let unbanEmbed = new Discord.RichEmbed()
    .setColor(snow.blue)
    .setTitle("Unban")
    .addField("User", "<@" + user.id + ">")
    .addField("Moderator", message.author)
    .addField("Reason", reason)
    .setFooter("SNOW", bot.user.displayAvatarURL);
    
    let channel = message.guild.channels.find(channel => channel.name === "snow");
    if(!channel) return;
    
    channel.send(unbanEmbed);
  });
}

module.exports.config = {
  name: "unban"
}

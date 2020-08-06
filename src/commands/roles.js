const Discord = require("discord.js");
const snow = require("../../config/snow.json");

module.exports.run = async(bot, message, args) => {
  let roles = message.guild.roles.array().slice(1).sort((a, b) => a.comparePositionTo(b)).reverse().map(role => role);
  
  let rolesEmbed = new Discord.RichEmbed()
  .setColor(snow.blue)
  .setTitle(message.guild.roles.size + (message.guild.roles.size == 1 ? " role" : " roles"))
  .setDescription(roles.join(" "))
  .setFooter(message.guild.name, message.guild.iconURL);
  
  message.channel.send(rolesEmbed);
}

module.exports.config = {
  name: "roles"
}
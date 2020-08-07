const Discord = require("discord.js");
const snow = require("../../config/snow.json");

const fetch = require("node-fetch");
const moment = require("moment");

const Error = require("../../config/functions/server/error.js");
const number = require("../../config/functions/number.js");

module.exports.run = async(bot, message, args) => {
  if(!args[0]) return message.channel.send(new Error("Role not entered."));;

  let role = message.mentions.roles.first() || message.guild.roles.get(args[0]) || message.guild.roles.find(role => role.name.toUpperCase() === args[0].toUpperCase()) || message.guild.roles.find(role => role.id === args[0]);
  if(!role) return message.channel.send(new Error("Role not found."))

  let rolePosition = message.guild.roles.size - role.calculatedPosition + "/" + message.guild.roles.size;
  
  let mentionable = role.mentionable === true ? "True" : "False";
  let managed = role.managed === true ? "True" : "False";
  let hoist = role.hoist === true ? "True" : "False";

  let roleinfoEmbed = new Discord.RichEmbed()
  .setColor(snow.blue)
  .setTitle(role.name)
  .addField("ID", role.id)
  .addField("Position", rolePosition, true)
  .addField("Role members", number(role.members.size), true)
  .addField("Created", moment.utc(role.createdAt).format("ddd DD MMM YYYY HH:mm [UTC]").toUpperCase())
  .addField("Color", role.hexColor.toUpperCase())
  .addField("Mentionable", mentionable, true)
  .addField("Managed", managed, true)
  .addField("Hoist", hoist, true)
  .setFooter("SNOW", bot.user.displayAvatarURL);

  message.channel.send(roleinfoEmbed);
}

module.exports.config = {
  name: "role"
}
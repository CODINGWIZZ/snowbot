const Discord = require("discord.js");
const snow = require("../../snow.json");

module.exports = function(message) {
  if(!message) return;
  this.message = message;

  let errorEmbed = new Discord.RichEmbed()
  .setColor(snow.red)
  .setDescription(message);

  return errorEmbed;
}
const Discord = require("discord.js");
const snow = require("../../config/snow.json");

module.exports.run = async(bot, message, args) => {
  let ping = Date.now() - message.createdTimestamp;

  let pingEmbed = new Discord.RichEmbed()
  .setColor(snow.blue)
  .setDescription("The ping is `" + ping + "ms`.");

  message.channel.send(pingEmbed);
}

module.exports.config = {
  name: "ping"
}
const Discord = require("discord.js");
const snow = require("../../config/snow.json");

const moment = require("moment");
require("moment-duration-format");

module.exports.run = async(bot, message, args) => {
  let uptime = moment.duration(bot.uptime).format("D[d], H[h], m[m], s[s]");

  let uptimeEmbed = new Discord.RichEmbed()
  .setColor(snow.blue)
  .setDescription(uptime);

  message.channel.send(uptimeEmbed);
}

module.exports.config = {
  name: "uptime"
}